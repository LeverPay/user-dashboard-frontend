import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import LeverpayLogo_Blue from "../../assets/LeverpayLogo_Blue.png";
import "./SignInComponent.css";
import { signIn } from "../../services/apiService";
import { useLocalState } from "../../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const SignInComponent = () => {
  const inputRef = React.createRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData);

    //api call
    signIn(user, jwt, setJwt);
    //
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);
  };

  useEffect(() => {
    //console.log(`JWT is: ${jwt}`);
  }, [jwt]);

  return (
    <div className="signin-container">
      <img src={LeverpayLogo_Blue} alt="" className="signin-logo" />
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
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={inputRef}
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            className="signin-fields"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="signin-button">
          Submit
        </Button>
        <p>Forgot Password</p>
      </Form>
      <ToastContainer style={{ dispay: "flex", textAlign: "left" }} />
    </div>
  );
};

export default SignInComponent;
