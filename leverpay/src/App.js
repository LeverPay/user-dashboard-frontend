/* eslint-disable react/jsx-no-undef */
import "./App.css";
//------ Shedrach's import ends

import React from "react";
import { Routes, Route } from "react-router-dom";
import NavComponent from "./components/NavComponent";
import DashboardComponent from "./Pages/DashboardComponent";
import CardcategoryPage from "./Pages/CardcategoryPage";
import NoMatch from "./Pages/NoMatch";

//-------- Sarah's import starts here-------------
//import logo from './logo.svg';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDashboardLayout from "./page/UserDashboardLayout";
//import "./App.css";
//import "./App.css";

//-------- Sarah's import starts here-------------

function App() {
  return (
    <>
      <UserDashboardLayout />
    </>
  );
}

export default App;
