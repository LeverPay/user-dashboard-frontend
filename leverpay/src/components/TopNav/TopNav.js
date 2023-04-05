import React from "react";
//import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import "../TopNav/TopNav.css";
import UserSelectComponent from "../UserSelectComponent/UserSelectComponent";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar.png";

const TopNav = () => {
  return (
    <>
      <div className="TopNav  col-md-12">
        <div className="pageTitle">
          <h2> Overview </h2>
        </div>
        <div style={{ display: "flex" }}>
          <SearchBar />
          <MdNotifications size={30} className="notificationIcon" />
        </div>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <UserSelectComponent />
        </Link>
        {/* <img src={avatar} alt="" /> */}
      </div>
    </>
  );
};

export default TopNav;
