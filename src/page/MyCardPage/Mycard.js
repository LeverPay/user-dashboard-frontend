import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./myCard.css";
import CardUser from "../../components/AllCards/CardUserDefault";
import CardDefault from "../../components/AllCards/CardDefault";
import TotalMoney from "../../components/TotalMoney/TotalMoney";
import UpgradeCard from "../../components/UpgradeCard/UpgradeCard";
import { Link } from "react-router-dom";
import CardInfo from "../../TestData/CardInfo";
import CardcategoryPage from "../CardCategoryPage/CardcategoryPage";
// import CardModal from "../../components/CardModal/CardModal";
import { useState } from "react";

function Mycard(props) {
  // console.log(props);
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <Container className="px-4 py-5 text-center" id="mycards">
      <Row className="justify-content-center">
        <Col className="col-10 col-md-5">
          <Row>
          <CardDefault
      backgroundImage="./images/DefaultCardBackground.png"
      name={'firstname' + " " + 'lastName'}
      cardtype={<br />}
      cardname=" "
      lock=""
      cardNumber={CardInfo[5].no}
      cvv={CardInfo[5].cvv}
    />
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
          <TotalMoney bg="#0E093F" totaltype="Balance" amt="3000" />
        </Col>
        <Col className="bal col-md-4 col-12 pt-md-0 pt-5">
          <TotalMoney bg="#F6A61F" totaltype="Spending" amt="2000" />
        </Col>
        <Col className="bal col-md-4 col-12 pt-md-0 pt-5">
          <TotalMoney bg="#0E093F" totaltype="Saved" amt="546" />
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
