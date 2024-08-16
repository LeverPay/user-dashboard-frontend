import React, { useState } from "react";
import "./ToggleSlider.css";

const ToggleSlider = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSlider = () => {
    setIsOn(!isOn);
    onToggle(!isOn);
  };

  return (
    <div className={`slider ${isOn ? "slider-on" : ""}`} onClick={toggleSlider}>
      <div className={`slider-circle ${isOn ? "slider-circle-on" : ""}`}></div>
    </div>
  );
};

export default ToggleSlider;
