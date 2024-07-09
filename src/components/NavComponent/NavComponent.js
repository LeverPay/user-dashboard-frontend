import LeverpayLogo from "../../assets/LeverpayLogo.png";
import Close from "../../assets/images/close-icon.png";
import Open from "../../assets/images/menu-icon2.png";
import { Link, NavLink } from "react-router-dom";
import "../NavComponent/NavComponent.css";
import { useState, useEffect } from "react";
import { logoutUser } from "../../services/apiService";
import { useLocalState } from "../../utils/useLocalStorage"; // Ensure this is correctly defined and imported

const NavComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logoutUser(jwt);
  };

  const handleActive = (item) => {
    setActiveItem(item);
  };

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setSidebarOpen(!isMobile);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        openSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
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
          <span onClick={closeSidebar} id="close-menu">
            <img src={Close} alt="Close menu" style={{ width: "40%" }} className="open-close-icons" />
          </span>
        </div>
        <div className="container">
          <center>
            <div className="navbar-logo col-md-9 col-9">
              <img src={LeverpayLogo} alt="Leverpay Logo" className="nav-logo" />
            </div>
          </center>
          <div className="nav-options">
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Dashboard" src="/images/Dashboard.png" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/transactions" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Transactions" src="/images/Transactions.png" />
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink to="/transfer" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Transfer" src="/images/transfer.png" />
                  Transfer
                </NavLink>
              </li>
              <li onClick={() => handleActive("invoices")}>
                <NavLink to="/invoices" className="text-link" onClick={closeMobileMenu} activeClassName="active" id="unpaid">
                  <img alt="Invoices" src="/images/Invoices.png" />
                  Invoices
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-cards" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="My Cards" src="/images/My Wallets.png" />
                  My Cards
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-subscriptions" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Subscriptions" src="/images/subscription.png" />
                  Subscriptions
                </NavLink>
              </li>
              <li>
                <NavLink to="/paybills" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Pay Bill" src="/images/My Wallets.png" />
                  Pay Bills
                </NavLink>
              </li>
              <li>
                <NavLink to="/funding/naira-deposit" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Funding" src="/images/fund.png" />
                  Funding
                </NavLink>
              </li>
              <li>
                <NavLink to="/investment" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Investment" src="/images/invest.png" />
                  Investment
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Settings" src="/images/Settings.png" />
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/payment-page" className="text-link" onClick={closeMobileMenu} activeClassName="active">
                  <img alt="Checkout" src="/images/checkout.png" />
                  Checkout
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="bottom-options">
            <ul className="list-unstyled">
              <li onClick={closeMobileMenu}>
                <NavLink to="/help" className="bottom-link" activeClassName="active">
                  <small>
                    <img alt="Help" src="/images/Help.png" />
                  </small>
                  Help
                </NavLink>
              </li>
              <li onClick={closeMobileMenu}>
                <Link onClick={handleLogout} to="/logout" className="bottom-link">
                  <small>
                    <img alt="Logout" src="/images/Logout.png" />
                  </small>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="open-close-icons flexy menu" style={{ display: "flex" }}>
        <span onClick={openSidebar} style={{ color: "#fff", fontSize: "20px" }} className="nav-sm">
          <img src={Open} alt="Open menu" id="menu" style={{ width: "20%" }} className="open" />
          <img src={LeverpayLogo} alt="Leverpay Logo" className="TopNav-logo-sm" />
        </span>
      </div>
    </>
  );
};

export default NavComponent;
