import LeverpayLogo from "../../assets/LeverpayLogo.png";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaHome, FaReceipt, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";
import "../NavComponent/NavComponent.css";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
const NavComponent = () => {
  return (
    <>
      <Navbar
        expand="md"
        bg="#0E093F"
        variant="dark"
        className="flex-column side-nav-container"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav defaultActiveKey="/" className="flex-column my-tweak">
              <div className="navbar-logo ">
                <center>
                  {" "}
                  <img src={LeverpayLogo} alt="" style={{ width: "100%" }} />
                </center>
              </div>
              <div className="nav-options">
                {" "}
                <ul className="list-unstyled">
                  <li>
                    {" "}
                    <Link to="/" className="text-link">
                      <FaHome size={18} variant="dark" />
                      {"\u00A0"}Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/transactions" className="text-link">
                      <BsGraphUpArrow size={18} color="#929EAE" />
                      {"\u00A0"}Transactions
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/invoices" className="text-link">
                      <FaReceipt size={18} color="#929EAE" />
                      {"\u00A0"} Invoices
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/my cards" className="text-link">
                      <FaWallet size={18} color="#929EAE" />
                      {"\u00A0"} My Cards
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="text-link">
                      <RiSettings4Fill size={18} color="#929EAE" />
                      {"\u00A0"} Settings
                    </Link>
                  </li>{" "}
                </ul>
              </div>
              <div className="bottom-options">
                {" "}
                <ul className="list-unstyled">
                  <li>
                    {" "}
                    <Link to="#" className="bottom-link">
                      <MdLiveHelp size={18} color="#929EAE" />
                      {"\u00A0"} help
                    </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="#" className="bottom-link">
                      <FaSignOutAlt size={18} color="#929EAE" />
                      {"\u00A0"} logout
                    </Link>
                  </li>
                </ul>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavComponent;
