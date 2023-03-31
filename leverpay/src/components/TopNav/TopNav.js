import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import "../TopNav/TopNav.css";

const TopNav = () => {
  return (
    <>
      <div className="TopNav  col-md-12">
        <div className="pageTitle">
          <h4> Overview </h4>
        </div>
        <div style={{ display: "flex" }}>
          <BsSearch size={18} className="searchIcon" />
          <MdNotifications size={20} className="notificationIcon" />
        </div>
        <Dropdown>
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            className="navUser"
          >
            username
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default TopNav;
