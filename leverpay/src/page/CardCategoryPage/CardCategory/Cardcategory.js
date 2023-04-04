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
import { useNavigate } from "react-router-dom";

import KYCFormModal from "../../../page/KYCForms/KYCFormModal/KYCFormModal";
import { ReturnMessage } from "../../../page/KYCForms/KYCFormsUpgradeMessages/ReturnMessage";
import SuccessMessage from "../../../page/KYCForms/KYCFormsUpgradeMessages/SuccessMessage";

function Cardcategory() {
  const [accSet, setAccSet] = useState("");
  const [accSetInstance, setAccSetInstance] = useState("");
  const [accReady, setAccReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const [returnMessage, setReturnMessage] = useState(false);
  const defunct = (accType) => {
    setAccSet(accType);
    if (accType !== "" && accType !== "done") setAccSetInstance(accType);
  };
  const navigate = useNavigate();

  const navigateTo = () => {
    const url = "/account";
    localStorage.setItem("accountType", accSetInstance);
    navigate(url);
  }; //eg.history.push('/login');

  useEffect(() => {
    if (accSet !== "") {
      if (accSet === "done") {
        setSuccess(true);
      } else {
        setAccReady(true);
      }
    } else setAccReady(false);
  }, [accSet]);

  useEffect(() => {
    if (success) {
      const SuccessTimeout = setTimeout(() => {
        setSuccess(false);
        setReturnMessage(true);
      }, 4000);
      return () => {
        // 👇️ clear timeout when the component unmounts
        return () => {
          clearTimeout(SuccessTimeout);
        };
      };
    }
  }, [success]);

  useEffect(() => {
    if (returnMessage) {
      const ReturnMessageTimeout = setTimeout(() => {
        setReturnMessage(false);
        defunct("");
        navigateTo();
      }, 4000);
      return () => {
        return () => clearTimeout(ReturnMessageTimeout);
      };
    }
  }, [returnMessage]);
  return (
    <Container
      className="px-5 py-md-5 py-0 col-md-8 col-sm-9"
      id="cardcategories"
    >
      {accReady ? <KYCFormModal acct={accSet} callback={defunct} /> : ""}

      <Row>
        <Col className="pt-5 pt-md-0 " onClick={() => defunct("gold")}>
          <Row className="col-12">
            <CardGold />
          </Row>
          <Row className="mt-3 col-12">
            <p className="Kyc-upgrade-notice" id="Kyc-upgrade-notice-1">
              To upgrade to the <span className="gold">GOLD</span> Card, please
              complete the following verification<strong> (KYC)</strong> Process
              as it is required by Government. Click on the Card to start
              Verification. Note :{" "}
              <span className="limit">Daily Spending Limit is 1000 USDT</span>
            </p>
          </Row>
        </Col>
        <Col className="col-md-2 col-1 pt-5 d-none d-md-block">
          <img alt="" className="img-responsive" src="./images/Line 25.png" />
        </Col>
        <Col onClick={() => defunct("diamond")}>
          <Row className="col-12">
            <CardDiamond />
          </Row>
          <Row className="mt-3 col-12">
            <p className="Kyc-upgrade-notice" id="Kyc-upgrade-notice-1">
              To upgrade to the <span className="gold">GOLD</span> Card, please
              complete the following verification<strong> (KYC)</strong> Process
              as it is required by Government. Click on the Card to start
              Verification. Note :{" "}
              <span className="limit">Daily Spending Limit is 1000 USDT</span>
            </p>
          </Row>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col onClick={() => defunct("pinkLady")}>
          <Row className="col-12">
            <CardPinkLady />
          </Row>
          <Row className="mt-3  col-12">
            <p className="Kyc-upgrade-notice" id="Kyc-upgrade-notice-1">
              To upgrade to the <span className="gold">GOLD</span> Card, please
              complete the following verification<strong> ( KYC )</strong>{" "}
              Process as it is required by Government. Click on the Card to
              start Verification. Note :{" "}
              <span className="limit">Daily Spending Limit is 1000 USDT</span>
            </p>
          </Row>
        </Col>
        <Col className="col-2 pt-5 d-none d-md-block">
          <img alt="" className="img-responsive" src="./images/Line 25.png" />
        </Col>
        <Col onClick={() => defunct("enterprise")}>
          <Row className="col-12">
            <CardEnterprise />
          </Row>
          <Row className="mt-3 col-12">
            <p className="Kyc-upgrade-notice" id="Kyc-upgrade-notice-1">
              To upgrade to the <span className="gold">GOLD</span> Card, please
              complete the following verification<strong> ( KYC )</strong>{" "}
              Process as it is required by Government. Click on the Card to
              start Verification. Note :{" "}
              <span className="limit">Daily Spending Limit is 1000 USDT</span>
            </p>
          </Row>
        </Col>
        {returnMessage && <ReturnMessage accountType={accSetInstance} />}
        {success && <SuccessMessage accountType={accSetInstance} />}
      </Row>
    </Container>
  );
}

export default Cardcategory;
