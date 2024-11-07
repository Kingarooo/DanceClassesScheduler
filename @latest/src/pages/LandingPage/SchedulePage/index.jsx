import React from 'react';
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import Scheduler from '/src/components/Scheduler';
import TeachersNavbar from '/src/components/TeachersNavbar';
import './style.css';

const SchedulePage = () => {
  return (
    <div className="lesson-page">
      <Header />
      <div className="scheduler">
        <TeachersNavbar />
        <Scheduler />
      </div>
      <Footer />
    </div>
  );
}

export default SchedulePage;
