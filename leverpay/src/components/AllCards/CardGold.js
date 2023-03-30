import React from "react";
import CardDefault from "../components/CardDefault";
import CardInfo from "../CardInfo";

function CardGold() {
  return (
    <CardDefault
      backgroundImage="./images/CardGold.png"
      cardtype="USDT"
      cardname="Gold"
      name={CardInfo[0].name}
      lock="./images/lock.png"
      bg2="url('./images/Ellipse 7.png')"
      cardNumber={CardInfo[1].no}
    />
  );
}

export default CardGold;
