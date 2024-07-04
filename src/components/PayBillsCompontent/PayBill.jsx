import React from 'react';
import { Link } from 'react-router-dom';
import './Paybill.css';

function Source() {
  return (
    <div className="mainDiv">
      <div className="btnDiv">
      <h2 className="modalTitle">Pay Bills</h2>
        <div className="buttons-container">
          <div className="left-buttons">
            <nav>
              <Link to="/airtime">
                <button type="button" className="button buy-airtime">
                  Airtime
                </button>
              </Link>
              <Link to="/data">
                <button type="button" className="button buy-data">Data</button>
              </Link>
              <Link to="/cable-tv">
                <button type="button" className="button cable-tv">Cable TV</button>
              </Link>
            </nav>
          </div>
          <div className="right-buttons">
            <Link to="/electricity">
              <button type="button" className="button buy-electricity">Electricity</button>
            </Link>
            <Link to="/internet-subscription">
              <button type="button" className="button internet-subscription">Internet Subscription</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Source;
