import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Map from '../../../components/Map';
import './style.css';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from '../../../components/Toast';
import 'react-toastify/dist/ReactToastify.css';

const subjectOptions = [
    { id: 'subject_class_related', label: 'Class Related' },
    { id: 'subject_joining_us', label: 'Joining Us' },
    { id: 'subject_general_inquiry', label: 'General Inquiry' },
    { id: 'subject_billing_payments', label: 'Billing and Payments' },
    { id: 'subject_events_recitals', label: 'Events and Recitals' },
    { id: 'subject_private_lessons', label: 'Private Lessons' },
    { id: 'subject_feedback_suggestions', label: 'Feedback and Suggestions' },
];

const ContactsPage = () => {
    const notify = () => showToast( "success","Thanks for the message!");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(`Updated ${name} to ${value}`); // Debugging log
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(formData); // Debugging log
        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/contact`, formData);
            if (response.status === 200) {
                notify();
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error("There was an error submitting the form!", error);
            toast.error("There was an error submitting the form. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
                    </div>
                </div>
                <div className="contact-form-wrapper">
                    <div className="arrow-wrapper">
                        <Icon style={{ color: '#6a1b9a' }} icon="ion:arrow-down" className='arrows' />
                    </div>
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="subject">Please select the subject:</label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            >
                                {subjectOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>

                            <button type="submit" disabled={isLoading}>Submit</button>
                            
                        </form>
                    </div>
                    <div className="arrow-wrapper">
                        <Icon style={{ color: '#6a1b9a' }} icon="ion:arrow-down" className='arrows' />
                    </div>
                </div>
                <div className="map-container">
                    <Map />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactsPage;
