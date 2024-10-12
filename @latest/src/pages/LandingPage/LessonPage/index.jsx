import React from 'react';
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import Scheduler from '/src/components/Scheduler';
import SecNavbar from '/src/components/SecNavbar';
import './style.css';

const LessonPage = () => {
  return (
    <div className="lesson-page">
      <Header />
      <div className="scheduler">
        <SecNavbar />
        <Scheduler />
      </div>
      <Footer />
    </div>
  );
}

export default LessonPage;
