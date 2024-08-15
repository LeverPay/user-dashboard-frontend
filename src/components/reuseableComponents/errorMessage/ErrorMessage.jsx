import React from "react";
import { ImCancelCircle } from "react-icons/im";
import style from "./ErrorMessage.module.css";

export default function ErrorMessage({ errorMessage, onClose }) {
  return (
    <div className={style.overlay}>
      <div className={style.wrapper}>
        <div className={style.main}>
          <div className={style.text}>
            {/* This icon should close the error message when clicked */}
            <ImCancelCircle onClick={onClose} className={style.cancelIconHeader} />
            <h2>Insufficient Balance</h2>
            <p className={style.errorMessage}>{errorMessage}</p>
          </div>
          <div className={style.done}>
            <button onClick={onClose} className={style.doneButton}>
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
