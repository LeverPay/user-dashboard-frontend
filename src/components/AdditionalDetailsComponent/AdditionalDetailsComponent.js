import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "../AdditionalDetailsComponent/AdditionalDetailsComponent.css";

const AddAccountComponent = () => {
  const handleAdditionalDetails = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Leverpay.io",
      text: "Do you want to add details?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Details added successfully", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Details not added", "", "info");
      }
    });
  };

  return (
    <>
      <div className="add-details-btn-ctrl">
        <Form className="form-outer">
          <h4>Add Bank Details</h4>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">Bank Name</Form.Label>
            <Form.Select
              aria-label="Default select example"
              className="select-bank"
            >
              <option value="1"></option>
              <option value="2"></option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">Account Number</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              className="text-area"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">Account Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              className="text-area"
              required
            />
          </Form.Group>
          <div>
            <Button
              variant="primary"
              type="submit"
              className="submit-details-btn"
              onClick={handleAdditionalDetails}
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddAccountComponent;
