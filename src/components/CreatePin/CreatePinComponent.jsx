import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link for navigation
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Import icons
import style from "./CreatePinComponent.module.css";
import SecuredComponent from "../SecuredLogo/SecuredComponent";

const CreatePinComponent = () => {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showConfirmPin, setShowConfirmPin] = useState(false); // State to toggle confirm PIN visibility
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    // Ensure pin input does not exceed 4 characters
    if (value.length <= 4) {
      setNewPin(value);
    }
  };

  const handleConfirmPinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    // Ensure confirm pin input does not exceed 4 characters
    if (value.length <= 4) {
      setConfirmPin(value);
    }
  };

  const toggleShowConfirmPin = () => {
    setShowConfirmPin(!showConfirmPin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if pin is exactly 4 characters
    if (newPin.length === 4 && confirmPin.length === 4) {
      // Check if the new pin matches the confirm pin
      if (newPin === confirmPin) {
        // Handle pin submit logic
        console.log("New PIN submitted:", newPin);
        setPinErrorMessage(""); // Clear error message
      } else {
        setPinErrorMessage("Pins do not match.");
      }
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
        <h1>Create / Reset Payment PIN</h1>
      </div>

      <div className={style.enterPinDiv}>
        <h2>New Pin</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.pinInputContainer}>
            <input
              type="password"
              value={newPin}
              onChange={handlePinChange}
              placeholder="Enter New PIN"
              className={style.pinInput}
              maxLength={4} // Limit input to 4 characters
            />
          </div>

          <div className={style.pinInputContainer}>
            <h2>Confirm Pin</h2>
            <input
              type={showConfirmPin ? "text" : "password"}
              value={confirmPin}
              onChange={handleConfirmPinChange}
              placeholder="Confirm New PIN"
              className={style.pinInput}
              maxLength={4} // Limit input to 4 characters
            />
            <span className={style.eyeIcon} onClick={toggleShowConfirmPin}>
              <div className={style.eyeIcon2}>
                {showConfirmPin ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </span>
          </div>
          {pinErrorMessage && (
            <p className={style.errorMessage}>{pinErrorMessage}</p>
          )}
        </form>
      </div>
      <div className={style.buttonGroup}>
        <button
          type="submit"
          className={style.buttonSubmit}
          onClick={handleSubmit}
        >
          Save Pin
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={style.buttonCancel}
        >
          Reset pin
        </button>
      </div>

      <div>
        <SecuredComponent />
      </div>
    </div>
  );
};

export default CreatePinComponent;
