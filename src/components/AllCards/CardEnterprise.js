import React from "react";
import CardDefault from "../AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";
function CardEnterprise() {
  return (
    <CardDefault
      backgroundImage="./images/CardEnterprise.png"
      cardtype="USDT"
      cardname="Enterprise"
      name={CardInfo[3].name}
      lock="./images/lock.png"
      bg3="url('./images/Ellipse 7.png')"
      cardNumber={CardInfo[3].no}
      cvv={CardInfo[3].cvv}
    />
  );
}

export default CardEnterprise;
