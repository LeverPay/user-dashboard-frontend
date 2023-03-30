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
      name={CardInfo[1].name}
      lock="./images/lock.png"
      bg2="url('./images/Ellipse 7.png')"
      cardNumber={CardInfo[1].no}
    />
    // </Container>
  );
}

export default CardDiamond;
