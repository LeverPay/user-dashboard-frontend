//import logo from './logo.svg';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";

import KYCFormModal from "./page/KYCForms/KYCFormModal/KYCFormModal";
import { useState, useEffect } from "react";

function App() {
  const [accSet, setAccSet] = useState("");
  const [accReady, setAccReady] = useState(false);
  const defunct = (accType) => {
    setAccSet(accType);
    // console.log("called defunct");
  };
  useEffect(() => {
    if (accSet !== "") setAccReady(true);
    else setAccReady(false);
  }, [accSet]);
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
      <Button variant="primary" onClick={() => defunct("gold")}>
        Gold Upgrade Form
      </Button>
      <br />
      <br />
      <Button variant="primary" onClick={() => defunct("diamond")}>
        Diamond Upgrade Form
      </Button>
      <Button variant="primary" onClick={() => defunct("pinkLady")}>
        Pink-Lady Upgrade Form
      </Button>{" "}
      <Button variant="primary" onClick={() => defunct("enterprise")}>
        Enterprise Upgrade Form
      </Button>
      {accReady ? <KYCFormModal acct={accSet} callback={defunct} /> : ""}
    </div>
  );
}

export default App;
