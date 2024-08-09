import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from '../../components/Toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const RegisterModal = ({ show, handleClose, handleLoginOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    newsletter: true,
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData); // Debugging log
    if (formData.password !== formData.passwordConfirmation) {
      toast.error("Passwords do not match. Please try again.");
      setIsLoading(false);
      return
    }
    try {
      const response = await axios.post('http://localhost:8080/registration', formData);
      if (response.status === 200 || response.status === 201) {

        // Reset the form data
        setFormData({
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          newsletter: true,
        });

        // Close the modal and navigate to the lesson page
        showToast("success", "Welcome `${formData.name}`, you are now a member of Soul Motion!");
        handleClose();
        setTimeout(() => {
          navigate('/free-lesson');
        }, 2000);
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.error("There was an error submitting the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    handleClose();
    handleLoginOpen();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register for a Free Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPasswordConfirmation" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm your password"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="form-options">
              <div className="checkbox-label">
                <Form.Check
                  type="checkbox"
                  name="newsletter"
                  label="Subscribe to Newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  id="newsletter-checkbox"
                />
                <label
                  htmlFor="newsletter-checkbox"
                  className="newsletter-label"
                  onClick={() => setFormData({ ...formData, newsletter: !formData.newsletter })}
                />
              </div>
              <a href="#" onClick={handleLoginClick}>Log in</a>
            </div>

            <Button variant="primary" type="submit" className="mt-4" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default RegisterModal;
