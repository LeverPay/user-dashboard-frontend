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
    name={CardInfo[3].name}
    // lock="./images/lock.png"
    bg2="url('./images/Ellipse 7.png')"
    cardNumber={CardInfo[3].no}
    cvv={CardInfo[3].cvv}
    copy = './images/copy.png'
  />}
  modalcardtype = {CardInfo[3].id}
  modalcardname = {CardInfo[3].name}
  modalcardno= {CardInfo[3].no}
  modalcardcvv = {CardInfo[3].cvv} />;
}

export default MycardEnteprise;
