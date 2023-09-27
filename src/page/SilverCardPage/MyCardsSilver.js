import React from "react";
import Mycard from "../MyCardPage/Mycard";
import CardSilver from "../../components/AllCards/CardSilver";
import CardInfo from "../../TestData/CardInfo";

function MyCardsSilver({ firstName, lastName }) {
  return (
    <Mycard
      firstName={firstName}
      lastName={lastName}
      card={<CardSilver firstName={firstName} lastName={lastName} />}
      modalcardtype={CardInfo[4].id}
      modalcardname={CardInfo[4].name}
      modalcardno={CardInfo[4].no}
      modalcardcvv={CardInfo[4].cvv} 
    />
  );
}

export default MyCardsSilver;
