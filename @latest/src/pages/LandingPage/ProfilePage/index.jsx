import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import pfp from '/src/assets/pfp.png';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { UserContext } from '/src/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const { user, login } = useContext(UserContext);  // Fetch user info from context
    const [loggedUser, setLoggedUser] = useState({});
    const [topUsers, setTopUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user) {
                navigate('/login');
                
            }
            try {
                const response = await axios.get(`http://localhost:8080/profile/user-info/${user.id}`);
                console.log("Getting user info: ", response.data);
                setLoggedUser(response.data.user);  // Accessing the user key in response
            } catch (error) {
                console.error('Error fetching user info: ', error);
            }
        };

        fetchUserInfo();
    }, [user, login, navigate]);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/profile/top-users`);
                console.log("Getting top users: ", response.data);
                setTopUsers(response.data.topUsers); 
            } catch (error) {
                console.error('Error fetching top users: ', error);
            }
        };

        fetchTopUsers();
    }, []);

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-box">
                <div className="profile-header">
                    <div className="profile-image">
                        <img src={loggedUser.profilePic || pfp} alt="User Profile" />
                    </div>
                    <h1 className="profile-name">{loggedUser.name}</h1>
                </div>

                <div className="profile-content">
                    <div className="profile-column prizes-column">
                        <h2>Prizes</h2>
                        <p>Still developing...</p>
                    </div>

                    {login && (
                        <div className="profile-column details-column">
                            <div className="profile-card">
                                <h2>Email</h2>
                                <p>{loggedUser.email}</p>
                            </div>
                            <div className="profile-card">
                                <h2>Username</h2>
                                <p>{loggedUser.name}</p>
                            </div>
                            <div className="profile-card">
                                <h2>Total Points</h2>
                                <p>{loggedUser.totalAttendance} Points</p>
                            </div>
                            {/* <div className="profile-card">
                                <h2>Classes Attending</h2>
                                <p>{loggedUser.classesAttending.length > 0 || 0} Classes</p>
                            </div> */}
                            {/* <div className="profile-card">
                                <h2>Classes Teaching</h2>
                                <p>{loggedUser.classesTeaching.length > 0|| 0} Classes</p>
                            </div> */}
                        </div>
                    )}

                    <div className="profile-column top-users-column">
                        <h2>Top Users Points</h2>
                        {topUsers.length > 0 ? (
                            topUsers.map((topUser, index) => (
                                <div
                                    key={topUser.id}
                                    className={`top-user ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}`}
                                >
                                    <p>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''} {topUser.name} - {topUser.totalAttendance} </p>
                                </div>
                            ))
                        ) : (
                            <p>Loading top users...</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
    