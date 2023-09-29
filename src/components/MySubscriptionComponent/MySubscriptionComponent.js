import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Logo from "../../assets/images/halfLogo_white.png";
import "./MySubscriptionComponent.css";
import { useState } from "react";
import SubscriptionConfirmModal from "./SubscriptionConfirmModal/SubscriptionConfirmModal";

const MySubscriptionComponent = () => {
  const inputRef = React.createRef();
  const [subscriptionType, setSubscriptionType] = useState("");
  const [subscription, setSubscription] = useState([
    {
      id: 1,
      subType: "Monthly",
    },
    {
      id: 2,
      subType: "3 Months",
    },
    {
      id: 3,
      subType: "Yearly",
    },
  ]);
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("1");
  const [vat, setVat] = useState("7.5");
  const [payNow, setPayNow] = useState({});
  const [subscriptionConfirm, setSubscriptionConfirm] = useState(false);
  const subscriptionText = "Select Subscription Type";
  const [subscriptionError, setSubscriptionError] = useState("");

  const handlePayNow = () => {
    if (
      subscriptionType === "" ||
      subscriptionType === subscriptionText ||
      amount === ""
    ) {
      setSubscriptionError("All fields are required!");
      return;
    } else if (subscriptionType !== subscriptionText) {
      setSubscriptionError("");
      const transaction_fee = 10.0;
      const discountValue = Number(amount) * 0.99;
      const totalAmount = Number(
        discountValue * (1 + vat / 100) + transaction_fee
      ).toFixed(2);

      setPayNow({
        vendor: "NETFLIX",
        subscriptionType: subscriptionType,
        amount: amount,
        discount: discount,
        vat: vat,
        transactionFee: 10.0,
        total: totalAmount,
      });

      setSubscriptionConfirm(true);
    }
  };
  return (
    <Container md={4} sm={6} lg={12} className="subscription-container">
      <Col className="subscription-header">
        <img src={Logo} alt="leverpay-logo" className="company-half-logo" />
        <h1 className="subscription-text">MY SUBSCRIPTION</h1>
      </Col>
      <Row className="subscription-form">
        {<p className="subscription-error">{subscriptionError}</p>}
        <Form>
          <Form.Group className="">
            <Form.Label
              htmlFor="subscription-type"
              className="subscription-label type-label"
            >
              Subscription Type Monthly/yearly
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              className="select-subscription"
              onChange={(e) => setSubscriptionType(e.target.value)}
            >
              <option>{subscriptionText}</option>
              {subscription.map((sub) => {
                return <option value={sub.subType}>{sub.subType}</option>;
              })}
            </Form.Select>
            &nbsp;
            <Row className="">
              <Form.Label
                htmlFor="subscription-amount"
                className="subscription-label input-label"
              >
                Amount
              </Form.Label>
              <Form.Control
                type="text"
                className="subscription-input"
                value={amount}
                name="amount"
                ref={inputRef}
                placeholder=""
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                required
              />
            </Row>
            &nbsp;
            <Row className="">
              <Form.Label
                htmlFor="subscription-amount"
                className="subscription-label input-label"
              >
                Discount(%)
              </Form.Label>
              <Form.Control
                type="text"
                className="subscription-input"
                value={discount}
                name="discount"
                ref={inputRef}
                placeholder=""
                onChange={(e) => setDiscount(e.target.value)}
                required
                disabled
              />
            </Row>
            &nbsp;
            <Row className="">
              <Form.Label
                htmlFor="subscription-amount"
                className="subscription-label input-label"
              >
                VAT(%)
              </Form.Label>
              <Form.Control
                type="text"
                className="subscription-input"
                value={vat}
                name="vat"
                ref={inputRef}
                placeholder=""
                onChange={(e) => setVat(e.target.value)}
                required
                disabled
              />
            </Row>
          </Form.Group>
          <Col className="button-container">
            <Button className="subscription-button" onClick={handlePayNow}>
              PAY NOW
            </Button>
            <Button className="subscription-button subscription-save">
              SAVE
            </Button>
          </Col>
        </Form>
      </Row>
      <SubscriptionConfirmModal
        payNow={payNow}
        subscriptionConfirm={subscriptionConfirm}
        setSubscriptionConfirm={setSubscriptionConfirm}
      />
    </Container>
  );
};

export default MySubscriptionComponent;
