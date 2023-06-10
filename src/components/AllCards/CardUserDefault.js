import React from "react";
import CardDefault from "../../components/AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function CardUser({ userName }) {
  return (
    <CardDefault
      backgroundImage="./images/DefaultCardBackground.png"
      name={userName.firstName + " " + userName.lastName}
      cardtype={<br />}
      cardname=" "
      lock=""
      cardNumber={CardInfo[5].no}
      cvv={CardInfo[5].cvv}
    />
  );
}

export default CardUser;
