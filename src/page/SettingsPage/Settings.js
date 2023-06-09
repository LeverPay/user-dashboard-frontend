import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import "../../page/SettingsPage/Settings.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { forgotPassword } from "../../services/forgotPassword";
const Settings = () => {
  const [isToggled, setIsToggled] = useState(false);
  //alert(isToggled);
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

  const discardChanges = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Leverpay.io",
      text: "Do you want to discard changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Discard",
      denyButtonText: `Don't discard`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Discarded!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes aborted", "", "info");
      }
    });
  };
  return (
    <div className="outer-div">
      <Form className="myForm">
        <h4 className="labels"> Two Factor Authentication</h4>
        <small className="notice">
          We'll ask you for a code to confirm its you logging into your account
        </small>
        <div className="col-md-12 toggle-content">
          <div className="col-md-10">
            {/* <span className="sms"> */}
            <p className="text-muted">Via SMS or Email.</p>
            {/* </span> */}
            {/* <small> */}
            <p className="text-muted">
              A code will be sent to you via email or sms
            </p>
            {/* </small> */}
          </div>
          <div className="col-md-2 switchbtn">
            <ToggleSwitch
              isToggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
          </div>
        </div>
        <div className="form-fields-div">
          <Form.Group className="mb-3 change-password" controlId="">
            <Form.Label className="form-label">Change Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              className="text-area "
            />
            <Form.Text className="text-muted">
              We'll never share your data with anyone.
            </Form.Text>{" "}
            <br />
          </Form.Group>
          <Form.Group className="mb-3 new-password" controlId="">
            <Form.Label className="form-label"> New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              className="text-area "
            />
          </Form.Group>
          <Form.Group className="mb-3 confirm-password" controlId="">
            <Form.Label className="form-label">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              className="text-area"
            />
          </Form.Group>
          <span>
            <p onClick={forgotPassword} className="forgot-password">
              Forgot Password
            </p>
          </span>
        </div>
        <div className="buttons-div">
          <Button
            variant="#fff"
            type="submit"
            className="form-button discard-changes"
            onClick={discardChanges}
          >
            Discard Changes
          </Button>
          <Button
            variant="dark"
            type="submit"
            className="form-button save-changes"
            onClick={saveChanges}
          >
            {" "}
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
