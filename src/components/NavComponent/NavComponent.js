import LeverpayLogo from "../../assets/LeverpayLogo.png";
import Close from "../../assets/images/close-icon.png";
import Open from "../../assets/images/menu-icon2.png";

import { Link, NavLink } from "react-router-dom";
// import { Nav, Navbar, Container } from "react-bootstrap";
// import { FaHome, FaReceipt, FaWallet, FaSignOutAlt } from "react-icons/fa";
// import { RiSettings4Fill } from "react-icons/ri";
// import { BsGraphUpArrow } from "react-icons/bs";
//import { MdLiveHelp } from "react-icons/md";
import "../NavComponent/NavComponent.css";
import { useState, useEffect } from "react";
import { logoutUser } from "../../services/apiService";
import { useLocalState } from "../../utils/useLocalStorage";
//import Icofont from "react-icofont";

const NavComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  const [jwt, setJwt] = useLocalState("", "jwt");
  // ------------------------------ logout user api call ---------------------------------//
  const handleLogout = () => {
    logoutUser(jwt);
  };
  // ------------------------------------------------------------------------------------//
  const handleActive = (item) => {
    setActiveItem(item);
  };

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setSidebarOpen(!isMobile);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  function closeSidebar() {
    console.log("closing");
    setSidebarOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        openSidebar();
      }
    }

    // Add event listener to listen for window resize events
    window.addEventListener("resize", handleResize);

    // Call the function once to set the initial screen size
    handleResize();

    // Remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="menu-icon" onClick={handleClick} style={{ color: "red" }}>
        <i className={click ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
      </div>

      <div
        expand="md"
        bg="#0E093F"
        variant="dark"
        className="flex-column side-nav-container slide-right"
        id="mySidebar"
        style={{ display: sidebarOpen ? "block" : "none" }}
      >
        <div className="open-close-icons flexy" style={{ display: "flex" }}>
          <div className="col-10">&nbsp;</div>
          <span onClick={closeSidebar}>
            {/* <i class="icofont-close-circled"></i> */}
            <img
              src={Close}
              alt=""
              style={{ width: "40%" }}
              className="open-close-icons"
            />
          </span>
        </div>
        <div className="container">
          <div />
          <div>
            <div defaultactivekey="/" className="flex-column my-tweak">
              <center>
                <div className="navbar-logo col-md-9 col-9">
                  <img src={LeverpayLogo} alt="" className="logo" />
                </div>
              </center>
              <div className="nav-options">
                <ul className="list-unstyled">
                  <li>
                    <NavLink
                      to="/"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                    >
                      <i className="icofont-home"></i>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/transactions"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                    >
                      <i className="icofont-exchange"></i>
                      Transactions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/transfer"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                    >
                      <i className="icofont-exchange"></i>
                      Transfer
                    </NavLink>
                  </li>
                  <li
                    // eslint-disable-next-line no-undef
                    onClick={() => handleActive("invoices")}
                  >
                    <NavLink
                      to="/invoices"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                      id="unpaid"
                    >
                      <i className="icofont-notepad"></i>
                      Unpaid Subscriptions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my cards"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                    >
                      <i className="icofont-wallet"></i>
                      My Cards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-subscriptions"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                    >
                      <i className="icofont-wallet"></i>
                      Subscriptions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/funding/stablecoins-deposit"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                    >
                      <i className="icofont-wallet"></i>
                      Funding
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/settings"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                    >
                      <i className="icofont-ui-settings"></i>
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/payment-page"
                      className="text-link"
                      onClick={closeMobileMenu}
                      activeclassname="active"
                    >
                      <i className="icofont-ui-settings"></i>
                      Checkout
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="bottom-options">
                <ul className="list-unstyled">
                  <li onClick={closeMobileMenu}>
                    <Link to="/help" className="bottom-link">
                      <small>
                        <i className="icofont-question-square"></i>
                      </small>
                      help
                    </Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/help" className="bottom-link">
                      <small>
                        <i className="icofont-question-square"></i>
                      </small>
                      block my card
                    </Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link onClick={handleLogout} to="#" className="bottom-link">
                      <small>
                        <i className="icofont-sign-out"></i>
                      </small>
                      logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="open-close-icons flexy menu" style={{ display: "flex" }}>
        {/* <div className="col-11">&nbsp;</div>
        <span>
        </span> */}
        <span
          onClick={openSidebar}
          style={{ color: "#fff", fontSize: "20px" }}
          className="nav-sm"
        >
          {/* <i class="icofont-navigation-menu"></i> */}
          <img src={LeverpayLogo} alt="" className="TopNav-logo-sm" />
          <img
            src={Open}
            alt=""
            id="menu"
            style={{ width: "10%" }}
            className="open"
          />
        </span>
      </div>
    </>
  );
};

export default NavComponent;
