import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import "../TopNav/TopNav.css";
import UserSelectComponent from "../UserSelectComponent/UserSelectComponent";
import LeverpayLogo from "../../assets/LeverpayLogo.png";

const TopNav = () => {
  return (
    <>
      <div className="TopNav  col-md-12">
        <div className="pageTitle">
          <h2> Overview </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SearchBar />
          <MdNotifications size={30} className="notificationIcon" />
        </div>

        <UserSelectComponent />
      </div>
      <div className="side-nav-logo  col-6">
        <center>
          {" "}
          <img src={LeverpayLogo} alt="" style={{ width: "100%" }} />
          <div className="space-div">&nbsp;</div>
        </center>
      </div>
    </>
  );
};

export default TopNav;
