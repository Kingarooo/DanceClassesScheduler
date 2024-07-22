// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Map from '../../../components/Map';
import './style.css';
import { Icon } from '@iconify/react';
// import IonArrowDown from ;

const ContactsPage = () => {
    return (
        <div className="contacts-page">
            <Header />
            <div className="contacts-container">
                <div className="contacts-email">
                    <div className="contact-info">
                        <h2>Contact Us</h2>
                        <p>If you have any questions, feel free to reach out to us. We are here to help you!</p>
                        <p>Email: info@soulmotion.com</p>
                        <p>Phone: (+351) 912 345 678</p>
                        {/* <h2>Or Come Meet Us</h2> */}
                    </div>
                </div>
                <div className="contact-form-wrapper">

                    <div className="arrow-wrapper">
                        <Icon style={{ color: 'rgba(160, 60, 100, 0.9)' }} icon="ion:arrow-down" className='arrows' />
                    </div>
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        <form>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />

                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />

                            <label htmlFor="subject">Subject:</label>
                            <input type="text" id="subject" name="subject" required />

                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" rows="4" required></textarea>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="arrow-wrapper">
                        <Icon style={{ color: 'rgba(160, 60, 100, 0.9)' }} icon="ion:arrow-down" className='arrows' />
                    </div>
                </div>
                <div className="map-container">
                    <Map />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContactsPage;