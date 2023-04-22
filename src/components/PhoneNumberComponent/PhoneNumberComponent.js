import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./PhoneNumberComponent.css";

const PhoneNumberComponent = () => {
  const [value, setValue] = useState();

  return (
    <div className="phone-input">
      <PhoneInput
        className="phone"
        // placeholder="Enter phone number"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default PhoneNumberComponent;
