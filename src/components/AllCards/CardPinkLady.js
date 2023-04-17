import React from "react";
import CardDefault from "../../components/AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function CardpinkLady() {
  return (
    <CardDefault
      backgroundImage="./images/CardpinkLady.png"
      cardtype="USDT"
      cardname="Pink Lady"
      name={CardInfo[2].name}
      lock="./images/lock.png"
      bg2="url('./images/Ellipse 7.png')"
      cardNumber={CardInfo[2].no}
      cvv={CardInfo[2].cvv}
    />
  );
}

export default CardpinkLady;
