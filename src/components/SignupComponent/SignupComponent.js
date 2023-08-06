import React, { useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import LeverpayLogo from "../../assets/images/LeverpayLogo.png";
import "./SignupComponent.css";
import PhoneNumberComponent from "../PhoneNumberComponent/PhoneNumberComponent";
import { AiOutlineEye } from "react-icons/ai";
import SignupModal from "./SignupModal/SignupModal";
import { signUp } from "../../services/apiService";
import { ToastContainer } from "react-toastify";

function SignupComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const [show, setShow] = useState(false);

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

    // let regex = new RegExp(/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/);
    // let newNumber = "+".concat(phoneNumber.phone);

    if (phoneNumber.phone.length < 10) {
      setSignupMessage("invalid phone number, must be at least 10 digits");
      return;
    } else {
      setSignupMessage("");
    }

    const signupData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phoneNumber.phone,
      password: password,
    };

    // console.log(signupData);

    signUp(signupData);
  };

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
              onChange={
                (e) => setFirstName(e.target.value)
                // setFirstName(e.target.value.replace(/\D/g, ""))
              }
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
              onChange={
                (e) => setLastName(e.target.value)
                // setFirstName(e.target.value.replace(/\D/g, ""))
              }
              required
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
            <div className="password-message">{signupMessage}</div>
          </Row>
          <Button variant="primary" type="submit" className="signup-btn">
            Create Account
          </Button>
        </Form>
      </Container>
      <SignupModal signupOTP={show} setSignupOTP={setShow} />
      <ToastContainer />
    </>
  );
}

export default SignupComponent;
