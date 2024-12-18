// src/components/ButtonDarkExample.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { UserContext } from '/src/contexts/UserContext';
import './style.css';

// import pfp from '/src/assets/pfp.png';


function ButtonDarkExample({ dropdownType }) {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    const handleScheduleClick = () => {
        navigate('/lessons'); 
    };

    const handleClassesClick = () => {
        navigate('/classes'); 
    }

    const handleSubscriptionClick = () => {
        navigate('/subscriptions'); 
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    const renderDropdownItems = () => {
        if (dropdownType === 'classes') {
            return (
                <>
                    <Dropdown.Item className='dpd-item' title="Dance Classes Schedule" active onClick={handleScheduleClick}>
                        SCHEDULE
                    </Dropdown.Item>

                    <Dropdown.Item className='dpd-item' title="Dance Classes" active onClick={handleClassesClick}>
                        CLASSES
                    </Dropdown.Item>

                    <Dropdown.Item className='dpd-item' title="Subscription Options" active onClick={handleSubscriptionClick}>
                        SUBSCRIPTIONS
                    </Dropdown.Item>


                    {/* <Dropdown.Item className='dpd-item' title="Group Class">
                        GROUP CLASS
                    </Dropdown.Item>*/}
                </>
            );
        } else if (dropdownType === 'account') {
            return (
                <>

                    <Dropdown.Item className='dpd-item' onClick={handleProfileClick}>
                        VIEW PROFILE
                    </Dropdown.Item>
                    <Dropdown.Item className='dpd-item' onClick={handleSettingsClick}>
                        SETTINGS
                    </Dropdown.Item>
                    <Dropdown.Item className='dpd-item' onClick={handleLogoutClick}>
                        LOGOUT
                    </Dropdown.Item>
                </>
            );
        }
    };

    return (
        <DropdownButton
            className='dpd-btn'
            variant="terciary"
            title={dropdownType === 'classes' ? "CLASSES" : `${user.name}`}
            data-bs-theme="dark"
            drop='down-centered'
        >
            {renderDropdownItems()}
        </DropdownButton>
    );
}

export default ButtonDarkExample;
