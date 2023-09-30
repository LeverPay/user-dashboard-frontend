import React from "react";
import CardDefault from "../AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function CardGold() {
  return (
    <CardDefault
      backgroundImage="./images/CardGold.png"
      cardtype="USDT"
      cardname="Gold"
      lock="./images/lock.png"
      bg2="url('./images/Ellipse 7.png')"
      // name={CardInfo[0].name}
      // cardNumber={CardInfo[0].no}
      // cvv={CardInfo[0].cvv}
    />
  ); 
}

export default CardGold;
