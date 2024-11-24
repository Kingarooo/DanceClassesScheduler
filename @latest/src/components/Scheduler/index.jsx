import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useState, useEffect, useRef, useContext } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import { toast } from 'react-toastify';
import { UserContext } from '/src/contexts/UserContext';
import { messages, formats, danceStyles } from "./constants";
import { customDayPropGetter, createRecurrenceEvents, eventPropGetter } from "./utils";
import axios from 'axios';

const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const { user } = useContext(UserContext);
  const isAdmin = user?.admin || false;
  const [events, setEvents] = useState([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTeacher, setEventTeacher] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [eventStyle, setEventStyle] = useState("HipHop");
  const [frequency, setFrequency] = useState("Once");
  const [creationGroupId, setCreationGroupId] = useState("");
  const [teacherKeys, setTeacherKeys] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isJoined, setIsJoined] = useState(null);




  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/lessons/classSchedule');
        console.log("Saving these events", response.data);
        setEvents(response.data);  // Assuming your backend returns an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const getEventParticipants = async (event) => {
    try {
      const response = await axios.get(`http://localhost:8080/class/showParticipants/${event.id}`);
      const eventParticipants = response.data;
      const eventParticipantsArray = eventParticipants.map(participant => ({
        id: participant.user.id,
        name: participant.user.name,
      }));

      setParticipants(eventParticipantsArray);
      console.log("Participants no set:", eventParticipantsArray);

      // Check if the user is already participating in the event
      
      const userParticipating = participants.some(participant => participant.id === user.id);
      if (userParticipating) {
        console.log("User is joined");
        setIsJoined(true);
      }
      console.log(`The response is ${userParticipating}! User is not joined: ${user.id}$`);
      setIsJoined(false); 
    }
    catch (error) {
      console.error('Error fetching participants:', error);
    }
  }

  const checkIfUserJoined = async (participants) => {
    const userParticipating = await participants.some(participant => participant.id === user.id);
    if (userParticipating) {
      console.log("User is joined");
      setIsJoined(true);
    }
    console.log("User is not joined");
    setIsJoined(false);
  };

  const handleJoinClass = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/class/joinClass/${selectEvent.id}/${user.id}`);
      if (response.status === 200) {
        setIsJoined(true);
        toast.success('You have successfully joined the class.')
        console.log('Join class response:', response.data);
      }
      toast.error('Your subscription plan does not allow joining this class. Please contact the teacher for further information.')
    } catch (error) {

      console.error('Error joining class:', error);
    }
  }

  const handleLeaveClass = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/class/deleteParticipant/${selectEvent.id}/${user.id}`);
      if (response.status === 200) {
        setIsJoined(false);
        toast.success('You have successfully left the class.');
      }
      toast.error('Error leaving class. Please reach out to the teachers.');
    } catch (error) {
      console.error("Error leaving class:", error);
    }
  };

  const handleTeacherChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedIds = options.map((option) => option.value);

    setSelectedTeachers(selectedIds);

    setTeacherKeys(selectedIds.map((id, index) => ({
      id,
      key: index
    })));
  };

  useEffect(() => {
    axios.get('http://localhost:8080/lessons/showTeachers')
      .then(response => {
        console.log("Teachers available:", response.data);
        setAvailableTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  }, []);

  const handleSelectSlot = (slotInfo) => {
    if (isAdmin) {
      setShowAdminModal(true);
      setSelectedDate(slotInfo.start);
      setSelectEvent(null);
    }
  };

  const handleSelectedEvent = (event) => {

    setSelectEvent(event);
    setEventTitle(event.name);
    setStartTime(moment(event.start).format("HH:mm"));
    setEndTime(moment(event.end).format("HH:mm"));
    setEventStyle(event.data.style);
    setEventDescription(event.data.description);
    setEventTeacher((event.data.teachers));
    setCreationGroupId(event.data.creationGroupId);
    getEventParticipants(event);

    console.log("Selected Event", event);

    if (isAdmin) {
      setShowAdminModal(true);
    } else {
      setShowStudentModal(true);
    }
  };

  const saveEvent = async () => {
    if (eventTitle && selectedDate && startTime && endTime) {
      // Construct the start and end times
      const startDateTime = moment(selectedDate).set({
        hour: moment(startTime, "HH:mm").hours(),
        minute: moment(startTime, "HH:mm").minutes(),
      });
      const endDateTime = moment(selectedDate).set({
        hour: moment(endTime, "HH:mm").hours(),
        minute: moment(endTime, "HH:mm").minutes(),
      });

      // Prepare event data
      const eventData = {
        name: eventTitle,
        start: startDateTime.toDate(),
        end: endDateTime.toDate(),

        description: eventDescription,
        style: eventStyle,
        frequency: frequency,
        teachers: selectedTeachers.length ? selectedTeachers : [],

      };

      console.log("Event Data", eventData);
      // Check if the event is recurring (Weekly, Monthly) or just Once
      let eventsToSave = [];

      if (frequency == "Once") {
        // If it's a one-time event, push it as is
        eventsToSave.push(eventData);
      } else {
        // For recurring events, generate them using createRecurrenceEvents
        eventsToSave = createRecurrenceEvents(eventData);
      }

      try {
        // Save each event to the backend 
        const savedEvents = [];
        const response = await Promise.all(eventsToSave.map(event => axios.post('http://localhost:8080/lessons/classSchedule', event)));
        savedEvents.push(response.data);

        // Add the new events to the calendar
        setEvents(prevEvents => [...prevEvents, ...savedEvents]);
        closeModalReset();
      }
      catch (error) {
        console.error('Error saving event:', error);
      }
    }
  };


  const deleteEvent = async () => {
    const updatedEvents = events.filter((event) => event !== selectEvent);

    try {
      const deletion = await axios.delete(`http://localhost:8080/lessons/deleteClass/${creationGroupId}`);
      console.log("Event deleted", deletion);
      toast.success('Event deleted successfully:');
      setEvents(updatedEvents);
    }
    catch (error) {
      console.error('Error deleting event:', error);
    }
    closeModalReset();
  };


  //Close the modal and reset all event fields
  const closeModalReset = () => {
    setShowAdminModal(false);
    setEventTitle("");
    setEventDescription("");
    setEventTeacher([]);
    setStartTime("");
    setEndTime("");
    setParticipants([]);
    setSelectEvent(null);
    setEventStyle("HipHop");
    setFrequency("Once");
    setCreationGroupId("");
    setSelectedTeachers([]);
    setShowStudentModal(false);
    setShowConfirmationModal(false);
  };

  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModalReset();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        defaultView="month"
        views={["month"]}
        localizer={localizer}
        events={events}
        min={moment("2024-03-18T08:00:00").toDate()}
        max={moment("2024-03-18T22:00:00").toDate()}
        popup={true}

        //Acessors for the event

        resourceAccessor={(event) => ({
          id: event.id,
          description: event.description,
          style: event.style,
          teacher: event.teacher,
          participants: event.participants,
        })
        }
        startAccessor="start"
        endAccessor="end"
        titleAccessor="name"
        //CSS for the calendar itself, on the calendar component
        style={
          {
            height: "70vh",
            margin: "0px",
          }
        }

        //Date and Time formats for the calendar
        formats={formats}

        //Only the admin can edit the slot
        selectable={isAdmin}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}

        components={{
          event: (props) => (
            <div className="event-box" style={{
              // ...getDayStyle(props.event.start, props.event.data.style),
              ...eventPropGetter(props.event.data.style)
            }}>
              {props.event.name}
              <br></br>
              {moment(props.event.start).format("HH:mm")} - {moment(props.event.end).format("HH:mm")}
            </div>
          )
        }}
        messages={messages}

        //Get the style of the event

        eventPropGetter={eventPropGetter}
        // slotPropGetter={slotPropGetter}
        dayPropGetter={customDayPropGetter}
      />
      {/* Admin Modal */}
      {showAdminModal && (
        <div
          className="modal"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog" ref={modalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectEvent ? "Edit Class" : "Add Class"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModalReset}
                ></button>
              </div>
              <div className="modal-body">
                {/* Form Fields for Event Title, Description, Teachers, etc. */}
                <div className="mb-3">
                  <label htmlFor="eventTitle" className="form-label">Class Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eventStyle" className="form-label">Style:</label>
                  <select
                    className="form-control"
                    id="eventStyle"
                    value={eventStyle}
                    onChange={(e) => setEventStyle(e.target.value)}
                  >
                    {danceStyles.map((style) => (
                      <option key={style.id} value={style.value}>
                        {style.value}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="mb-3">
                  <label htmlFor="eventDescription" className="form-label">Description:</label>
                  <textarea
                    className="form-control"
                    id="eventDescription"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="teachers" className="form-label">Teachers:</label>
                  <select
                    className="form-control"
                    id="teachers"
                    multiple  // Allow selecting multiple teachers
                    onChange={handleTeacherChange}
                  >
                    {availableTeachers && availableTeachers.length > 0 ? (
                      availableTeachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No teachers available</option>  // In case the teachers array is empty
                    )}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="startTime" className="form-label">Start Time:</label>
                  <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endTime" className="form-label">End Time:</label>
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                {/* Frequency */}
                <div className="mb-3">
                  <label htmlFor="frequency" className="form-label">Frequency:</label>
                  <select
                    className="form-control"
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option key="Once" value="Once">Once</option>
                    <option key="Weekly" value="Weekly">Weekly</option>
                    <option key="Monthly" value="Monthly">Monthly</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModalReset}
                  >
                    Close
                  </button>
                  {selectEvent && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={deleteEvent}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveEvent}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Student Modal */}
      {showStudentModal && (
        <div
          className="modal"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog" ref={modalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Class Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModalReset}
                ></button>
              </div>
              <div className="modal-body">
                {/* Display event details */}
                <div className="mb-3">
                  <strong>Class Name: </strong> {eventTitle}
                </div>
                <div className="mb-3">
                  <strong>Style: </strong> {eventStyle}
                </div>
                <div className="mb-3">
                  <strong>Description: </strong> {eventDescription}
                </div>
                <div className="mb-3">
                  <strong>Teacher: </strong>
                  {
                    eventTeacher && eventTeacher.length > 0 ? (
                      eventTeacher.map((teacherId) => {
                        // Find the teacher object from availableTeachers using the teacher ID
                        const teacher = availableTeachers.find(user => user.id === teacherId);
                        return teacher ? (
                          <span key={teacher.id}>{teacher.name}</span>
                        ) : (
                          <span key={teacherId}>Teacher not found</span>
                        );
                      }).reduce((prev, curr) => [prev, ', ', curr])
                      // Join só funciona com array, reduce funciona com components
                    ) : (
                      <span>Not assigned</span>
                    )
                  }

                </div>
                <div className="mb-3">
                  <strong>Start Time: </strong> {startTime}
                </div>
                <div className="mb-3">
                  <strong>End Time: </strong> {endTime}
                </div>
                <div className="mb-3 ">
                  <strong>Participants </strong>
                  {
                    participants && participants.length > 0 ? (
                      participants.map((participant) => (
                        <span key={participant.id}>
                          <label className="participants-list">
                            {participant.name}

                          </label>
                        </span>
                      ))
                    ) : (
                      <span>No participants yet</span>
                    )
                  }
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModalReset}
                >
                  Close
                </button>
                {user && (
                  isJoined ? (
                    <button
                      className="leave-class-button"
                      onClick={handleLeaveClass}
                    >
                      Leave Class
                    </button>
                  ) : (
                    <button
                      className="join-class-button"
                      onClick={handleJoinClass}
                    >
                      Join Class
                    </button>
                  )
                )}

                {showConfirmationModal && (
                  <div className="modal-background">
                    <div className="modal-content" ref={modalRef}>
                      <h5>Do you want to join this class?</h5>
                      <button onClick={handleJoinClass}>Confirm</button>
                      <button onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Scheduler;
