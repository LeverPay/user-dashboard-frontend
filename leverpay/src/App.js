import "./App.css";
//------ Shedrach's import ends

import React from "react";
import { Routes, Route } from "react-router-dom";
import NavComponent from "./components/NavComponent";
import DashboardComponent from "./pages/DashboardComponent";
import NoMatch from "./pages/NoMatch";

//-------- Sarah's import starts here-------------
//import logo from './logo.svg';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";
//import "./App.css";

//-------- Sarah's import starts here-------------

function App() {
  return (
    //<div className="App">
    //</div>
    <>
      <NavComponent />
      <Routes>
        <Route path="/" element={<DashboardComponent />} />
        <Route path="transactions" element />
        <Route path="invoices" element />
        <Route path="my cards" element />
        <Route path="settings" element />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
    // function App() {
    //   return (
    //     <div className="">
    //       {/* <header className="App-header"> */}
    //       <Container>
    //         <Row>
    //           <Col></Col>
    //           <Col xs={6}>
    //             <h2> Welcome ! </h2>
    //           </Col>
    //           <Col></Col>
    //         </Row>
    //       </Container>
    //       {/* </header> */}
    //     </div>
  );
}

export default App;
