import React, { useEffect, useState } from 'react';
import style from "./SuccessScreen.module.css";

function SuccessScreen({ image, text, height }) {


  return (
    <div className={style.centerContainer}>
      <div className={style.mainDiv} style={{ height: height }}>
        <div className={style.imageContainer}>
          <img src={image} alt="Success" />
        </div>
         <p>{text}</p>
      </div>
      <div>
      <button>Done</button>
      </div>
      
    </div>
  );
}

export default SuccessScreen;
