import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./CardCategories.css";
import CardDiamond from "../../../components/AllCards/CardDiamond";
import CardEnterprise from "../../../components/AllCards/CardEnterprise";
import CardGold from "../../../components/AllCards/CardGold";
import CardPinkLady from "../../../components/AllCards/CardPinkLady";
import { useState, useEffect } from "react";
import KYCFormModal from "../../../page/KYCForms/KYCFormModal/KYCFormModal";
function Cardcategory() {
  const [accSet, setAccSet] = useState("");
  const [accReady, setAccReady] = useState(false);
  const defunct = (accType) => {
    setAccSet(accType);
  };
  useEffect(() => {
    if (accSet !== "") setAccReady(true);
    else setAccReady(false);
  }, [accSet]);

  return (
    <Container className="px-5 py-5 col-md-8 col-sm-9" id="cardcategories">
      <Row>
        <Col>
          <Row className="py-3" onClick={() => defunct("gold")}>
            <CardGold />
          </Row>
          <Row>
            <p className="Kyc-upgrade-notice" id="Kyc-upgrade-notice-1">
              To upgrade to the <span className="gold">GOLD</span> Card, please
              complete the following verification<strong> (KYC)</strong> Process
              as it is required by Government. Click on the Card to start
              Verification. Note :{" "}
              <span className="limit">Daily Spending Limit is 1000 USDT</span>
            </p>
          </Row>
        </Col>

        <Col className="col-2 pt-5 d-md-block d-none">
          <img alt="" className="img-responsive" src="./images/Line 25.png" />
        </Col>

        <Col>
          <Row className="py-3" onClick={() => defunct("diamond")}>
            <CardDiamond />
          </Row>
          <Row>
            <p className="Kyc-upgrade-notice">
              To upgrade to the <span className="gold">GOLD</span> Card, please
              complete the following verification<strong> (KYC)</strong> Process
              as it is required by Government. Click on the Card to start
              Verification. Note :{" "}
              <span className="limit">Daily Spending Limit is 1000 USDT</span>
            </p>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <Row className="py-3" onClick={() => defunct("pinkLady")}>
            <CardPinkLady />
          </Row>
          <Row>
            <p className="Kyc-upgrade-notice" id="Kyc-upgrade-notice-1">
              To upgrade to the <span className="gold">GOLD</span> Card, please
              complete the following verification<strong> (KYC)</strong> Process
              as it is required by Government. Click on the Card to start
              Verification. Note :{" "}
              <span className="limit">Daily Spending Limit is 1000 USDT</span>
            </p>
          </Row>
        </Col>

        <Col className="col-2 pt-5 d-md-block d-none">
          <img alt="" className="img-responsive" src="./images/Line 25.png" />
        </Col>

        <Col>
          <Row className="py-3" onClick={() => defunct("enterprise")}>
            <CardEnterprise />
          </Row>
          {accReady ? <KYCFormModal acct={accSet} callback={defunct} /> : ""}
          <Row>
            <p className="Kyc-upgrade-notice">
              To upgrade to the <span className="gold">GOLD</span> Card, please
              complete the following verification<strong> (KYC)</strong> Process
              as it is required by Government. Click on the Card to start
              Verification. Note :{" "}
              <span className="limit">Daily Spending Limit is 1000 USDT</span>
            </p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Cardcategory;
