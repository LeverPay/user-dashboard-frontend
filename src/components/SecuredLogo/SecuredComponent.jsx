import React from 'react';
import style from "./SecuredComponent.module.css"; // Ensure .module.css suffix
import padlock from "../../assets/ph_lock-simple-fill.png";

export default function SecuredComponent() {
  return (
    <div className={style.mainDiv}>
      <div className={style.securedContainer}>
        <img src={padlock} alt="padlock icon" />
        <p>Secured by <span>LeverPay Technology</span></p>
      </div>
    </div>
  );
}
