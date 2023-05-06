import React from "react";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import Styles from "./Styles";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link, NavLink } from "react-router-dom";
import Arrow from "../../../assets/images/arrow.png";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import { Password } from "./Password";
import PaymentModal from "../PaymentModal/PaymentModal";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  // window.alert(JSON.stringify(values, 0, 2));
};

export const CreditCard = () => (
  <Styles>
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="col-md-12 flexy  credit-cardd">
              <div className="col-md-7">
                {" "}
                <div>
                  <h5> Card Number</h5>
                  <small>Enter the 16-digit card number on the card</small>
                  <Field
                    name="number"
                    component="input"
                    type="text"
                    pattern="[\d| ]{16,22}"
                    placeholder="2412 - 7512 - 3412 - 3456"
                    format={formatCreditCardNumber}
                  />
                </div>
                <div className="flexy  space">
                  <div className="col-md-6">
                    <h5>Your Name</h5>
                    <small>Enter your name on the card</small>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <Field
                      name="name"
                      component="input"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="flexy  space">
                    <div className="col-md-6">
                      <h5>Expiry Date</h5>
                      <small>Enter the expiration date of the card</small>
                    </div>
                    <div className="col-md-6">
                      <Field
                        name="expiry"
                        component="input"
                        type="text"
                        pattern="\d\d/\d\d"
                        placeholder="09 / 36"
                        format={formatExpirationDate}
                      />
                    </div>
                  </div>
                  <div className="flexy space">
                    <div className="col-md-6">
                      <h5>CVV Number</h5>
                      <small>Enter the 3 0r 4 digit number on the card</small>
                    </div>
                    <div className="col-md-6">
                      <Field
                        name="cvc"
                        component="input"
                        type="text"
                        pattern="\d{3,4}"
                        placeholder="327"
                        format={formatCVC}
                      />
                    </div>
                  </div>
                </div>
                <div className="buttons flexy">
                  <div className="col-md-2">
                    {" "}
                    <button
                      type="button"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                      className="reset-btn"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="col-md-10" style={{ marginLeft: "10px" }}>
                    {" "}
                    {/* <button
                      type="submit"
                      disabled={submitting}
                      className="pay-btn"
                    >
                      Pay Now
                    </button> */}
                    <PaymentModal />
                  </div>
                </div>
              </div>
              <div
                className="col-md-5 card-section"
                style={{
                  background: "#fafafa",
                  paddingTop: "20px",
                  borderRadius: "10px",
                }}
              >
                <Card
                  number={values.number || ""}
                  name={values.name || ""}
                  expiry={values.expiry || ""}
                  cvc={values.cvc || ""}
                  focused={active}
                />

                <div className="offset-md-2 col-md-9 space card-summary">
                  {" "}
                  <Row>
                    <Col className="">
                      <h5>Company</h5>
                    </Col>
                    <Col className="h6">
                      <h6>Apple</h6>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col className="h5">
                      <h5>Order Number</h5>
                    </Col>
                    <Col className="h6">
                      <h6>223456</h6>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col className="h5">
                      <h5>Product</h5>
                    </Col>
                    <Col className="h6">
                      <h6>MackBook Air</h6>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col className="h5">
                      <h5>Vat ( 20% )</h5>
                    </Col>
                    <Col className="h6">
                      <h6>$100.00</h6>
                    </Col>
                  </Row>
                </div>
                <div className="offset-md-2 space">
                  <p>You have to pay</p>
                  <h6>
                    549.99 <span style={{ color: "#0051ff" }}>USD</span>
                  </h6>
                </div>
                <center>
                  <Link to={"/"} className="link space">
                    <img className="" src={Arrow} alt="Scholar" width="5%" />{" "}
                    Back to order overview
                  </Link>
                </center>
              </div>
            </div>
            {/* <h2>Values</h2>
            <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        );
      }}
    />
  </Styles>
);
