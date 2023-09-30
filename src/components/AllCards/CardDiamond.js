import React from "react";
import CardDefault from "./CardDefault";
import CardInfo from "../../TestData/CardInfo";
// import Container from 'react-bootstrap/esm/Container'

function CardDiamond() {
  return (
    // <Container className='border col-md-6 col-lg-4 col-xxl-3 col-sm-8 col-10'>
    <CardDefault
      backgroundImage="./images/diamond.png"
      cardtype="USDT"
      cardname="Diamond"
      lock="./images/lock.png"
      bg2="url('./images/Ellipse 7.png')"
      // name={CardInfo[1].name}
      // cardNumber={CardInfo[1].no}
      // cvv={CardInfo[1].cvv}
    />
    // </Container>
  );
}

export default CardDiamond;
