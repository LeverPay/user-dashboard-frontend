import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Logo from "../../assets/images/halfLogo_white.png";
import "./MySubscriptionComponent.css";
import { useState } from "react";

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
  const [discount, setDiscount] = useState("");
  const [vat, setVat] = useState("");

  console.log(subscriptionType);
  const handlePayNow = () => {
    const payNowData = {};
  };
  return (
    <Container md={4} sm={6} lg={12} className="subscription-container">
      <Col className="subscription-header">
        <img src={Logo} alt="leverpay-logo" className="company-half-logo" />
        <h1 className="subscription-text">MY SUBSCRIPTION</h1>
      </Col>
      <Row className="subscription-form">
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
              <option>Select Subscription Type</option>
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
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Row>
            &nbsp;
            <Row className="">
              <Form.Label
                htmlFor="subscription-amount"
                className="subscription-label input-label"
              >
                Discount(1%)
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
              />
            </Row>
            &nbsp;
            <Row className="">
              <Form.Label
                htmlFor="subscription-amount"
                className="subscription-label input-label"
              >
                VAT(7.5%)
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
    </Container>
  );
};

export default MySubscriptionComponent;
