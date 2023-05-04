/* eslint-disable react/jsx-no-undef */
import "./App.css";
//------ Shedrach's import ends

import React from "react";
// import { Routes, Route } from "react-router-dom";

//-------- Sarah's import starts here-------------
//import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
// import UserDashboardLayout from "./page/UserDashboardLayout";
import Feedback from "./page/Feedback/Feedback";


//import "./App.css";
//import "./App.css";

//-------- Sarah's import starts here-------------

function App() {
  return (
    <>
      {/* <UserDashboardLayout /> */}
      <Feedback/>
    </>
  );
}

export default App;
