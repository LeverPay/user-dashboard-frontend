import React from "react";
import { Routes, Route } from "react-router-dom";
import NavComponent from "./components/NavComponent";
import DashboardComponent from "./pages/DashboardComponent";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
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
  );
}

export default App;
