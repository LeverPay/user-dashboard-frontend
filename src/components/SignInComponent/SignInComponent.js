import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";

import LeverpayLogo from "../../assets/images/logo.png";
import EmailIcon from "../../assets/images/wallet.png"; // Ensure correct path
import PasswordIcon from "../../assets/images/password.png"; // Ensure correct path
import Blopp from "../../assets/images/black-logo.png"; // Ensure correct path

import "./SignInComponent.css";
import { signIn } from "../../services/apiService";
import { useLocalState } from "../../utils/useLocalStorage";
import { forgotPassword } from "../../services/forgotPassword";

const SignInComponent = () => {
  const inputRef = React.createRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");

  function toggleVisible() {
    setIsVisible(!isVisible);
  }

  const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let user = Object.fromEntries(formData);
    setSubmitted(true);
    signIn(user, jwt, setJwt, setSubmitted);
  };

  const handleForgetPassword = () => {
    forgotPassword();
  };

  useEffect(() => {
    // console.log(`JWT is: ${jwt}`);
  }, [jwt]);

  return (
      <div className="signin-container">
        <img src={LeverpayLogo} alt="" className="signin-logo" />
        <Form className="signin-form" onSubmit={login}>
          <h1>Sign in</h1>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                ref={inputRef}
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="signin-fields"
                required
            />
            <img src={EmailIcon} alt="" className="input-icon" />
          </Form.Group>
          <Form.Group className="sign-in-pwd mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type={isVisible ? 'text' : "password"}
                ref={inputRef}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                className="signin-fields"
                required
            />
            <img src={PasswordIcon} alt="" className="input-icon" />
            <img
                alt=""
                src={isVisible ? "/images/blind-light.png" : "/images/visible-light.png"}
                onClick={toggleVisible}
                className="visible-blind"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="signin-button">
            {submitted ? 'Loading... please wait' : 'Submit'}
          </Button>
          <p className="forgot-password-link" onClick={handleForgetPassword}>
            Forgot Password?
          </p>

          <div className="terms">
            <li>Privacy & Terms</li>
            <li>Contact Us</li>
          </div>

          <img src={Blopp} alt="" className="blop" />
        </Form>
        <ToastContainer />
      </div>
  );
};

export default SignInComponent;
