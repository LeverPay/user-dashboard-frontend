import React from "react";
import CardDefault from "../../components/AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function CardUser({ firstName, lastName }) {
  return (
    <CardDefault
      backgroundImage="./images/DefaultCardBackground.png"
      name={firstName + " " + lastName}
      cardtype={<br />}
      cardname=" "
      lock=""
      cardNumber={CardInfo[5].no}
      cvv={CardInfo[5].cvv}
    />
  );
}

export default CardUser;
