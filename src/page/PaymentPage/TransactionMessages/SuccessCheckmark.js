import React from "react";

function SuccessCheckmark({text}) {
  return (
    <center>
      {" "}
      <svg
        className="success-checkmarkk"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        {" "}
        <circle
          className="success-checkmarkk__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />{" "}
        <path
          className="success-checkmarkk__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      {
        text && <>
        <br/>
        <p style={{
          fontSize: '25px'
        }}>{text}</p>
        </> 
      }
      
    </center>
  );
}

export default SuccessCheckmark;
