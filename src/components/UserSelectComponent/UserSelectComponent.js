import React from "react";
import UserData from "../../TestData/UserData";
import "./UserSelectComponent.css";
import avatar from "../../assets/images/avatar.png";
const name = UserData.name;
const profile_pic = UserData.profile_Img;

function UserSelectComponent({ userName, passport, card }) {
  // alert(passport);
  return (
    <div className="User_Info">
      <img
        alt=""
        src={passport ? passport : avatar}
        // {profile_pic}
      />
      <h3>{userName}</h3>
      <span style={{backgroundColor: card === 1 ? '#70ba01': card === 2 ? '#351c04': card === 3 ? '#00353e': card === 4 ? '#bc6c90': '#ca1015'}}></span>
    </div>
  );
}

export default UserSelectComponent;
