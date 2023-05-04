import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function InsufficientBalance() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="insufficient-balance-modal">
        {" "}
        <Button onClick={handleShow} className="authorize-btn">
          AUTHORIZE
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div className="insufficient-balance">
              <p className="alert1">
                You Have Insufficient funds in your GOLD Account to complete
                this transaction.
              </p>

              <p className="alert2">
                You need additional<span> $20.00 USD</span> to Complete this
                transaction. Thank you.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default InsufficientBalance;
