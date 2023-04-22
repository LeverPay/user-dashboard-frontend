import React from "react";
import Mycard from "../MyCardPage/Mycard";
// import CardEnterprise from "../../components/AllCards/CardEnterprise";
import CardDefault from "../../components/AllCards/CardDefault";
import CardInfo from "../../TestData/CardInfo";

function MycardEnteprise() {
  return <Mycard card={ <CardDefault
    backgroundImage="./images/CardEnterprise.png"
    cardtype="USDT"
    cardname="Enterprise"
    name={CardInfo[2].name}
    // lock="./images/lock.png"
    bg2="url('./images/Ellipse 7.png')"
    cardNumber={CardInfo[2].no}
    cvv={CardInfo[2].cvv}
    copy = './images/copy.png'
  />}
  modalcardtype = {CardInfo[2].id}
  modalcardname = {CardInfo[2].name}
  modalcardno= {CardInfo[2].no}
  modalcardcvv = {CardInfo[2].cvv} />;
}

export default MycardEnteprise;
