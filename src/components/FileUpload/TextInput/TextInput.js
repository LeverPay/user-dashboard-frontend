import React from "react";
import "./text-input.css";
export const TextInput = ({ data }) => {
  return (
    <form className="kyc-text-input">
      <input
        type="text"
        placeholder={data.placeholder}
        className="form-control"
      />
    </form>
  );
};

export default TextInput;
