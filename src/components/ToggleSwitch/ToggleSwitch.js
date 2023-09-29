import React from "react";
import Form from "react-bootstrap/Form";

const ToggleSwitch = ({ isToggled, onToggle }) => {
  return (
    <div>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={isToggled}
        onChange={onToggle}
        // label="Check this switch"
      />
    </div>
  );
};

export default ToggleSwitch;
