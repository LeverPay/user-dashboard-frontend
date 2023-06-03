import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BalanceReport from "./BalanceReport";
import SuccessMessage from "./SuccessMessage";

function TransactionReport({ submitButtonDisabled }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    generateRandomNumber();
    setShow(true);
  };
  const [isTrue, setIsTrue] = useState(null);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    if (randomNumber === 1) {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }
  };
  return (
    <>
      <div className="insufficient-balance-modal">
        {" "}
        <Button
          onClick={handleShow}
          className="authorize-btn "
          disabled={submitButtonDisabled}
        >
          AUTHORIZE
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          style={{ background: "#0b0230" }}
        >
          <Modal.Body>
            {isTrue ? <SuccessMessage /> : <BalanceReport />}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default TransactionReport;
