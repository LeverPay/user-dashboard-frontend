import React from "react";
import LeverpayLogo from "../../assets/LeverpayLogo.png";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaHome, FaReceipt, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";
import "../NavComponent/NavComponent.css";

const NavComponent = () => {
  return (
    <>
      <Navbar expand="md" bg="#0E093F" variant="dark" className="flex-column">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav defaultActiveKey="/" className="flex-column my-tweak">
              <div className="top">
                <img src={LeverpayLogo} alt="" style={{ width: "100%" }} />
              </div>
              <div className="nav-options">
                <Link to="/" className="text-link">
                  <FaHome size={18} variant="dark" />
                  {"\u00A0"} Dashboard
                </Link>
                <Link to="/transactions" className="text-link">
                  <BsGraphUpArrow size={18} color="#929EAE" />
                  {"\u00A0"} Transactions
                </Link>

                <Link to="/invoices" className="text-link">
                  <FaReceipt size={18} color="#929EAE" />
                  {"\u00A0"} Invoices
                </Link>

                <Link to="/my cards" className="text-link">
                  <FaWallet size={18} color="#929EAE" />
                  {"\u00A0"} My Cards
                </Link>

                <Link to="/settings" className="text-link">
                  <RiSettings4Fill size={18} color="#929EAE" />
                  {"\u00A0"} Settings
                </Link>
              </div>
              {/* Bottom options */}
              <div className="bottom-options">
                <Link to="#" className="bottom-link">
                  <MdLiveHelp size={18} color="#929EAE" />
                  {"\u00A0"}help
                </Link>
                <Link to="#" className="bottom-link">
                  <FaSignOutAlt size={18} color="#929EAE" />
                  {"\u00A0"}logout
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavComponent;
