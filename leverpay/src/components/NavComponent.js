import React from "react";
import LeverpayLogo from "../assets/LeverpayLogo.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaHome, FaReceipt, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";

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
                  <Nav.Link href="#home" className="dashboardActive">
                    <h3 className="dashboardOption">
                      <FaHome size={18} />
                      {"\u00A0"} Dashboard
                    </h3>
                  </Nav.Link>
                  <Nav.Link href="#about">
                    <h3 className="transactionOption">
                      <BsGraphUpArrow size={18} color="#929EAE" />
                      {"\u00A0"} Transactions
                    </h3>
                  </Nav.Link>
                  <Nav.Link href="#invoices">
                    <h3 className="invoicesOption">
                      <FaReceipt size={18} color="#929EAE" />
                      {"\u00A0"} Invoices
                    </h3>
                  </Nav.Link>
                  <Nav.Link href="#contact">
                    <h3 className="myCardOption">
                      <FaWallet size={18} color="#929EAE" />
                      {"\u00A0"} My Cards
                    </h3>
                  </Nav.Link>
                  <Nav.Link href="#settings">
                    <h3 className="settingsOption">
                      <RiSettings4Fill size={18} color="#929EAE" />
                      {"\u00A0"} Settings
                    </h3>
                  </Nav.Link>
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
