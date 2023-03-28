import React from 'react';
import '../styles/LandingHeaderStyle.css';
import { Link } from 'react-router-dom';
import headerimg from '../assets/homepage image.png';

const LandingHeader = () => {
  return (
    <header>
      <div className="header__view">
        <div>
          <div className="headertext__view">
            <h1>LeverPAY Is a</h1>
            <h1>
              <span className="gold">BLOCKCHAIN </span>
              Platform for Cryptocurrency
              <span className="gold">
                {' '}
                PAYMENTS, Facilitating Payment Everywhere{' '}
              </span>{' '}
              Around the Globe.
            </h1>
            <h1>Accept Bitcoin, Ethereum, Binance, USDT, and other Tokens.</h1>
          </div>
          <div className="headerbtn__view">
            <Link className='started__link'>
              Get Started <i className="uil uil-arrow-right"></i>
            </Link>
            <Link className='more__link'>Read More</Link>
          </div>
        </div>
        <div>
          <img src={headerimg} alt="header__img" />
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
