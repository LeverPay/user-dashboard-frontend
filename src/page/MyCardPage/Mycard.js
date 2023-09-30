import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./myCard.css";
import CardDefault from "../../components/AllCards/CardDefault";
import CardDiamond from "../../components/AllCards/CardDiamond";
import CardEnterprise from "../../components/AllCards/CardEnterprise";
import CardGold from "../../components/AllCards/CardGold";
import CardpinkLady from "../../components/AllCards/CardPinkLady";
import TotalMoney from "../../components/TotalMoney/TotalMoney";
import UpgradeCard from "../../components/UpgradeCard/UpgradeCard";
import { Link } from "react-router-dom";
import { useState } from "react";

function Mycard(props) {
  // console.log(props);
  const [modal, setModal] = useState(false);

  const userJson = localStorage.getItem('user')
  const userData = JSON.parse(userJson)
  console.log(userData)

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <Container className="px-4 py-5 text-center" id="mycards">
      <Row className="justify-content-center">
        <Col className="col-10 col-md-5">
          <Row>
            {
              userData.card.type === 1 && <CardDefault
                backgroundImage="./images/DefaultCardBackground.png"
                cardtype={<br />}
                cardname=" "
                lock=""
              />
            }
            {
              userData.card.type === 2 && <CardGold
                backgroundImage="./images/CardGold.png"
                cardtype="USDT"
                cardname="Gold"
                lock=""
                bg2="url('./images/Ellipse 7.png')"
              />
            }
            {
              userData.card.type === 3 && <CardDiamond
                backgroundImage="./images/diamond.png"
                cardtype="USDT"
                cardname="Diamond"
                lock=""
                bg2="url('./images/Ellipse 7.png')"
              />
            }
            {
              userData.card.type === 4 && <CardpinkLady
                backgroundImage="./images/CardpinkLady.png"
                cardtype="USDT"
                cardname="Pink Lady"
                lock=""
                bg2="url('./images/Ellipse 7.png')"
              />
            }
            {
              userData.card.type === 5 && <CardEnterprise
                backgroundImage="./images/CardEnterprise.png"
                cardtype="USDT"
                cardname="Enterprise"
                lock=""
                bg3="url('./images/Ellipse 7.png')"
              />
            }

          </Row>
          <Row>
            <div className="mycards-limit-info">
              <h1 >
                The Spending Limit on your card is : $5,000. Click Upgrade card to increase your spending Limit
              </h1>
            </div>
          </Row>
        </Col>
        {/* <Col className="col-md-1 d-none d-md-block"></Col>
        <Col className="col-10 col-md-5 pt-5 pt-md-0">
          <Row onClick={toggleModal}>{props.card}</Row>
        </Col> */}
      </Row>
      <Row className="spending  mt-5 justify-content-center">
        <Col className="bal col-md-4 col-12 pt-md-0 pt-5 pt-sm-0">
          <TotalMoney bg="#0E093F" totaltype="Balance" amt={userData ? userData.wallet.amount.ngn : ''}/>
        </Col>
        <Col className="bal col-md-4 col-12 pt-md-0 pt-5">
          <TotalMoney bg="#F6A61F" totaltype="Spending" amt={userData ? userData.total_spending.ngn : ''} />
        </Col>
        <Col className="bal col-md-4 col-12 pt-md-0 pt-5">
          <TotalMoney bg="#0E093F" totaltype="Saved" amt={userData ? userData.total_save.ngn : ''} />
        </Col>
      </Row>
      <Row className="Upgrade-con">
        <Link to="/cardCategories">
          {" "}
          <Col className="px-6">
            <UpgradeCard />
          </Col>
        </Link>
      </Row>
      {modal && (
        <div className="overlay">
          <div>
            <div className="card-modal">
              <ul>
                <li>Card Type: {props.modalcardtype}</li>
                <li>Card Owner: {props.modalcardname}</li>
                <li>Card Number: {props.modalcardno}</li>
                <li>CVV: {props.modalcardcvv}</li>
                <li>Expiry date: 03/2025</li>
              </ul>
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Mycard;
