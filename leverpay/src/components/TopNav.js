import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import notificationIcon from "../assets/notificationIcon.png";
import searchIcon from "../assets/searchIcon.png";

const TopNav = () => {
  return (
    <div className="TopNav">
      <div className="pageTitle">
        <h4> Overview </h4>
      </div>
      <div>
        <img src={notificationIcon} alt="" className="notificationIcon" />
        <img src={searchIcon} alt="" className="searchIcon" />
      </div>
      <div className="dropdownDiv">
        <Dropdown>
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            className="navUser"
          >
            userName
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopNav;
