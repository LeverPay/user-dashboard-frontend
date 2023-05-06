import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BalanceReport from "./BalanceReport";
import SuccessMessage from "./SuccessMessage";

function TransactionReport() {
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
            {/* <BalanceReport /> */}
            <SuccessMessage />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default TransactionReport;
