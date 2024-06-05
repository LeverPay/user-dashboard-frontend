import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
// import { ToastContainer, toast } from "react-toastify";
import { ToastContainer } from "react-toastr";
import Button from "react-bootstrap/Button";
// import LeverpayLogo_Blue from "../../assets/LeverpayLogo_Blue.png";
import LeverpayLogo from "../../assets/images/black-logo.png";
import SignInImage from "../../assets/sign-in-image.png";
import EmailIcon from "../../assets/images/email.png";
import PasswordIcon from "../../assets/images/password.png";
import Blopp from "../../assets/big-blop.png";
import "./SignInComponent.css";
import { signIn } from "../../services/apiService";
import { useLocalState } from "../../utils/useLocalStorage";
import { forgotPassword } from "../../services/forgotPassword";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const SignInComponent = () => {
  const inputRef = React.createRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)
  const [isvisible, setIsvisible] = useState(false)
  const [jwt, setJwt] = useLocalState("", "jwt");

  function toggleVisible(){
    setIsvisible(!isvisible)
  }

  const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData);

    //api call
    signIn(user, jwt, setJwt);
    setSubmitted(true)
  };

  const handleForgetPassword = () => {
    forgotPassword();
  };

  useEffect(() => {
    //console.log(`JWT is: ${jwt}`);
  }, [jwt]);

  return (
    <div className="signin-container">
      <div className="images-container">
        <img src={LeverpayLogo} alt="" className="signin-logo" />
        <img src={SignInImage} alt="" className="signin-image" />
      </div>
      <div className="form-container">
        <p>
          Don't have an account?{" "}
          <span
            className="signup-link"
            onClick={() => (window.location.href = "/leverpay-signup")}
          >
            Create account
          </span>
        </p>
        <Form className="signin-form" onSubmit={login}>
          <h1 className="welcome-text">Welcome Back</h1>
          <Form.Group className="mb-3 sign-in-email" controlId="formGroupEmail">
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
            <Form.Control
              type={isvisible ? 'text' : "password"}
              ref={inputRef}
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="signin-fields"
              required
            />
            <img src={PasswordIcon} alt="" className="input-icon" />
            <img alt="" src={isvisible ? "/images/blind-light.png" : "/images/visible-light.png"} onClick={toggleVisible} className="visible-blind" />
          </Form.Group>

          <Button variant="primary" type="submit" className="signin-button">
            {submitted ? 'Loading... please wait':'Login'}
          </Button>
          <p className="forgot-password-link" onClick={handleForgetPassword}>
            Forgot Password?
          </p>
        </Form>

        <div className="terms">
          <li>Privacy & Terms</li>
          <li>Contact Us</li>
        </div>

        <img src={Blopp} alt="" className="blop"/>
      
      <ToastContainer />
      </div>
    </div>
  );
};

export default SignInComponent;
