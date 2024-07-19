import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md"; // Import the icon
import style from "./CreatePinComponent.module.css";
import SecuredComponent from "../SecuredLogo/SecuredComponent";
import checkMark from "../../assets/Group.png";
import { savePin, resetPin } from "../../services/apiService";
import { useLocalState } from "../../utils/useLocalStorage";
import ScreenSuccessLoader from "../LoadingPage/ScreenSuccessLoader"; // Import the loader
import SuccessScreen from "../LoadingPage/SuccessScreen"; // Import the SuccessScreen

const CreatePinComponent = () => {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setNewPin(value);
    }
  };

  const handleConfirmPinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setConfirmPin(value);
    }
  };

  const toggleShowConfirmPin = () => {
    setShowConfirmPin(!showConfirmPin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPin || !confirmPin) {
      setPinErrorMessage("Both PIN fields are required.");
      return;
    }

    if (newPin.length === 4 && confirmPin.length === 4) {
      if (newPin === confirmPin) {
        setLoading(true);
        setShowLoader(true);
        try {
          const response = await savePin(newPin, confirmPin, jwt);
          if (response.success) {
            setPinErrorMessage("");
            setShowLoader(true);
            setTimeout(() => {
              setShowLoader(false);
              setShowSuccessScreen(true);
            }, 3000); // Wait for 3 seconds before showing the success screen
          } else {
            setPinErrorMessage(response.message || "Failed to create PIN");
            setShowLoader(false);
            setLoading(false);
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setJwt(""); // Or handle token refresh
            navigate("/signin");
          } else {
            setPinErrorMessage("An error occurred. Please try again.");
          }
          setShowLoader(false);
          setLoading(false);
        }
      } else {
        setPinErrorMessage("Pins do not match.");
      }
    } else {
      setPinErrorMessage("PIN must be exactly 4 digits.");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!newPin || !confirmPin) {
      setPinErrorMessage("Both PIN fields are required.");
      return;
    }

    if (newPin.length === 4 && confirmPin.length === 4) {
      if (newPin === confirmPin) {
        setLoading(true);
        setShowLoader(true);
        try {
          const response = await resetPin(newPin, confirmPin, jwt);
          if (response.success) {
            setPinErrorMessage("");
            setShowLoader(true);
            setTimeout(() => {
              setShowLoader(false);
              setShowSuccessScreen(true);
            }, 3000); // Wait for 3 seconds before showing the success screen
          } else {
            setPinErrorMessage(response.message || "Failed to reset PIN");
            setShowLoader(false);
            setLoading(false);
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setJwt(""); 
            navigate("/signin");
          } else {
            setPinErrorMessage("An error occurred. Please try again.");
          }
          setShowLoader(false);
          setLoading(false);
        }
      } else {
        setPinErrorMessage("Pins do not match.");
      }
    } else {
      setPinErrorMessage("PIN must be exactly 4 digits.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (showLoader) {
    return <ScreenSuccessLoader image={checkMark} height="282px" />;
  }

  if (showSuccessScreen) {
    return <SuccessScreen
    image={checkMark}
    text="Your Payment PIN has been Created Successfully"
    height="282px"
  />;
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.cancelIcon} onClick={handleCancel}>
        <MdOutlineCancel />
      </div>

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
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Pin'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={style.buttonCancel}
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Pin'}
        </button>
      </div>

      <div>
        <SecuredComponent />
      </div>
    </div>
  );
};

export default CreatePinComponent;
