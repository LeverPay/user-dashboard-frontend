import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../ProfilePage/ProfilePage.css";
import Swal from "sweetalert2";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import AddAccountComponent from "../../components/AddAccountComponent/AddAccountComponent";

const ProfilePage = () => {
  const [phone, setPhone] = useState("");

  const handlePhone = (e) => {
    setPhone(e.target.value.replace(/\D/g, ""));
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
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
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
    <div col-md-12 className="outer">
      <Form col-md-8 className="inner-form">
        <h4>
          <b>Basic Information</b>
        </h4>
        <ImageComponent />
        {/* Form fields here */}
        <div className="fields-control">
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">First Name</Form.Label>
            <Form.Control type="text" placeholder="" className="text-area" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">Last Name</Form.Label>
            <Form.Control type="text" placeholder="" className="text-area" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">Business Name</Form.Label>
            <Form.Control type="text" placeholder="" className="text-area" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="labels">Country</Form.Label>
            <Form.Select className="text-area" enabled>
              <option>Nigeria</option>
            </Form.Select>
          </Form.Group>
          <div className="col-md-12 phone-number-div">
            <div className="col-md-3 country-code-ctrl">
              <Form.Group className="mb-3">
                <Form.Label className="phone-number-label">Code</Form.Label>
                <Form.Select className="country-code">
                  <option>+234</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-9 phone-no-ctrl">
              <Form.Group className="mb-3">
                <Form.Label className="labels">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={phone}
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  className="phone-number"
                  onChange={handlePhone}
                />
              </Form.Group>
            </div>
          </div>
          {/* add account btn */}
          <AddAccountComponent />
          {/* end add account btn */}
          <div className="button-control">
            <Button variant="#fff" type="submit" onClick={discardChanges}>
              Discard
            </Button>
            <Button variant="dark" type="submit" onClick={saveChanges}>
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
