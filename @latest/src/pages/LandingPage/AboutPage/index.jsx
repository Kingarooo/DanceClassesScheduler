import React from 'react';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer"
import './style.css'

import disco from '/src/assets/cooldisco.gif';

const AboutPage = () => {
    return (
        <div className="about-page">
            <Header />
            <h1 className='inventing'>Move <p></p>Your <p></p>Soul<p> </p> & <p></p>Your<p></p> Body<p></p> Follows
            </ h1>
            <div className="about-div">
                <p></p>
                <h1 id='about-us'>About Us</h1>
                <div className="first-about">

                    <img id="discoGif" src={disco} alt="About Us" />

                    <div className="about-text">
                        <p>
                            At SoulRhythm Dance School, we believe that dance is not just a series of steps but a journey of self-expression and joy. Our mission is to inspire and nurture each student’s passion for dance. Whether you are a beginner or an experienced dancer, our dedicated instructors are committed to guiding you every step of the way, fostering a supportive and enthusiastic environment where you can thrive and grow. Join us, and let's embark on this beautiful journey together!
                        </p>
                    </div>
                </div>

                <div className="second-about">
                    <div className="about-text">
                        <p>
                            At SoulRhythm, our instructors are not only skilled dancers but also passionate teachers. We bring years of experience and a deep understanding of various dance styles to help you master your moves. Our classes are designed to challenge and inspire, pushing you to reach new heights while having fun. Trust us to bring out the dancer in you with our expertly crafted lessons, tailored to suit every skill level.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );

}

export default AboutPage;