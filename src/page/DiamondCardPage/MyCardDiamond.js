import React from "react";
import Mycard from "../MyCardPage/Mycard";
// import CardDiamond from "../../components/AllCards/CardDiamond";
import CardDefault from "../../components/AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function MyCardDiamond() {
  return <Mycard card={ <CardDefault
    backgroundImage="./images/diamond.png"
    cardtype="USDT"
    cardname="Diamond"
    name={CardInfo[1].name}
    // lock="./images/lock.png"
    bg2="url('./images/Ellipse 7.png')"
    cardNumber={CardInfo[1].no}
    cvv={CardInfo[1].cvv}
    copy = './images/copy.png'
  />}
  modalcardtype = {CardInfo[1].id}
  modalcardname = {CardInfo[1].name}
  modalcardno= {CardInfo[1].no}
  modalcardcvv = {CardInfo[1].cvv}
   />;
}

export default MyCardDiamond;
