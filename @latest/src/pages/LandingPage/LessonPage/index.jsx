import React from 'react'
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import CalendarComponent from '/src/components/Calendar';
import './style.css';

const LessonPage = () => {
    return (
        <div className="lesson-page">
            <Header />
            <div className="forms">
                <CalendarComponent />
            </div>
            <Footer />
        </div>
    );
}

export default LessonPage;