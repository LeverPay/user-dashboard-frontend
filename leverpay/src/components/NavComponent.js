import React from "react";
import LeverpayLogo from "../assets/LeverpayLogo.png";
import { Nav, Navbar, Container } from "react-bootstrap";

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
                    <h3 className="dashboardOption">Dashboard</h3>
                  </Nav.Link>
                  <Nav.Link href="#about">
                    <h3 className="transactionOption">Transactions</h3>
                  </Nav.Link>
                  <Nav.Link href="#invoices">
                    <h3 className="invoicesOption">Invoices</h3>
                  </Nav.Link>
                  <Nav.Link href="#contact">
                    <h3 className="myCardOption">My Cards</h3>
                  </Nav.Link>
                  <Nav.Link href="#settings">
                    <h3 className="settingsOption">Settings</h3>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="navBottom">
          <p className="dashboardHelp">help</p>
          <p className="dashboardLogout">logout</p>
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
