import React from "react";
//import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import "../TopNav/TopNav.css";
import UserSelectComponent from "../UserSelectComponent/UserSelectComponent";
import LeverpayLogo from "../../assets/LeverpayLogo.png";
import { Link } from "react-router-dom";

const TopNav = ({ userName }) => {
  return (
    <>
      <div className="TopNav col-md-12">
        <div className="pageTitle">
          <h2> Overview </h2>
        </div>
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="top-nav-items"
        >
          <span className='search-con'>
          <SearchBar  />
          </span>
          <MdNotifications size={30} className="notificationIcon" />
        </div>
        <Link
          to="/profile"
          style={{ textDecoration: "none" }}
          className="user_select"
        >
          <UserSelectComponent
            userName={userName.firstName}
            passport={userName.passport}
          />
        </Link>
      </div>
      <div className="side-nav-logo col-6">
        <center>
          <img src={LeverpayLogo} alt="" className="TopNav-logo" />
          <div className="space-div">&nbsp;</div>
        </center>
      </div>
    </>
  );
};

export default TopNav;
