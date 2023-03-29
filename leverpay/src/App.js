//import logo from './logo.svg';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";

import KYCFormModal from "./page/KYCForms/KYCFormModal/KYCFormModal";
import { useState, useEffect } from "react";
import { Transactions } from "./page/Transactions/Transactions";

function App() {
  return (
    <div className="">
      {/* <header className="App-header"> */}
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <h2> Welcome ! </h2>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      {/* </header> */}
      <Transactions />
    </div>
  );
}

export default App;
