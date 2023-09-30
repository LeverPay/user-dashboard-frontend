import React from "react";
import CardDefault from "../AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";
function CardEnterprise() {
  return (
    <CardDefault
      backgroundImage="./images/CardEnterprise.png"
      cardtype="USDT"
      cardname="Enterprise"
      lock="./images/lock.png"
      bg3="url('./images/Ellipse 7.png')"
      // name={CardInfo[3].name}
      // cardNumber={CardInfo[3].no}
      // cvv={CardInfo[3].cvv}
    />
  );
}

export default CardEnterprise;
