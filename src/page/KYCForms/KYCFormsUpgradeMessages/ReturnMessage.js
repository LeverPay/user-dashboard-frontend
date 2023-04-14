import React, { useState, useEffect } from "react";
import "./KYCUpgradeMessages.css";
import Smiley from "../../../assets/images/smiley.png";
import CardGold from "../../../components/AllCards/CardGold";
import CardpinkLady from "../../../components/AllCards/CardPinkLady";
import CardDiamond from "../../../components/AllCards/CardDiamond";
import CardEnterprise from "../../../components/AllCards/CardEnterprise";
import { gold, diamond, pinkLady, enterprise } from "../../../TestData";

export const ReturnMessage = (props) => {
  const [card, setCard] = useState("");
  const [cardData, setCardData] = useState("");

  useEffect(() => {
    switch (props.accountType) {
      case "gold":
        setCard(CardGold);
        setCardData(gold);
      // eslint-disable-next-line no-fallthrough
      default:
        break;
      case "diamond":
        setCard(CardDiamond);
        setCardData(diamond);
        break;
      case "enterprise":
        setCard(CardEnterprise);
        setCardData(enterprise);
        break;
      case "pinkLady":
        setCard(CardpinkLady);
        setCardData(pinkLady);
        break;
    }
  });
  return (
    <>
      <div className="kyc-return-message-container  slide-left">
        <div className="col-md-5 p-container">
          <p>
            Hi! <br />
            <span>Goodness Micheal</span> You have Upgraded your card to a{" "}
            <br />{" "}
            <span style={{ color: cardData.color || "#0B0230" }}>
              {cardData.title}
            </span>
            <br />
            <span>
              You can Now ENJOY Daily spending Limit of {cardData.limit} USDT.
            </span>{" "}
            <br /> <br /> Thank you for Choosing LeverPay.
          </p>
        </div>
        <div className="col-md-7" style={{height: 'fit-content', color: 'white'}}>
          {card}
        </div>
      </div>
    </>
  );
};
