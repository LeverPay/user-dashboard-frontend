import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import "../../page/SettingsPage/Settings.css";
import Swal from "sweetalert2";
import { AiOutlineEye } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
const Settings = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [settingsPasswordType, setSettingsPasswordType] = useState("password");
  const [settingsPassword, setSettingsPassword] = useState("");
  const [confirmSettingsPassword, setConfirmSettingsPassword] = useState("");

  const valSettingsPassword = () =>
    settingsPassword === confirmSettingsPassword;
  //alert(isToggled);

  const handleIcon = (reveal) => {
    reveal =
      settingsPasswordType === "password"
        ? setSettingsPasswordType("text")
        : setSettingsPasswordType("password");

    return reveal;
  };
  const saveChanges = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Leverpay.io",
      text: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        toast.success("Saved successfully");
      } else if (result.isDenied) {
        toast.error("Changes were not saved");
      }
    });
  };

  return (
    <div className="outer-div">
      <Form className="myForm">
        <h4 className="heading"> Two Factor Authentication</h4>
        <small className="notice">
          We'll ask you for a code to confirm its you logging into your account
        </small>
        <div className="col-md-12 toggle-content">
          <div className="col-md-10">
            <p className="text-muted">Via SMS or Email.</p>
            <p className="text-muted">
              A code will be sent to you via email or sms
            </p>
          </div>
          <div className="col-md-2 switchbtn">
            <ToggleSwitch
              isToggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
          </div>
        </div>
        <div className="form-fields-div">
          <Form.Group className="mb-3 change-password">
            <Form.Label className="form-label labels">
              Current Password
            </Form.Label>
            <Form.Control
              type={settingsPasswordType}
              placeholder="Enter current password"
              className="text-area "
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 new-password">
            <Form.Label className="form-label labels"> New Password</Form.Label>
            <Form.Control
              type={settingsPasswordType}
              placeholder="Ensure password contains atleast 10 characters"
              className="text-area "
              value={settingsPassword}
              onChange={(e) => setSettingsPassword(e.target.value)}
            />
            <AiOutlineEye
              size={20}
              onClick={handleIcon}
              className="set-eye-icon"
            />
          </Form.Group>
          <Form.Group className="mb-3 confirm-password">
            <Form.Label className="form-label labels">
              Confirm Password
            </Form.Label>
            <Form.Control
              type={settingsPasswordType}
              name="password"
              placeholder=""
              className="text-area"
              value={confirmSettingsPassword}
              onChange={(e) => setConfirmSettingsPassword(e.target.value)}
            />
            <AiOutlineEye
              size={20}
              onClick={handleIcon}
              className="set-eye-icon"
            />
            {!valSettingsPassword() && (
              <p className="error">Passwords do no match</p>
            )}
          </Form.Group>
        </div>
        <br />
        <div className="buttons-div">
          <Button
            variant="primary"
            type="submit"
            className="save-changes"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
        <ToastContainer />
      </Form>
    </div>
    // rounded={true}
  );
};

export default Settings;
