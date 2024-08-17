import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo-removebg.png';
import ButtonDarkExample from '../Dropdown';
import './style.css';
import { UserContext } from '/src/contexts/UserContext';

import pfp from '/src/assets/defaultPfp.png'

const Header = () => {
  const { user, logout } = useContext(UserContext); // Access user and logout from context
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/register', { state: { isLoginMode: true } });
  };

  const handleLogoutClick = () => {
    logout(); // Clear the user data
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
          <h1 className="title">Soul Motion</h1>
        </div>
      </Link>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><ButtonDarkExample /></li>
          <li><Link to="/contacts">CONTACT</Link></li>
          <li><Link to="/merch">MERCH</Link></li>
          <li><Link to="/q&a">Q&A</Link></li>
          <li>
          {(user == null) ? (
              <button onClick={handleLoginClick} className="login-button">
                Login
              </button>
            ) : (
              <button onClick={handleLogoutClick} className="login-button">
                <img className="pfp-box" src={pfp} alt="pfp" />
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
