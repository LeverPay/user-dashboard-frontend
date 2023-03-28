import React, { useState } from "react";
import "./KYCUpgradeMessages.css";
import { ThreeCircles } from "react-loader-spinner";
import { ColorRing } from "react-loader-spinner";

export const VerificationMessage = () => {
  return (
    <div className="verification-loader-container col-md-10">
      <h5>
        Verifying and upgrading to{" "}
        <span className="kyc-account-type">Gold</span> account. <br />
        <span className="kyc-wait-message"> Please wait !</span>
      </h5>

      <div style={{ marginTop: "10px" }}>
        {" "}
        <ColorRing
          visible={true}
          height="50"
          width="50"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#7ac142", "#7ac142", "#7ac142", "#7ac142", "#7ac142"]}
        />
      </div>
    </div>
  );
};
