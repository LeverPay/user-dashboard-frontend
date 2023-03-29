import React from "react";
import "../Styles/error-page.css";
import { TbError404 } from "react-icons/tb";
import { TfiFaceSad } from "react-icons/tfi";

const NoMatch = () => {
  return (
    <div className="error-404">
      <TfiFaceSad
        size={200}
        color="#fff"
        style={{ top: "5%", left: "35%", position: "absolute" }}
      />
      <TbError404
        size={100}
        color="#fff"
        style={{ top: "52.5%", left: "42.5%", position: "absolute" }}
      />
      <h5
        style={{
          position: "absolute",
          left: "38.5%",
          top: "72.5%",
          color: "#fff",
        }}
      >
        Page Not Found
      </h5>
    </div>
  );
};

export default NoMatch;
