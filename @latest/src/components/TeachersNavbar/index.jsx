import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '/src/contexts/UserContext';
import './style.css';
import { toast } from 'react-toastify';

const SecNavbar = () => {
  const { user } = useContext(UserContext);
  const isAdmin = user?.admin || false;
  const [teacherEmail, setTeacherEmail] = useState('');
  const [expandedForm, setExpandedForm] = useState(null); // Keeps track of which form is expanded

  const handleAddTeacher = async () => {
    if (teacherEmail.trim()) {
      try {
        const response = await axios.put('http://localhost:8080/lessons/newTeacher', { email: teacherEmail });
        toast.success(`${teacherEmail} has been added as a teacher!`);
        setTeacherEmail('');
        setExpandedForm(null); // Close form after action
      } catch (error) {
        console.error('Error adding teacher:', error);
      }
    }
  };

  const handleRemoveTeacher = async () => {
    if (teacherEmail.trim()) {
      try {
        const response = await axios.put('http://localhost:8080/lessons/removeTeacher', { email: teacherEmail });
        toast.success(`${teacherEmail} has been removed as a teacher!`);
        setTeacherEmail('');
        setExpandedForm(null); // Close form after action
      } catch (error) {
        console.error('Error removing teacher:', error);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (teacherEmail.trim()) {
      const confirmDelete = window.confirm(`Are you sure you want to delete ${teacherEmail}'s account?`);
      if (confirmDelete) {
        try {
          const response = await axios.delete('http://localhost:8080/lessons/deleteUser', { data: { email: teacherEmail } });
          toast.success(`${teacherEmail}'s account has been deleted.`);
          setTeacherEmail('');
          setExpandedForm(null); // Close form after action
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    }
  };

  return (
    isAdmin && (
      <div className="sec-navbar">
        {/* Add Teacher Button */}
        {!expandedForm && (
          <button className="add-teacher-btn" onClick={() => setExpandedForm('add')}>
            Add Teacher
          </button>
        )}
        {expandedForm === 'add' && (
          <div className="teacher-form">
            <input
              type="email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              placeholder="Enter teacher's email"
            />
            <button className="confirm-btn" onClick={handleAddTeacher}>
              Confirm
            </button>
            <button className="cancel-btn" onClick={() => setExpandedForm(null)}>
              Cancel
            </button>
          </div>
        )}

        {/* Remove Teacher Button */}
        {!expandedForm && (
          <button className="remove-teacher-btn" onClick={() => setExpandedForm('remove')}>
            Remove Teacher
          </button>
        )}
        {expandedForm === 'remove' && (
          <div className="teacher-form">
            <input
              type="email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              placeholder="Enter teacher's email"
            />
            <button className="confirm-btn" onClick={handleRemoveTeacher}>
              Confirm
            </button>
            <button className="cancel-btn" onClick={() => setExpandedForm(null)}>
              Cancel
            </button>
          </div>
        )}

        {/* Delete User Button */}
        {!expandedForm && (
          <button className="delete-user-btn" onClick={() => setExpandedForm('delete')}>
            Delete User
          </button>
        )}
        {expandedForm === 'delete' && (
          <div className="teacher-form">
            <input
              type="email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              placeholder="Enter user's email"
            />
            <button className="confirm-btn" onClick={handleDeleteUser}>
              Confirm
            </button>
            <button className="cancel-btn" onClick={() => setExpandedForm(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default SecNavbar;
