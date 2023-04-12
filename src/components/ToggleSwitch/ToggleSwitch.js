import React from "react";
import cx from "classnames";
import "../ToggleSwitch/ToggleSwitch.css";

const ToggleSwitch = ({ rounded = false, isToggled, onToggle }) => {
  const sliderCx = cx("slider", { rounded: "rounded" });
  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={sliderCx} />
    </label>
  );
};

export default ToggleSwitch;
