import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "../AdditionalDetailsComponent/AdditionalDetailsComponent.css";

const AddAccountComponent = () => {
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(false);
      } else if (result.isDenied) {
        Swal.fire("Details not added", "", "info");
        setShowModal(false);
      }
    });
  };

  return (
    <>
      <div className="add-details-btn-ctrl">
        <Button className="add-details-btn" onClick={() => setShowModal(true)}>
          Additional Details
        </Button>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        className="modal-control"
      >
        <Modal.Header closeButton>
          <Modal.Title className="labels">Additional Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Body starts here */}
          <Form className="form-outer">
            <Form.Group className="mb-3" controlId="">
              <Form.Label className="labels">Add Another Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                className="text-area"
                required
              />
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
            <Form.Group className="mb-3" controlId="">
              <Form.Label className="labels">Bank Name</Form.Label>
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
                Add Details
              </Button>
            </div>
          </Form>
          {/* Body ends here  */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAccountComponent;
