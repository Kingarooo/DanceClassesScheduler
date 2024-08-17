import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { showToast } from '/src/components/Toast';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { UserContext } from '/src/contexts/UserContext';

const RegisterPage = () => {
  const { login } = useContext(UserContext); // Use the login function from UserContext
  const location = useLocation();
  const [isLoginMode, setIsLoginMode] = useState(location.state?.isLoginMode || false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    newPasswordConfirmation: '',
    newsletter: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.isLoginMode !== undefined) {
      setIsLoginMode(location.state.isLoginMode);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isLoginMode && formData.newPassword !== formData.newPasswordConfirmation) {
        toast.error("Passwords do not match. Please try again.");
        setIsLoading(false);
        return;
      }

      const url = isLoginMode ? 'http://localhost:8080/login' : 'http://localhost:8080/registration';
      const { newPasswordConfirmation, ...data } = formData;

      const response = await axios.post(
        url,
        isLoginMode ? { email: formData.email, password: formData.newPassword } : data
      );

      if (response.status === 200 || response.status === 201) {
        showToast('success', `${isLoginMode ? 'Login' : 'Registration'} successful!`);

        // Save user data globally
        login(response.data);

        setFormData({
          name: '',
          email: '',
          newPassword: '',
          newPasswordConfirmation: '',
          newsletter: true,
        });

        handleClose();
        navigate('/free-lesson');
      }
    } catch (error) {
      console.error(`${isLoginMode ? 'Login' : 'Registration'} failed:`, error);
      toast.error(`There was an error submitting the form. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Modal show={true} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLoginMode ? 'Log In' : 'Register for a Free Lesson'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <>
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
              </>
            )}

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
                name="newPassword"
                placeholder="Enter your password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {!isLoginMode && (
              <>
                <Form.Group controlId="formPasswordConfirmation" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPasswordConfirmation"
                    placeholder="Confirm your password"
                    value={formData.newPasswordConfirmation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="form-options mt-3">
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
                </div>
              </>
            )}

            <Button variant="primary" type="submit" className="mt-4" disabled={isLoading}>
              {isLoading ? 'Submitting...' : isLoginMode ? 'Log In' : 'Register'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <a href="#" onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode ? "Register here" : "Log in here"}
            </a>
          </p>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default RegisterPage;
