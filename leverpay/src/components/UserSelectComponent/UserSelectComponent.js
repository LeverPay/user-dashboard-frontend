import React from "react";
import Select from "react-select";
import "./UserSelectComponent.css";
const options = [
  { value: "Sarah", label: "Sarah" },
  { value: "Shezzy", label: "Shezzy" },
  { value: "Terna", label: "Terna" },
];
export const UserSelectComponent = () => {
  return (
    <div>
      {" "}
      <Select options={options} placeholder="Sarah" />
    </div>
  );
};

export default UserSelectComponent;
