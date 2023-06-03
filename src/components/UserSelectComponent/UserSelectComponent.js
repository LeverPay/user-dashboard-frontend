import React from "react";
import UserData from "../../TestData/UserData";
import "./UserSelectComponent.css";
const name = UserData.name;
const profile_pic = UserData.profile_Img;

function UserSelectComponent({ userName }) {
  return (
    <div className="User_Info">
      <img alt="" src={profile_pic} />
      <h3>{userName}</h3>
      <span></span>
    </div>
  );
}

export default UserSelectComponent;
