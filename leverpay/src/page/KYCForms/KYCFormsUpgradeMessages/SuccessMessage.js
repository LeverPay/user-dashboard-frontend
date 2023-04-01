import React, { useState, useEffect } from "react";
import SuccessImg from "../../../assets/images/successImg.png";
import UploadCheckmark from "../../../components/FileUpload/UploadCheckmark";
import { gold, diamond, pinkLady, enterprise } from "../../../TestData";

function SuccessMessage(props) {
  const [card, setCard] = useState("");
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
    <center>
      {" "}
      <div className="kyc-success-message-container col-md-7  slide-right">
        <div style={{ display: "flex" }} col-md-12>
          <div className="col-md-3">&nbsp;</div>
          <img src={SuccessImg} alt="smiley" className="col-md-9" />
          <div className="col-md-4 success-checkmark">
            {" "}
            <UploadCheckmark />
          </div>
        </div>
        <center>
          <h3>
            <span style={{ color: cardData.color || "#0B0230" }}>
              {" "}
              {cardData.card}
            </span>{" "}
            Card Upgraded <br />
            SUCCESSFULLY
          </h3>
        </center>
      </div>
    </center>
  );
}

export default SuccessMessage;
