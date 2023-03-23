//import logo from './logo.svg';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";

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
    </div>
  );
}

export default App;
