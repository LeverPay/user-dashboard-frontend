import React from "react";
import LeverpayLogo from "../../assets/LeverpayLogo.png";
import { Nav, Navbar, Container } from "react-bootstrap";

const NavComponent = () => {
  return (
    <div className="navContainer">
      <div className="logoPosition">
        <img src={LeverpayLogo} alt="" />
      </div>
      <div className="navBox">
        <div>
          <Navbar
            expand="md"
            bg="#0E093F"
            variant="dark"
            //className="flex-column"
            style={{
              width: "200px",
              // border: "1px solid #000",
              justifyContent: "center",
            }}
          >
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav defaultActiveKey="#home" className="flex-column">
                  <Nav.Link
                    href="#home"
                    // style={{
                    //   display: "flex",
                    //   flexDirection: "row",
                    //   alignItems: "center",
                    //   color: "#1B212D",
                    //   background: "#FFF",
                    //   width: "180px",
                    //   borderRadius: "8px",
                    // }}
                    active
                  >
                    Dashboard
                  </Nav.Link>
                  <Nav.Link href="#about">Transactions</Nav.Link>
                  <Nav.Link href="#contact">My Cards</Nav.Link>
                  <Nav.Link href="#settings">Settings</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
