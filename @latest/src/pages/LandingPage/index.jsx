// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import isLoginMode from '/src/pages/LandingPage/RegisterPage';
import instructorImage from '/src/assets/neonShit.gif';
import danceGif from '/src/assets/dance.gif';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleFreeClassClick = () => {
    navigate('/register', { state: { isLoginMode: false } });
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
              {isLoginMode ? `Welcome Back! Ready for Your Next Lesson?` : "Schedule Free Lesson"}
            </button>
          </div>
        </div>
      </div>
      <div className="hero-container">
        <p>Discover the joy of dance with our expert instructors.</p>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
