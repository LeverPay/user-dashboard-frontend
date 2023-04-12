import React, { useState } from "react";
import Select from "react-select";
import "./UserSelectComponent.css";
// import { redirect } from "react-router-dom";

const options = [
  { value: "Sarah", label: "Sarah" },
  { value: "Shezzy", label: "Shezzy" },
  { value: "Terna", label: "Terna" },
];

export const UserSelectComponent = () => {
  // const [gotoProfile, setGotoProfile] = useState(false);

  // if (gotoProfile) {
  //   return redirect("/my cards");
  // }

  return (
    <div>
      <Select
        options={options}
        placeholder="Sarah"
        // onChange={() => setGotoProfile(true)}
      />
    </div>
  );
};

export default UserSelectComponent;
