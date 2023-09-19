import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./SubscriptionConfirmModal.css";
import { useNavigate } from "react-router-dom";

const SubscriptionConfirmModal = ({
  payNow,
  subscriptionConfirm,
  setSubscriptionConfirm,
}) => {
  let navigate = useNavigate();
  const handlePay = () => {
    navigate("/my-subscriptions/subscription-transactions", {
      state: { payNow },
    });
  };
  return (
    <div>
      <Modal
        // size="sm"
        show={subscriptionConfirm}
        onHide={() => setSubscriptionConfirm(false)}
        // aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="confirm-payment">Confirm Payment</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Initializing payment...</h5>
          <p>
            Vendor: <strong>{payNow.vendor}</strong>
          </p>
          <p>
            Subscription: <strong>{payNow.subscriptionType}</strong>
          </p>
          <p>
            Amount: <strong>{payNow.amount}</strong>
          </p>
          <p>
            Discount: <strong>{payNow.discount}%</strong>
          </p>
          <p>
            VAT: <strong>{payNow.vat}%</strong>
          </p>
          <p>
            Transaction fee: <strong>{payNow.transactionFee}</strong>
          </p>
          <p className="p-total">
            Total: <strong>{payNow.total}</strong>
          </p>
          <Button className="approve-button" onClick={handlePay}>
            Approve Payment
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SubscriptionConfirmModal;
