import React from "react";
import CardDefault from "../../components/AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function CardUser() {
  return (
    <CardDefault
      backgroundImage="./images/DefaultCardBackground.png"
      name="Goodnews Micheal"
      cardtype={<br />}
      cardname="Diamond"
      lock=""
      cardNumber={CardInfo[5].no}
    />
  );
}

export default CardUser;
