import React from "react";
import UserData from "../../TestData/UserData";
import "./UserSelectComponent.css";
import avatar from "../../assets/images/avatar.png";
const name = UserData.name;
const profile_pic = UserData.profile_Img;

function UserSelectComponent({ userName, passport }) {
  return (
    <div className="User_Info">
      <img
        alt=""
        src={passport ? passport : avatar}
        // {profile_pic}
      />
      <h3>{userName}</h3>
      <span></span>
    </div>
  );
}

export default UserSelectComponent;
