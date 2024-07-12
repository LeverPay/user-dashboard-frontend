import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Import icons
import style from "./EnterPinScreen.module.css";
import SecuredComponent from "../SecuredLogo/SecuredComponent";

const EnterPinScreen = () => {
  const [pin, setPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showPin, setShowPin] = useState(false); // State to toggle PIN visibility
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    // Ensure pin input does not exceed 4 characters
    if (value.length <= 4) {
      setPin(value);
    }
  };

  const toggleShowPin = () => {
    setShowPin(!showPin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if pin is exactly 4 characters
    if (pin.length === 4) {
      // Handle pin submit logic
      console.log("PIN submitted:", pin);
    } else {
      setPinErrorMessage("PIN must be exactly 4 digits.");
    }
  };

  const handleCancel = () => {
    // Handle cancel logic, navigate back to previous page
    navigate(-1); // Navigate back one step in the history stack
  };

  return (
    <div className={style.mainDiv}>
      <div className={style.h2Tag}>
        <h1>
          Please Enter your Payment PIN to <br />
          Confirm Transaction
        </h1>
      </div>

      <div className={style.enterPinDiv}>
        <h2>Enter Pin</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.pinInputContainer}>
            <input
              type={showPin ? "text" : "password"}
              value={pin}
              onChange={handlePinChange}
              placeholder="Enter PIN"
              className={style.pinInput}
              maxLength={4} // Limit input to 4 characters
            />
            <span className={style.eyeIcon} onClick={toggleShowPin}>
              <div className={style.eyeIcon2}>
                {showPin ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </span>
          </div>
          {pinErrorMessage && (
            <p className={style.errorMessage}>{pinErrorMessage}</p>
          )}
        </form>
      </div>
      <div className={style.buttonGroup}>
        <button type="submit" className={style.buttonSubmit} onClick={handleSubmit}>
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={style.buttonCancel}
        >
          Cancel
        </button>
      </div>

      <div className={style.ptag}>
        <p>
          Don’t have a PIN yet? <Link to="/create-pin"><span>Create</span></Link>
        </p>
      </div>
      <div>
        <SecuredComponent />
      </div>
    </div>
  );
};

export default EnterPinScreen;
