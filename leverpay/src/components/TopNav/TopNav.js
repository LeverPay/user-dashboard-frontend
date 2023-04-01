import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import "../TopNav/TopNav.css";
import UserSelectComponent from "../UserSelectComponent/UserSelectComponent";

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
        {/* <Dropdown>
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            className="navUser"
          >
            username
          </Dropdown.Toggle>

          <Dropdown.Menu></Dropdown.Menu>
        </Dropdown> */}
        <UserSelectComponent />
      </div>
    </>
  );
};

export default TopNav;
