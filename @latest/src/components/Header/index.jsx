import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo-removebg.png';
import ButtonDarkExample from '/src/components/Dropdown';
import { UserContext } from '/src/contexts/UserContext';
import './style.css';

import pfp from '/src/assets/pfp.png';

const Header = () => {
  const { user } = useContext(UserContext); // Access user and logout from context
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/register', { state: { isLoginMode: true } });
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
          <li><ButtonDarkExample dropdownType={"classes"} /></li>
          <li><Link to="/contacts">CONTACT</Link></li>
          <li><Link to="/merch">MERCH</Link></li>
          <li><Link to="/q&a">Q&A</Link></li> 
          <li>
            {user ? (
              <div className="profile-area">
                <img src={pfp} alt="user" className="user-image" />
                <ButtonDarkExample dropdownType={"account"}>
                </ButtonDarkExample>
              </div>
            ) : (
              <button onClick={handleLoginClick} className="login-button">
                LOGIN
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
