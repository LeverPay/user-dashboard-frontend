import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LeverpayLogo from "../../assets/images/logo.png";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastr";
import { userResetPassword } from "../../services/apiService";
import { useLocalState } from "../../utils/useLocalStorage";
import "./ResetPassword.css";

const ResetPassword = () => {
  const inputRef = React.createRef();

  const [resetToken, setResetToken] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  const handleResetPassword = (e) => {
    e.preventDefault();

    const resetData = new FormData(e.currentTarget);

    const passwordReset = Object.fromEntries(resetData);

    userResetPassword(passwordReset, setJwt);
  };

  return (
    <div className="reset-password-container">
      <img src={LeverpayLogo} alt="" className="logo" />
      <Form className="reset-password-form" onSubmit={handleResetPassword}>
        <h1>Reset Password</h1>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Enter token</Form.Label>
          <Form.Control
            type="text"
            ref={inputRef}
            value={resetToken}
            name="token"
            onChange={(e) => setResetToken(e.target.value)}
            placeholder="enter token"
            className="reset-password-fields"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            ref={inputRef}
            value={resetPassword}
            name="new_password"
            onChange={(e) => setResetPassword(e.target.value)}
            placeholder="enter new password"
            className="reset-password-fields"
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="reset-password-button"
        >
          Change Password
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
