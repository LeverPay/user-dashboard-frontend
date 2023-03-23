//import logo from './logo.svg';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";
import FileUpload from "./components/FileUpload/FileUpload";

function App() {
  const lst = [
    { name: "Passport", type: "file", is_selected: false },
    { name: "Government Issued ID Card", type: "file", is_selected: false },
    { name: "International Passport", type: "file", is_selected: false },
  ];
  return (
    <div className="">
      {/* <header className="App-header"> */}
      <Container>
        {/* <Row>
            <Col>
              
            </Col>
            <Col xs={6}>
              <h2> Welcome ! </h2>
            </Col>
            <Col>
              
            </Col>
          </Row> */}

        {lst.map(function (index, data) {
          <FileUpload />;
        })}
      </Container>
      {/* </header> */}
    </div>
  );
}

export default App;
