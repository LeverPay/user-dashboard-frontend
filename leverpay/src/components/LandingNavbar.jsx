import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo 1.png';
import arrow from '../assets/downarrow.png';
import '../styles/LandingPageStyles.css';

function LandingNavbar() {
  return (
    <nav>
      <div className="web__view">
        <img className="webview__logo" src={logo} alt="logo" />
        <div className="web__viewlist">
          <ul>
            <li>Home</li>
            <li>How it Works</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="web__viewlist">
          <ul>
            <li className="lang">
              ENG <img src={arrow} alt="arrow placeholder" />
            </li>
            <li>
              <Link className="login__btnview" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;
