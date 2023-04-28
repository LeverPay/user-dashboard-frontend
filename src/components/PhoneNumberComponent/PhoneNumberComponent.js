import React, { useState } from "react";
import { CountryFlagData } from "../../TestData";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneNumberComponent.css";

const PhoneNumberComponent = () => {
  const [value, setValue] = useState("");

  // console.log(value.phone);

  return (
    <div className="phone-input">
      {value === "" ? (
        <PhoneInput
          country={"ng"}
          value={value.phone}
          onChange={(phone) => setValue({ phone })}
          inputStyle={{ width: "100%", fontFamily: "AgrandirBold" }}
          dropdownStyle={{ fontFamily: "AgrandirBold" }}
          placeholder=""
        />
      ) : (
        <PhoneInput
          country={CountryFlagData.map((c) => c.code)}
          value={value}
          onChange={(phone) => setValue({ phone })}
          inputStyle={{ width: "100%", fontFamily: "AgrandirBold" }}
          dropdownStyle={{ fontFamily: "AgrandirBold" }}
          placeholder=""
        />
      )}
    </div>
  );
};

export default PhoneNumberComponent;
