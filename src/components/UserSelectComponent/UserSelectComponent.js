import React, { useState } from "react";
// import Select from "react-select";
import UserData from "../../TestData/UserData";
import "./UserSelectComponent.css";
// import { redirect } from "react-router-dom";

// const options = [
//   { value: "Sarah", label: "Sarah" },
//   { value: "Shezzy", label: "Shezzy" },
//   { value: "Terna", label: "Terna" },
// ];
const name = UserData.name
const profile_pic = UserData.profile_Img




function UserSelectComponent(){
  // const [gotoProfile, setGotoProfile] = useState(false);

  // if (gotoProfile) {
  //   return redirect("/my cards");
  // }

  return (
    // <div>
    //   <Select
    //     options={options}
    //     placeholder="Sarah"
    //     onChange={() => setGotoProfile(true)}
    //   />
    // </div>
    <div className="User_Info">
      <img alt=""  src={profile_pic}/>
      <h3>
        {name}
      </h3>
      <span></span>
    </div>
  );
};

export default UserSelectComponent;
