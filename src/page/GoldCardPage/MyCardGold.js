import React from "react";
import Mycard from "../MyCardPage/Mycard";
// import CardGold from "../../components/AllCards/CardGold";
import CardDefault from "../../components/AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function MyCardGold() {
  return <Mycard card={<CardDefault
    backgroundImage="./images/CardGold.png"
    cardtype="USDT"
    cardname="Gold"
    name={CardInfo[0].name}
    // lock="./images/lock.png"
    bg2="url('./images/Ellipse 7.png')"
    cardNumber={CardInfo[0].no}
    cvv={CardInfo[0].cvv}
    copy = './images/copy.png'
  />}
  modalcardtype = {CardInfo[0].id}
  modalcardname = {CardInfo[0].name}
  modalcardno= {CardInfo[0].no}
  modalcardcvv = {CardInfo[0].cvv} />;
}

export default MyCardGold;
