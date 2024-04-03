import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import LeverpayLogo from "../../assets/images/LeverpayLogo.png";
import "./SignupComponent.css";
import PhoneNumberComponent from "../PhoneNumberComponent/PhoneNumberComponent";
import { AiOutlineEye } from "react-icons/ai";
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
  const handleIcon = (reveal) => {
    reveal =
      passwordType === "password"
        ? setPasswordType("text")
        : setPasswordType("password");

    return reveal;
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

  return (
    <>
      <Container className="logo-container">
        <Row>
          <img src={LeverpayLogo} alt="signup-logo" className="signup-logo" />
        </Row>
      </Container>
      <Container className="signup-container">
        <h3>Create an account</h3>
        <Form className="signup-form" onSubmit={signupSubmit}>
          <Row className="form-input">
            <Form.Label htmlFor="firstname" className="labels">
              First name
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={firstName}
              name="first_name"
              ref={inputRef}
              placeholder=""
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="lastname" className="labels">
              Last name
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={lastName}
              name="last_name"
              ref={inputRef}
              placeholder=""
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="lastname" className="labels">
              Othername
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={othername}
              name="other_name"
              ref={inputRef}
              placeholder=""
              onChange={(e) => setOthername(e.target.value)}
              required
            />
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="bvn" className="labels">
              BVN
            </Form.Label>
            <Form.Control
              type="number"
              className="input"
              value={bvn}
              name="bvn"
              ref={inputRef}
              placeholder=""
              onChange={(e) => setBVN(e.target.value)}
              required // Make BVN a required field
            />
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="email" className="labels">
              Gender
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              className="gender-select"
              onChange={handleGender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="email" className="labels">
              Date of Birth
            </Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="dob"
              // dateFormat="Pp"
            />
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="email" className="labels">
              Email
            </Form.Label>
            <Form.Control
              type="email"
              className="input"
              value={email}
              name="email"
              ref={inputRef}
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="phone" className="labels">
              Phone Number
            </Form.Label>
            <PhoneNumberComponent
              name="phone_number"
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              className="input"
            />
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="email" className="labels">
              Country
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setCountryID(e.target.value)}
              className="country-select"
            >
              <option>Select your country</option>
              {country.map((c) => {
                return <option value={c.id}>{c.country_name}</option>;
              })}
            </Form.Select>
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="email" className="labels">
              State
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setStateID(e.target.value)}
              className="state-select"
            >
              <option>Select your state</option>
              {state.map((s) => {
                return <option value={s.id}>{s.state_name}</option>;
              })}
            </Form.Select>
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="email" className="labels">
              City
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setCityID(e.target.value)}
              className="city-select"
            >
              <option>Select your city</option>
              {city.map((c) => {
                return <option value={c.id}>{c.city_name}</option>;
              })}
            </Form.Select>
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="referralCode" className="labels">
              Referral Code
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={referralCode}
              name="referral_code"
              ref={inputRef}
              placeholder=""
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="password" className="labels">
              Password
            </Form.Label>
            <Form.Control
              type={passwordType}
              className="input"
              value={password}
              name="password"
              ref={inputRef}
              placeholder=""
              onChange={handlePassword}
              required
            />
            <AiOutlineEye size={25} onClick={handleIcon} className="eye-icon" />
            <p className="error-message">{signupMessage}</p>
          </Row>
          <Row className="form-input">
            <Form.Label htmlFor="password" className="labels">
              Confirm Password
            </Form.Label>
            <Form.Control
              type={passwordType}
              className="input"
              value={confirmPassword}
              name="confirmPassword"
              ref={inputRef}
              placeholder=""
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <AiOutlineEye size={25} onClick={handleIcon} className="eye-icon" />
            {!validatePassword() && (
              <p className="error-message">Passwords do not match</p>
            )}
          </Row>
          <Row className="checkbox-container mt-3">
            <Form.Check
              aria-label="option 1"
              className="checkbox-condition"
              value={condition}
              onChange={() => handleCondition("checked")}
            />
            <p className="condition-text">
              <small className="text-inner">
                We are NDPR Compliant. By proceeding with this application, you
                agree to the storage and usage of your data by LSETF in
                accordance with our{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://leverpay.io/privacy-policy/"
                >
                  privacy policy
                </a>
              </small>
            </p>
          </Row>
          <Button variant="primary" type="submit" className="signup-btn">
            Create Account
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
}

export default SignupComponent;
