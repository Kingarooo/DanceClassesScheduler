import React, { useState, useEffect, useRef, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { defaultEvents } from "./events";
import { getDayStyle, customDayPropGetter } from "./utils";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import { UserContext } from '/src/contexts/UserContext';
import axios from 'axios';


const localizer = momentLocalizer(moment);

const formats = {
  timeGutterFormat: (date, culture, localizer) =>
    localizer.format(date, 'HH:mm', culture),
  dayFormat: (date, culture, localizer) =>
    localizer.format(date, 'dddd MM/DD', culture),
  monthHeaderFormat: (date, culture, localizer) =>
    localizer.format(date, 'MMMM YYYY', culture),
  monthWeekdayFormat: (date, culture, localizer) =>
    localizer.format(date, 'dddd', culture),
};

const components = {
  event: (props) => {
    const eventType = props?.event?.type;
    const style = getDayStyle(props.event.start, eventType);

    return (
      <div style={{ ...style, height: "100%" }}>
        {props.title}
      </div>
    );
  },
};

const messages = {
  week: 'Semana',
  work_week: 'Semana de trabajo',
  day: 'Día',
  month: 'Mes',
  previous: 'Atrás',
  next: 'Después',
  today: 'Hoy',
  agenda: 'El Diario',
  showMore: (total) => `+${total} más`,
};

const Scheduler = () => {
  const { user } = useContext(UserContext);
  const isAdmin = user?.admin || false;

  const [events, setEvents] = useState(defaultEvents);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTeacher, setEventTeacher] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [newTeacherName, setNewTeacherName] = useState("");
  useEffect(() => {
  
    // Get os professores quando o componente é aberto
    axios.get('/api/teachers').then(response => {
      setTeachers(response.data);
    }).catch(error => {
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
    setEventTitle(event.title);
    setEventDescription(event.description);
    setEventTeacher(event.teacher);
    setParticipants(event.participants || []);
    setStartTime(moment(event.start).format("HH:mm"));
    setEndTime(moment(event.end).format("HH:mm"));

    if (isAdmin) {
      setShowAdminModal(true);
    } else {
      setShowStudentModal(true);
    }
  };

  const saveEvent = async () => {
    if (eventTitle && selectedDate && startTime && endTime) {
      const startDateTime = moment(selectedDate).set({
        hour: moment(startTime, "HH:mm").hours(),
        minute: moment(startTime, "HH:mm").minutes(),
      });
      const endDateTime = moment(selectedDate).set({
        hour: moment(endTime, "HH:mm").hours(),
        minute: moment(endTime, "HH:mm").minutes(),
      });

      const eventData = {
        name: eventTitle,
        description: eventDescription,
        style: "default",
        start: startDateTime.toDate(),
        end: endDateTime.toDate(),
        date: selectedDate,
        teachers: selectedTeachers.length ? selectedTeachers : ["default-teacher-id"],
      };

      try {
        const response = await axios.post('/classSchedule', eventData);
        const newEvent = response.data;
        setEvents([...events, newEvent]);
        closeAdminModal();
      } catch (error) {
        console.error('Error saving event:', error);
      }
    }
  };

  const addTeacher = async () => {
    if (newTeacherName.trim()) {
      try {
        const response = await axios.post('/api/teachers', { name: newTeacherName });
        const newTeacher = response.data;
        setTeachers([...teachers, newTeacher]);
        setNewTeacherName("");
      } catch (error) {
        console.error('Error adding teacher:', error);
      }
    }
  };

  const deleteEvent = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      closeAdminModal();
    }
  };

  const closeAdminModal = () => {
    setShowAdminModal(false);
    setEventTitle("");
    setEventDescription("");
    setEventTeacher("");
    setStartTime("");
    setEndTime("");
    setParticipants([]);
    setSelectEvent(null);
  };

  const closeStudentModal = () => {
    setShowStudentModal(false);
    setSelectEvent(null);
  };

  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeAdminModal();
        closeStudentModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const repeatWeekly = (event) => {
    const eventsToAdd = [];
    for (let i = 1; i <= 52; i++) {
      const newEvent = {
        ...event,
        start: moment(event.start).add(i, "weeks").toDate(),
        end: moment(event.end).add(i, "weeks").toDate(),
      };
      eventsToAdd.push(newEvent);
    }
    return eventsToAdd;
  };

  useEffect(() => {
    const recurringEvents = events.flatMap(event => repeatWeekly(event));
    setEvents([...events, ...recurringEvents]);
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        formats={formats}
        popup={true}
        selectable={isAdmin}
        min={moment("2024-03-18T09:00:00").toDate()}
        max={moment("2024-03-18T22:00:00").toDate()}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
        longPressThreshold={0.25}
        step={30}
        timeslots={1}
        components={components}
        messages={messages}
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
                  onClick={closeAdminModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="eventTitle" className="form-label">
                    Class Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eventDescription" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="eventDescription"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="eventTeacher" className="form-label">
                    Teachers:
                  </label>
                  <select
                    multiple
                    className="form-control"
                    id="eventTeacher"
                    value={selectedTeachers}
                    onChange={(e) =>
                      setSelectedTeachers([...e.target.selectedOptions].map(option => option.value))
                    }
                  >
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="newTeacherName" className="form-label">
                    Add New Teacher:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newTeacherName"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={addTeacher}
                  >
                    Add Teacher
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="startTime" className="form-label">
                    Start Time:
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endTime" className="form-label">
                    End Time:
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Participants:</label>
                  <ul className="list-group">
                    {participants.map((participant, index) => (
                      <li key={index} className="list-group-item">
                        {participant.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeAdminModal}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={saveEvent}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
