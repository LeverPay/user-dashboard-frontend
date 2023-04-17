import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Swal from "sweetalert2";
import "../AddAccountComponent/AddAccountComponent.css";

const AddAccountComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [cardValue, setCardValue] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleAddCard = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Leverpay.io",
      text: "Do you want to add card details?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Card added successfully", "", "success");
        setShowModal(false);
      } else if (result.isDenied) {
        Swal.fire("Card not added", "", "info");
        setShowModal(false);
      }
    });
  };
  //   const monthChange = () => {
  //     let i, j, res;

  //     for (i = 0; i <= 1; i++) {
  //       for (j = i + 1; j <= 2; j++) {
  //         if (i === 1 && j === 2) {
  //           return;
  //         }
  //       }
  //     }
  //     res = i + "" + j;

  //     return res;
  //   };
  const handleCardChange = (e) => {
    setCardValue(e.target.value.replace(/\D/g, ""));
  };

  const handleNameChange = (e) => {
    setNameOnCard(e.target.value);
  };
  const monthOptions = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
  ];
  const yearOptions = [
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
  ];
  return (
    <>
      <div className="add-account-btn-ctrl">
        <Button className="add-account-btn" onClick={() => setShowModal(true)}>
          Add your card
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
          <Modal.Title className="labels">
            Add a credit or debit card
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Body starts here */}
          <Form className="form-outer">
            <h4 className="header">Enter your card information</h4>

            <Form.Group className="mb-3 formGridCheckbox" id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Use name on account"
                className="labels"
              />
            </Form.Group>

            <Form.Label htmlFor="" className="labels">
              Name on card
            </Form.Label>
            <Form.Control
              type="text"
              id=""
              value={nameOnCard}
              className="name-on-card"
              required
              onChange={handleNameChange}
              //   aria-describedby="passwordHelpBlock"
            />

            <Form.Label htmlFor="" className="labels">
              Card number
            </Form.Label>
            <Form.Control
              type="tel"
              value={cardValue}
              placeholder="xxxx xxxx xxxx xxxx"
              pattern="[0-9]{4}[0-9]{4}[0-9]{4}"
              maxLength={16}
              className="card-no-field"
              required
              onChange={handleCardChange}
              //   aria-describedby="passwordHelpBlock"
            />

            <h4 className="header">Expiration date</h4>
            <div className="date-picker-control">
              <Select
                options={monthOptions}
                placeholder="01"
                className="month-select"
                readOnly
              />
              <Select
                options={yearOptions}
                placeholder="2020"
                className="year-select"
                readOnly
              />
            </div>
            <div>
              <Button
                variant="primary"
                type="submit"
                className="add-card-btn"
                onClick={handleAddCard}
              >
                Add Card
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
