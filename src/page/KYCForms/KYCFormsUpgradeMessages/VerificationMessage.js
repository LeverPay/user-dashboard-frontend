import React, { useState, useEffect } from "react";
import "./KYCUpgradeMessages.css";
import { ColorRing } from "react-loader-spinner";
import { gold, diamond, pinkLady, enterprise } from "../../../TestData";

export const VerificationMessage = (props) => {
  const [cardData, setCardData] = useState("");
  useEffect(() => {
    switch (props.accountType) {
      case "gold":
        setCardData(gold);
      default:
        break;
      case "diamond":
        setCardData(diamond);
        break;
      case "enterprise":
        setCardData(enterprise);
        break;
      case "pinkLady":
        setCardData(pinkLady);
        break;
    }
  });
  return (
    <div className="verification-loader-container col-md-10">
      <h5>
        Verifying and upgrading to{" "}
        <span
          className="kyc-account-type"
          style={{ color: cardData.color || "#0B0230" }}
        >
          {cardData.card}
        </span>{" "}
        account. <br />
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
