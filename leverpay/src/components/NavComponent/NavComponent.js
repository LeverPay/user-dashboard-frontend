import LeverpayLogo from "../../assets/LeverpayLogo.png";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaHome, FaReceipt, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";
import "../NavComponent/NavComponent.css";
import { useState, useEffect } from "react";
import Icofont from "react-icofont";

const NavComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setSidebarOpen(!isMobile);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  function closeSidebar() {
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
        className="flex-column side-nav-container  slide-right"
        id="mySidebar"
        style={{ display: sidebarOpen ? "block" : "none" }}
      >
        <div className="open-close-icons flexy" style={{ display: "flex" }}>
          <div className="col-10">&nbsp;</div>
          <span onClick={closeSidebar}>
            <i class="icofont-close-circled"></i>
          </span>
        </div>
        <div className="container">
          <div />
          <div>
            <div defaultActiveKey="/" className="flex-column my-tweak">
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
                    <Link
                      to="/"
                      className="text-link"
                      onClick={closeMobileMenu}
                    >
                      <FaHome size={18} variant="dark" />
                      <span> {"\u00A0"}</span> Dashboard
                    </Link>
                  </li>
                  <li>
                    <NavLink
                      to="/transactions"
                      className="text-link"
                      onClick={closeMobileMenu}
                    >
                      <BsGraphUpArrow size={18} color="#929EAE" />
                      <span> {"\u00A0"}</span> Transactions
                    </NavLink>
                  </li>
                  <li onClick={closeMobileMenu}>
                    {" "}
                    <Link to="/invoices" className="text-link">
                      <FaReceipt size={18} color="#929EAE" />
                      <span> {"\u00A0"}</span> Invoices
                    </Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    {" "}
                    <Link to="/my cards" className="text-link">
                      <FaWallet size={18} color="#929EAE" />
                      <span> {"\u00A0"}</span> My Cards
                    </Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/settings" className="text-link">
                      <RiSettings4Fill size={18} color="#929EAE" />
                      <span> {"\u00A0"}</span> Settings
                    </Link>
                  </li>{" "}
                </ul>
              </div>
              <div className="bottom-options">
                {" "}
                <ul className="list-unstyled">
                  <li onClick={closeMobileMenu}>
                    {" "}
                    <Link to="#" className="bottom-link">
                      <MdLiveHelp size={18} color="#929EAE" />
                      <span> {"\u00A0"}</span>help
                    </Link>{" "}
                  </li>
                  <li onClick={closeMobileMenu}>
                    {" "}
                    <Link to="#" className="bottom-link">
                      <FaSignOutAlt size={18} color="#929EAE" />
                      <span> {"\u00A0"}</span> logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="open-close-icons flexy menu" style={{ display: "flex" }}>
        <div className="col-11">&nbsp;</div>
        <span onClick={openSidebar} style={{ color: "#fff", fontSize: "20px" }}>
          <i class="icofont-navigation-menu"></i>
        </span>
      </div>
    </>
  );
};

export default NavComponent;
