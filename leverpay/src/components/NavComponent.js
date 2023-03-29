import React from "react";
import { Link } from "react-router-dom";
import LeverpayLogo from "../assets/images/LeverpayLogo.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaHome, FaReceipt, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";
import "../Styles/SideNav.css";

const NavComponent = () => {
  return (
    <div className="navContainer">
      <div className="logoPosition">
        <img src={LeverpayLogo} alt="" />
      </div>
      <div className="navBox">
        <div className="navOptions">
          <Navbar
            expand="md"
            bg="#0E093F"
            variant="dark"
            className="flex-column"
          >
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav defaultActiveKey="#home" className="flex-column">
                  <Link to="/" className="dashboardActive">
                    <h3 className="dashboardOption">
                      <FaHome size={18} />
                      {"\u00A0"} Dashboard
                    </h3>
                  </Link>
                  <Link to="/transactions" className="transactionOption">
                    <BsGraphUpArrow size={18} color="#929EAE" />
                    {"\u00A0"} Transactions
                  </Link>
                  <Link to="/invoices" className="invoicesOption">
                    <FaReceipt size={18} color="#929EAE" />
                    {"\u00A0"} Invoices
                  </Link>
                  <Link to="/my cards" className="myCardOption">
                    <FaWallet size={18} color="#929EAE" />
                    {"\u00A0"} My Cards
                  </Link>
                  <Link to="/settings" className="settingsOption">
                    <RiSettings4Fill size={18} color="#929EAE" />
                    {"\u00A0"} Settings
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="navBottom">
          <p className="dashboardHelp">
            <MdLiveHelp size={18} color="#929EAE" />
            {"\u00A0"}help
          </p>
          <p className="dashboardLogout">
            <FaSignOutAlt size={18} color="#929EAE" />
            {"\u00A0"}logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
