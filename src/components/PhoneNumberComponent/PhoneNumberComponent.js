import React from "react";
import { CountryFlagData } from "../../TestData";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneNumberComponent.css";

const PhoneNumberComponent = ({
  phoneNumber,
  setPhoneNumber,
  name,
  disabled,
}) => {
  // console.log(value.phone);

  return (
    <div className="phone-input">
      {phoneNumber === "" ? (
        <PhoneInput
          country={"ng"}
          phoneNumberName={name}
          value={phoneNumber.phone}
          onChange={(phone) => setPhoneNumber({ phone })}
          inputStyle={{ width: "100%", fontFamily: "AgrandirBold" }}
          dropdownStyle={{ fontFamily: "AgrandirBold" }}
          disabled={disabled}
          placeholder=""
        />
      ) : (
        <PhoneInput
          country={CountryFlagData.map((c) => c.code)}
          value={phoneNumber}
          onChange={(phone) => setPhoneNumber({ phone })}
          inputStyle={{ width: "100%", fontFamily: "AgrandirBold" }}
          dropdownStyle={{ fontFamily: "AgrandirBold" }}
          disableCountryCode={true}
          disabled={disabled}
          placeholder=""
        />
      )}
    </div>
  );
};

export default PhoneNumberComponent;
