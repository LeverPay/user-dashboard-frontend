import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '@fortawesome/fontawesome-free/css/all.min.css';

// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
// import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-country-dropdown/dist/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
