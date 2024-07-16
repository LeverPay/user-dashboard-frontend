import React, { useEffect, useState } from 'react';
import style from "./ScreenSuccessLoader.module.css";

function ScreenSuccessLoader({ image, height }) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 10000); // Animation duration in milliseconds (3 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.centerContainer}>
      <div className={`${style.mainDiv} ${animationComplete ? style.stopAnimation : ''}`} style={{ height: height }}>
        <div className={style.imageContainer}>
          <img src={image} alt="Success" />
        </div>
      </div>
    </div>
  );
}

export default ScreenSuccessLoader;
