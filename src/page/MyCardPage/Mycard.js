import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./myCard.css";
import CardUser from "../../components/AllCards/CardUserDefault";
import TotalMoney from "../../components/TotalMoney/TotalMoney";
import UpgradeCard from "../../components/UpgradeCard/UpgradeCard";
import { Link } from "react-router-dom"
import CardcategoryPage from "../CardCategoryPage/CardcategoryPage";
// import CardModal from "../../components/CardModal/CardModal";
import { useState } from "react";


function Mycard(props) {

  const [modal, setModal] = useState(false)

  function toggleModal() {
    setModal(!modal)
  }

  return (
    <Container className="px-4 py-5 text-center" id="mycards" style={{ marginTop: '8rem' }}>
      <Row className="justify-content-center">
        <Col className="col-10 col-md-5">
          <Row>
            <CardUser />
          </Row>
        </Col>
        <Col className="col-md-1 d-none d-md-block"></Col>
        <Col className="col-10 col-md-5 pt-5 pt-md-0">
          <Row onClick={toggleModal}>{props.card}</Row>
        </Col>
      </Row>
      <Row className="mt-5 justify-content-center">
        <Col className="col-md-4 col-12 pt-md-0 pt-5">
          <TotalMoney bg="#0E093F" totaltype="Balance" amt="$3000" />
        </Col>
        <Col className="col-md-4 col-12 pt-md-0 pt-5">
          <TotalMoney bg="#F6A61F" totaltype="Spending" amt="$2000" />
        </Col>
        <Col className="col-md-4 col-12 pt-md-0 pt-5">
          <TotalMoney bg="#0E093F" totaltype="Saved" amt="$546" />
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
      {modal && <div className='overlay'>
        <div>
          <div className="card-modal">
            <ul>
              <li>Card Type: {props.modalcardtype}</li>
              <li>Card Owner: {props.modalcardname}</li>
              <li>Card Number: {props.modalcardno}</li>
              <li>CVV: {props.modalcardcvv}</li>
              <li>Expiry date: 03/2025</li>
            </ul>
            <button>
              Close
            </button>
          </div>
        </div>
      </div>}
    </Container>
  );
}

export default Mycard;
