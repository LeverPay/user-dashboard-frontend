import React from 'react';
import companyLogo from "../../../assets/LeverpayLogo.png"; // Adjust the path to your logo image
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <img src={companyLogo} alt="Loading..." className="loading-logo" />
    </div>
  );
};

export default LoadingScreen;
