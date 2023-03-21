//import logo from './logo.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavComponent from './components/shared-files/NavComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <Container>
          <Row>
            <Col>
              <NavComponent />
            </Col>
            <Col xs={6}>
              <h2> Welcome ! </h2>
            </Col>
            <Col>
              
            </Col>
          </Row>
        </Container>
      {/* </header> */}
    </div>
  );
}

export default App;
