import React from 'react';
import logo from '../assets/logo 1.png';
import arrow from '../assets/downarrow.png';
import '../styles/LoginPageStyles.css';

const LoginComponent = () => {
  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4 mt-5">
                      <div className="card shadow-lg mb-5 bg-body rounded">
                        <div className="card-header no-background">
                            <div className="login-logo text-center mt-3 mb-3">
                                <img className="webview__logo" src={logo} alt="logo" />      
                            </div>
                            <span className="login-card-title">Sign In</span>      
                        </div>
                          <div className="card-body">
                              <form>
                                <div className="mb-3">
                                    <label for="username" className="form-label">USERNAME</label>
                                    <input type="email" className="form-control login-input" id="username" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="username" className="form-label">PASSWORD</label>
                                    <input type="password" className="form-control login-input" id="username" />
                                </div>
                                <div class="d-grid gap-2 mt-5">
                                    <button className="btn btn-custom login-btn" type="button">Sign In</button>
                                </div>
                                <div class="mb-3 mt-1">
                                    <a href='/' className="login-forgot-password login-anchor">Forgot Password?</a>
                                </div>
                                <div class="text-center mt-5">
                                    <span>Don't have an Account? </span><a href="/" className="login-anchor login-sign-up">Sign Up</a>
                                </div>
                             </form>
                        </div>
                       </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent