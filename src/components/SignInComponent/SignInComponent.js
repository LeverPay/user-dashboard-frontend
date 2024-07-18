import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import LeverpayLogo from "../../assets/images/black-logo.png";
import SignInImage from "../../assets/sign-in-image.png";
import ChatIcon from "../../assets/chat.png";
import { CiMail } from "react-icons/ci";
import { BiSolidLock } from "react-icons/bi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import Blopp from "../../assets/big-blop.png";
import "./SignInComponent.css";
import { signIn } from "../../services/apiService";
import { useLocalState } from "../../utils/useLocalStorage";
import { forgotPassword } from "../../services/forgotPassword";
// import { useNavigate } from "react-router-dom";

const SignInComponent = () => {
    const inputRef = React.createRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isvisible, setIsvisible] = useState(false);
    const [jwt, setJwt] = useLocalState("", "jwt");

    // console.log(process.env.REACT_APP_LEVERPAY_API_URL);

    function toggleVisible() {
        setIsvisible(!isvisible);
    }

    const login = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData);

        setSubmitted(true);
        await signIn(user, setJwt); // Pass setJwt correctly
        setSubmitted(false);
    };

    const handleForgetPassword = () => {
        forgotPassword();
    };

    useEffect(() => {
        //console.log(`JWT is: ${jwt}`);
    }, [jwt]);

    return (
        <div className="signin-container">
                <div className="image-container">
                    <img src={LeverpayLogo} alt="" className="signin-logo" />
                    <div className="image-bg">
                        <img src={SignInImage} alt="" className="img" />
                    </div>
                    <div className="bg-text">
                        <p>Secure Login <span>for all your <br/>Transactions!</span></p>
                        <div className="chat-contain">
                            <img src={ChatIcon} alt="" className="chat-icon"/>
                        </div>
                    </div>

                </div>
                
                <div className="form-container">
                    <p className="link">
                        Don't have Account yet?{" "}
                        <span
                            className="signup-link"
                            onClick={() =>
                                (window.location.href = "/leverpay-signup")
                            }
                        >
                            Create
                        </span>
                    </p>
                    <Form className="signin-form" onSubmit={login}>
                        <h1 className="welcome-text">Welcome Back</h1>
                        <img src={LeverpayLogo} alt="" className="signin-logo mobile-logo" />

                        <Form.Group
                            className="mb-3 sign-in-email"
                            controlId="formGroupEmail"
                        >
                            <Form.Control
                                type="email"
                                ref={inputRef}
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email ID"
                                className="signin-fields"
                                required
                            />
                            <CiMail size={20} alt="" className="input-icon" />
                        </Form.Group>
                        <Form.Group
                            className="sign-in-pwd mb-3"
                            controlId="formGroupPassword"
                        >
                            <Form.Control
                                type={isvisible ? "text" : "password"}
                                ref={inputRef}
                                value={password}
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="signin-fields"
                                required
                            />
                            <BiSolidLock size={20} className="input-icon" />
                            <span
                                onClick={toggleVisible}
                                className="visible-blind">
                                {
                                    isvisible
                                        ? <AiOutlineEyeInvisible size={20}  />
                                        : <IoEyeOutline size={20} />
                                }
                                
                            </span>
                        </Form.Group>

                        <Button
                            // variant="primary"
                            type="submit"
                            className="signin-button"
                        >
                            {submitted ? "Loading... please wait" : "Login"}
                        </Button>
                        <p
                            className="forgot-password-link"
                            onClick={handleForgetPassword}
                        >
                            Forgot Password?
                        </p>
                    </Form>

                    <div className="terms">
                        <li>Privacy & Terms</li>
                        <li>Contact Us</li>
                    </div>

                    <div className="secured">
                        <span><BiSolidLock/></span>
                        <span>Secured by <strong>LeverPay</strong></span>
                    </div>


                    <img src={Blopp} alt="" className="blop" />
                    <img src={Blopp} alt="" className="blop1" />

                    <ToastContainer />
                </div>
        </div>
    );
};

export default SignInComponent;
