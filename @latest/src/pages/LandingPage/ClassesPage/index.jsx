import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import './style.css';

const images = {
    ShaneSparks: '/src/assets/ClassesPage/ShaneSparks.jpg',
    SeanBankhead: '/src/assets/ClassesPage/SeanBankhead.jpg',
    JaquelNight: '/src/assets/ClassesPage/JaquelNight.jpg',
    HipHopRoom: '/src/assets/ClassesPage/HipHopRoom.jpg',
    YogaRoom: '/src/assets/ClassesPage/YogaRoom.jpg',
    StudioLobby: '/src/assets/ClassesPage/StudioLobby.jpg',
};

const styles = [
    { id: 1, name: 'All' },
    { id: 2, name: 'HipHop', image: images.HipHopRoom },
    { id: 3, name: 'Yoga', image: images.YogaRoom },
];

const teachers = [
    { id: 1, name: 'Shane Sparks', style: 'HipHop', image: images.ShaneSparks, description: "Expert in hip-hop." },
    { id: 2, name: 'Sean Bankhead', style: 'Yoga', image: images.SeanBankhead, description: "Yoga and mindfulness." },
    { id: 3, name: 'Jaquel Night', style: 'HipHop', image: images.JaquelNight, description: "Hip-hop master." },
];

const ClassesPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialStyle = queryParams.get('style') || 'All';
    const [selectedStyle, setSelectedStyle] = useState(initialStyle);

    const filteredTeachers = selectedStyle === 'All'
        ? teachers
        : teachers.filter(teacher => teacher.style === selectedStyle);

    const scrollToTeachers = () => {
        const teacherCards = document.getElementById('teacher-cards');
        if (teacherCards) {
            teacherCards.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="classes-page">
            <Header />

            <div className="style-navbar">
                <h2>Welcome to Our Dance Space!</h2>
                {styles.map((style) => (
                    <button
                        key={style.id}
                        className={`style-button ${selectedStyle === style.name ? 'selected' : ''}`}
                        onClick={() => setSelectedStyle(style.name)}
                    >
                        {style.name}
                    </button>
                ))}
            </div>

            {selectedStyle === 'All' ? (
                <div className="classroom-space">
                    <div className="classroom-info">
                            <img src={images.StudioLobby} alt="Studio Lobby" className="classroom-image" />
                        <p>Join any class and explore your favorite styles!</p>
                    </div>
                    <button onClick={scrollToTeachers} className="scroll-button">Get to know our teachers!</button>
                </div>
            ) : (
                <div className="classroom-info">
                    <img
                        src={styles.find(style => style.name === selectedStyle)?.image}
                        alt={`${selectedStyle} Classroom`}
                        className="classroom-image"
                    />
                    <div className="classroom-text">
                        <h2>{selectedStyle} Classroom</h2>
                        <p>Discover our dedicated space for {selectedStyle} classes and meet talented instructors who will guide your journey.</p>
                    </div>
                </div>
            )}

            <div id="teacher-cards" className="teacher-cards">
                {filteredTeachers.map((teacher) => (
                    <div key={teacher.id} className="teacher-card">
                        <img src={teacher.image} alt={teacher.name} className="teacher-image" />
                        <h3>{teacher.name}</h3>
                        <p>{teacher.description}</p>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default ClassesPage;
