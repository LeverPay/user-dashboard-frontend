import React from "react";
import CardDefault from "../AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";
function CardEnterprise() {
  return (
    <CardDefault
      backgroundImage="./images/CardEnterprise.png"
      cardtype="USDT"
      cardname="Enterprise"
      name={CardInfo[2].name}
      lock="./images/lock.png"
      bg2="url('./images/Ellipse 7.png')"
      cardNumber={CardInfo[2].no}
      cvv={CardInfo[2].cvv}
    />
  );
}

export default CardEnterprise;
