import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import KYCForms from "../KYCForms";
import { KYCFormsButton } from "../KYCFormsButton/KYCFormsButton";
import axios from "axios";
import "./kyc-gold-form-modal.css";
import { fetchInfo, countries, baseUrl } from "../../../components/Endpoints";
const KYCFormModal = (props) => {
  const [show, setShow] = useState(false);
  const [accType, setAccType] = useState("");
  const [countriesData, setCountries] = useState({});
  const handleClose = () => {
    setShow(false);
    props.callback("done");
  };
  const Cancel = () => {
    setShow(false);
    props.callback("");
  };
  useEffect(() => {
    if (accType != "") fetchData();
  }, [accType]);
  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl + countries); // Replace with your API endpoint
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleShow = (acc) => {
    if (acc !== accType) setAccType(acc);
  };
  useEffect(() => {
    if (accType !== "") {
      setShow(true);
      localStorage.setItem("section_1", 0);
      localStorage.setItem("section_2", 0);
      localStorage.setItem("section_3", 0);
    } else {
      setShow(false);
    }
  }, [accType]);
  useEffect(() => {
    handleShow(props.acct);
    // console.log("handle show dey here o");
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Button variant="" className="cancel-btn" onClick={Cancel}>
            Cancel
          </Button>{" "}
          <KYCForms
            accountType={accType}
            handleClose={handleClose}
            countryList={countriesData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default KYCFormModal;
