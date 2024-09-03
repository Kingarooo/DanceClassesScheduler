// src/components/ButtonDarkExample.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { UserContext } from '/src/contexts/UserContext';
import './style.css';

import pfp from '/src/assets/pfp.png';


function ButtonDarkExample({ dropdownType }) {
    const { user, logout } = useContext(UserContext); 
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout(); 
        navigate('/'); 
    };

    const handleClassClick = () => {
        navigate('/free-lesson'); // Redirect to the classes page
    };
    const renderDropdownItems = () => {
        if (dropdownType === 'classes') {
            return (
                <>
                    <Dropdown.Item className='dpd-item' title="Individual Class" active onClick={handleClassClick}>
                        INDIVIDUAL CLASS
                    </Dropdown.Item>
                    <Dropdown.Item className='dpd-item' title="Group Class">
                        GROUP CLASS
                    </Dropdown.Item>
                    <Dropdown.Item className='dpd-item' title="Street Style">
                        STREET MOVEMENT
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className='dpd-item' title="*New* Tango">
                        *NEW* TANGO
                    </Dropdown.Item>
                </>
            );
        } else if (dropdownType === 'account') {
            return (
                <>

                    <Dropdown.Item className='dpd-item' href="/profile">
                        VIEW PROFILE
                    </Dropdown.Item>
                    <Dropdown.Item className='dpd-item' href="/settings">
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
            id={`dropdown-button-dark-example-${dropdownType}`}
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
