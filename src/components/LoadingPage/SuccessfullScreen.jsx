import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SuccessScreen.module.css';
import mark from '../../assets/Group.png';
import line from '../../assets/Line 7.png';

export default function SuccessfulScreen({ onClose }) {
  const navigate = useNavigate();

  const handleDoneClick = () => {
    navigate('/airtime');
  };

  return (
    <div className={style.overlay}>
      <div className={style.main}>
        <div className={style.innerDiv}>
          <img src={line} alt="line" />
          <div className={style.text}>
            <img src={mark} alt="mark" />
            <p>Completed</p>
          </div>
        </div>
        <div className={style.done}>
          <button onClick={handleDoneClick} className={style.doneButton}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
