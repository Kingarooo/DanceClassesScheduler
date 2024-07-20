import { Link } from 'react-router-dom';
import logo from '/src/assets/logo-removebg.png';
import './style.css';
// import { Dropdown } from 'bootstrap';
import ButtonDarkExample from '/src/components/Dropdown';

const Header = () => {
  // const navigate = useNavigate();
  return (
    <header className="header" >
      <Link to="/">
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
          <h1 className='title'>SoulRythm</h1>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
