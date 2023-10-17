import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TotalMoney from "../TotalMoney/TotalMoney";
import "./TransferPageComponent.css";
import { Button, Col } from "react-bootstrap";
import TransferOTP from "./TransferOTP";

const TransferPageComponent = ({ amt, naira_code, dollar_code }) => {
  const inputRef = React.createRef();
  const [searchUser, setSearchUser] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [userFound, setUserFound] = useState(false);
  const [amountError, setAmountError] = useState("");
  const userJson = localStorage.getItem("user");
  const userData = JSON.parse(userJson);

  const [show, setShow] = useState(false);

  const handleSearchUser = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const searchData = Object.fromEntries(formData);
    setUserFound(true);
    console.log(searchData);
  };

  const transferFunds = (e) => {
    e.preventDefault();
    if (transferAmount.trim() === "") {
      setAmountError("Please, Enter amount");
      return;
    }
    setShow(true);

    console.log("$100 to James");
  };

  return (
    <Container className="md={4} sm={6} transfer-container">
      <Row className="savings-container md={4} mt-5">
        <Col className="col-md-4 col-10 pt-3 savings-card">
          <TotalMoney
            bg="#F6A61F"
            transfer="Current Balance"
            amt={userData ? userData.wallet.amount.ngn : 0}
          />
        </Col>
        <Col className="col-md-4 col-10 pt-3 savings-card">
          <TotalMoney
            bg="#0E093F"
            transfer="Amount Sent"
            amt={userData ? userData.total_spending.ngn : 0}
          />
        </Col>
      </Row>

      <Form onSubmit={handleSearchUser}>
        <Row className="user-search md={4} mt-2">
          <Form.Label htmlFor="">User id </Form.Label>
          <Col className="search-id col-md-8 col-12">
            <Form.Control
              type="text"
              className="search-input"
              value={searchUser}
              name="user_id"
              ref={inputRef}
              placeholder="search by id"
              onChange={(e) => setSearchUser(e.target.value)}
              required
            />
          </Col>
          <Col>
            <Button variant="primary" type="submit" className="searchID-button">
              Search
            </Button>
          </Col>
        </Row>

        <Row className="user-found-row md={4} mt-2">
          <Col>
            {userFound ? (
              <div className="user-found-container">
                <div className="data-container">
                  <p className="data-found">First Name: John </p>
                  <p className="data-found">Last Name: Doe</p>
                  <p className="data-found">Email: johndoe2023@gmail.com</p>
                  &nbsp;
                </div>
                <p className="data-found">Transfer Amount</p>
                <Form.Control
                  type="text"
                  className="transfer-amount"
                  value={transferAmount}
                  name="transfer_amount"
                  ref={inputRef}
                  placeholder="Enter the amount to be sent"
                  onChange={(e) =>
                    setTransferAmount(e.target.value.replace(/\D/g, ""))
                  }
                  required
                />
                {transferAmount ? (
                  ""
                ) : (
                  <div className="error">{amountError}</div>
                )}

                <div className="balance-value">
                  <p className="p">
                    Current Balance <br />
                    <small className="balance-text">$3000</small> <br />
                    <small className="balance-text">N3000000</small>
                  </p>
                  <p className="p">
                    Amount transfered <br />
                    <small className="balance-text">$500</small> <br />
                    <small className="balance-text">N500000</small>
                  </p>
                </div>
                <div className="transfer-buttons">
                  <Button
                    variant="primary"
                    type="submit"
                    className="transfer-btn"
                    onClick={transferFunds}
                  >
                    Send
                  </Button>

                  <Button
                    variant="danger"
                    type="cancel"
                    className="transfer-btn"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Form>
      <TransferOTP show={show} setShow={setShow} />
    </Container>
  );
};

export default TransferPageComponent;
