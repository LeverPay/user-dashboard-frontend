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
import OTPModal from "../OTPModal/OTPModal";

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
            <div className="col-md- 12  credit-cardd">
              <div className="col-md-12 col-12 ">
                {" "}
                <div className="col-md-12 col-12 card-divv">
                  {" "}
                  <Card
                    number={values.number || ""}
                    name={values.name || ""}
                    expiry={values.expiry || ""}
                    cvc={values.cvc || ""}
                    focused={active}
                  />{" "}
                </div>
                <div>
                  <small className="input-title">Card Num</small>
                  <Field
                    name="number"
                    component="input"
                    type="text"
                    pattern="[\d| ]{16,22}"
                    placeholder="7170 - 0000 - 3412 - 3456"
                    format={formatCreditCardNumber}
                  />
                </div>
                <div className="col-md-12">
                  <small className="input-title">Card Name</small>
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="col-md-12">
                  <small className="input-title">Expiry Date</small>
                  <Field
                    name="expiry"
                    component="input"
                    type="text"
                    pattern="\d\d/\d\d"
                    placeholder="expiry"
                    format={formatExpirationDate}
                  />

                  <div className="col-md-12">
                    <small className="input-title">CVV</small>
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
                <div className="buttons" style={{ display: "flex" }}>
                  <div className="col-md-3 " style={{ marginLeft: "8px" }}>
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
                  <div
                    className="col-md-8 col-8"
                    style={{ marginLeft: "10px" }}
                  >
                    <OTPModal />
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    />
  </Styles>
);
