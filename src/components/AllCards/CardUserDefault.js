import React from "react";
import CardDefault from "../../components/AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function CardUser() {
  const userJson = localStorage.getItem('user')
  const userData = JSON.parse(userJson)
  console.log(userData)
  return (
    <CardDefault
      backgroundImage="./images/DefaultCardBackground.png"
      // name={userData ? userData.first_name + " " + userData.last_name: ''}
      cardtype={<br />}
      cardname=" "
      lock=""
      // cardNumber={userData? userData.card.card_number : ''}
      // cvv={userData ? userData.card.cvv: 123}
      // exp = {userData ? userData.card.expiry : ''}
    />
  );
}

export default CardUser;
