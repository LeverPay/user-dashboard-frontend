import React from "react";
import Form from "react-bootstrap/Form";

const ToggleSwitch = ({ isToggled, onToggle }) => {
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={isToggled}
        onChange={onToggle}
        // label="Check this switch"
      />
    </Form>
  );
};

export default ToggleSwitch;
