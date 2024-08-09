// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import RegisterModal from '/src/components/RegisterModal';
import LoginModal from '/src/components/LoginModal';

import instructorImage from '/src/assets/neonShit.gif';
import danceGif from '/src/assets/dance.gif';

const LandingPage = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  const handleFreeClassClick = () => {
    setShowRegistration(true); // Show the registration modal
  };

  const handleLoginClick = () => {
    setShowLogin(true); // Show the login modal
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false); // Close the registration modal
  };

  const handleCloseLogin = () => {
    setShowLogin(false); // Close the login modal
  };

  return (
    <div className="landing-page">
      <Header />
      <div className="carousel-container">
        <Carousel touch>
          <Carousel.Item interval={2500}>
            <img
              className="d-block w-100"
              src={instructorImage}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={danceGif}
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="carousel-overlay">
          <h1 id="greeting">WELCOME TO Soul Motion</h1>
          <div className="button-container">
            <button className="cta-button" onClick={handleFreeClassClick}>
              Schedule Free Lesson
            </button>
            <button className="cta-button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="hero-container">
        <p>Discover the joy of dance with our expert instructors.</p>
      </div>
      <Footer />
      <RegisterModal show={showRegistration} handleClose={handleCloseRegistration} handleLoginOpen={handleLoginClick} />
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </div>
  );
};

export default LandingPage;
