import NavComponent from "./components/shared-files/NavComponent";
import React from "react";
import "./App.css";
import DashboardComponent from "./components/DashboardComponent";

function App() {
  return (
    <header className="App-header">
      {/* <NavComponent /> */}
      <DashboardComponent />
    </header>
  );
}

export default App;
