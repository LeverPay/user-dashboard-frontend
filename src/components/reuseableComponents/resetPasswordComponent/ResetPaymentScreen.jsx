import React from "react";
import { Link } from "react-router-dom";
import style from "./ResetPaymentScreen.module.css";

export default function ResetPaymentScreen() {
  return (
    <div className={style.mainDiv}>
      <p>
        Don’t have a PIN yet? <Link to="/create-pin"><span>Create</span></Link>
      </p>
    </div>
  );
}
