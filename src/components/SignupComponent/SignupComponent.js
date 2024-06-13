import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import LeverpayLogo from "../../assets/images/LeverpayLogo.png";
import signupMan from "../../assets/images/signup-man.png";
import chatIcon from "../../assets/images/chat.svg";
import personIcon from "../../assets/images/person-icon.svg";
import genderIcon from "../../assets/images/gender-icon.svg";
import dateIcon from "../../assets/images/date-icon.svg";
import lockIcon from "../../assets/images/ph_lock-simple-fill.svg";
import ellipseBottom from "../../assets/images/ellipse-bottom.svg";
import ellipseRight from "../../assets/images/ellipse-right.svg";
import emailIcon from "../../assets/images/email-icon.svg";
import eyeVisibleIcon from "../../assets/images/eye-icon.svg";
import passwordLockIcon from "../../assets/images/password-lock-icon.svg";
import phoneIcon from "../../assets/images/phone-icon.svg";
import referralIcon from "../../assets/images/referral-code-icon.svg";
import "./SignupComponent.css";
import PhoneNumberComponent from "../PhoneNumberComponent/PhoneNumberComponent";
import { AiOutlineEye } from "react-icons/ai";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  getCities,
  getCountry,
  getState,
  signUp,
} from "../../services/apiService";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function SignupComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [othername, setOthername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState([]);
  const [countryID, setCountryID] = useState("");
  const [state, setState] = useState([]);
  const [stateID, setStateID] = useState("");
  const [city, setCity] = useState([]);
  const [cityID, setCityID] = useState("");
  const [bvn, setBVN] = useState("");
  const [referralCode, setReferralCode] = useState(""); // New Referral Code state
  const [condition, setCondition] = useState(false);

  const handleCondition = (data) => {
    if (data === "checked") {
      if (condition === false) {
        console.log(data);
      }
    }
    setCondition(!condition);
  };

  const validatePassword = () => password === confirmPassword;

  const inputRef = React.createRef();

  const handlePasswordIcon = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleConfirmPasswordIcon = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
  };

  const handlePassword = (e) => {
    if (password.length < 9) {
      setSignupMessage("Password length should be at least 10 characters");
    } else {
      setSignupMessage("");
    }

    setPassword(e.target.value);
  };

  const signupSubmit = (e) => {
    e.preventDefault();

    if (condition === false) {
      toast.error("Please, check condition to proceed");
      return;
    }

    if (
      typeof phoneNumber.phone === "undefined" ||
      phoneNumber.phone.length < 10
    ) {
      setSignupMessage("invalid phone number, must be at least 10 digits");
      console.log(phoneNumber);

      return;
    } else {
      setSignupMessage("");
    }

    if (!/^\d{11}$/.test(bvn)) {
      setSignupMessage("BVN must be exactly 11 digits long");
      return;
    } else {
      setSignupMessage("");
    }

    const signupData = {
      first_name: firstName,
      last_name: lastName,
      other_name: othername,
      gender: gender,
      dob: Intl.DateTimeFormat("en").format(startDate),
      email: email,
      phone: phoneNumber.phone,
      password: password,
      country_id: countryID,
      state_id: stateID,
      city_id: cityID,
      bvn: bvn, // New BVN field
      referral_code: referralCode, // New Referral Code field
    };

    signUp({ signupData });
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    getCountry({ setCountry });
  }, []);

  useEffect(() => {
    getState({ countryID, setState });
  }, [countryID]);

  useEffect(() => {
    getCities({ stateID, setCity });
  }, [stateID]);

  // For animation sake

  const [animationClass, setAnimationClass] = useState("signup-form");
  const [currentStep, setCurrentStep] = useState(1);

  const handleButtonClick = () => {
    // Remove the animation class
    setAnimationClass("");

    // Move to the next step
    setCurrentStep(2);

    // Reapply the animation class after a short delay
    setTimeout(() => {
      setAnimationClass("signup-form");
    }, 0); // Adjust the delay as necessary
  };

  return (
    <section id="singup-section">
      <div className="signup-section-container">
        <Container className="logo-container">
          <div>
            <img src={LeverpayLogo} alt="signup-logo" className="signup-logo" />
          </div>

          <div className="signup-man-container">
            <img
              className="signup-man"
              src={signupMan}
              alt="an animated man siting down"
            />
          </div>

          <div>
            <p className="buddy-text">Hey Buddy!,</p>
            <p className="buddy-text">
              Stay <strong>Connected</strong> with Leverpay
            </p>
          </div>
        </Container>

        <div className="main-signup-form">
          <div className="signup-form-container">
            <img
              src={ellipseBottom}
              alt="ellipse bottom"
              className="ellipse-bottom"
            />
            <img
              src={ellipseRight}
              alt="ellipse right"
              className="ellipse-right"
            />
            <form className={animationClass} onSubmit={signupSubmit}>
              <div className="signup-steps-container">
                {currentStep === 1 && (
                  <div id="signup-first-step">
                    <div className="register-title-container">
                      <p className="register-title">Register</p>
                      <p className="register-text">Personal Information</p>
                    </div>

                    {/* First Name */}
                    <div className="form-input">
                      <img src={personIcon} alt="person icon" />
                      <input
                        type="text"
                        className="input"
                        value={firstName}
                        name="first_name"
                        ref={inputRef}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    {/* Last Name */}
                    <div className="form-input">
                      <img src={personIcon} alt="person icon" />
                      <input
                        type="text"
                        className="input"
                        value={lastName}
                        name="last_name"
                        ref={inputRef}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    {/* Other Name */}
                    <div className="form-input">
                      <img src={personIcon} alt="person icon" />
                      <input
                        type="text"
                        className="input"
                        value={othername}
                        name="other_name"
                        ref={inputRef}
                        placeholder="Other Name"
                        onChange={(e) => setOthername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-input">
                      <img src={genderIcon} alt="gender icon" />
                      <select
                        aria-label="Default select example"
                        className="gender-select"
                        onChange={handleGender}
                      >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    {/* Date */}
                    <div className="form-input">
                      <img src={dateIcon} alt="date icon" />
                      <input
                        type="date"
                        className="input"
                        value={startDate}
                        name="date"
                        ref={inputRef}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>

                    <input
                      type="button"
                      className="signup-proceed-btn"
                      onClick={handleButtonClick}
                      value="Save an Proceed"
                    />

                    <input
                      type="button"
                      className="signup-cancel-btn"
                      value="Cancel Registration"
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div id="signup-second-step">
                    <div className="register-title-container">
                      <p className="register-title">Continue Registeration</p>
                    </div>

                    {/* Phone*/}
                    <div className="form-input">
                      <div className="input-image-container">
                        <img
                          src={phoneIcon}
                          className="small-icon"
                          alt="phone icon"
                        />
                      </div>
                      <input
                        type="text"
                        className="input"
                        value={phoneNumber}
                        ref={inputRef}
                        placeholder="Phone"
                        name="phone_number"
                        onchange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    {/* Email */}
                    <div className="form-input">
                      <div className="input-image-container">
                        <img src={emailIcon} alt="email icon" />
                      </div>
                      <input
                        type="email"
                        className="input"
                        value={email}
                        name="email"
                        ref={inputRef}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {/* Password */}
                    <div className="form-input">
                      <div className="input-image-container">
                        <img src={passwordLockIcon} alt="password icon" />
                      </div>
                      <input
                        type={passwordType}
                        className="input password_input_field"
                        value={password}
                        name="password"
                        ref={inputRef}
                        placeholder="Password"
                        onChange={handlePassword}
                        required
                      />

                      <button
                        type="button"
                        onClick={handlePasswordIcon}
                        className="password_btn"
                      >
                        {passwordType === "text" ? (
                          <IoEye className="eye-icon" />
                        ) : (
                          <IoEyeOff className="eye-icon" />
                        )}
                      </button>
                    </div>
                    {/* Confirm Password */}
                    <div className="form-input">
                      <div className="input-image-container">
                        <img src={passwordLockIcon} alt="password icon" />
                      </div>
                      <input
                        type={passwordType}
                        className="input"
                        value={confirmPassword}
                        name="confirmPassword"
                        ref={inputRef}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={handleConfirmPasswordIcon}
                        className="password_btn"
                      >
                        {confirmPasswordType === "text" ? (
                          <IoEye className="eye-icon" />
                        ) : (
                          <IoEyeOff className="eye-icon" />
                        )}
                      </button>
                    </div>
                    {/* Referral Code */}
                    <div className="form-input">
                      <div className="input-image-container">
                        <img src={referralIcon} alt="referral code icon" />
                      </div>
                      <input
                        type="text"
                        className="input"
                        value={referralCode}
                        name="referral_code"
                        ref={inputRef}
                        placeholder="Referral Code"
                        onChange={(e) => setReferralCode(e.target.value)}
                      />
                    </div>

                    <p className="lufga-text">
                      We are <span>NDPR and GDPR</span> Compliant . By
                      proceeding with this Application, you agree to the storage
                      and usage of your Data by Leverpay in accordance with our
                      privacy and policy
                    </p>

                    <div className="privacy-condition">
                      <input
                        type="checkbox"
                        name="privacy-policy"
                        aria-label="option 1"
                        className="checkbox-condition"
                        value={condition}
                        onChange={() => handleCondition("checked")}
                      />
                      <p>
                        I agree to Leverpay terms and conditions and{" "}
                        <Link
                          to="https://leverpay.io/privacy-policy/"
                          className="link-to-privacy"
                        >
                          Privacy Policy
                        </Link>
                      </p>
                    </div>

                    <button className="signup-btn">Sign Up</button>

                    <div className="signup-extra-options">
                      <p>
                        Already have an account?{" "}
                        <Link to="" className="option-signin">
                          Sign In
                        </Link>
                      </p>
                      <p>
                        Already registered?{" "}
                        <Link to="" className="option-verify">
                          Continue to email verification
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="signup-footer">
                <img src={lockIcon} alt="lock icon" />
                <p>
                  Secured by <strong>LeverPay</strong>
                </p>
              </div>
            </form>
          </div>

          <button className="chat-button">
            <img src={chatIcon} alt="chat icon" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SignupComponent;
