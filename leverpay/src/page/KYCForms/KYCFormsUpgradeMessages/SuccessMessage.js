import React from "react";
import SuccessImg from "../../../assets/images/successImg.png";
import UploadCheckmark from "../../../components/FileUpload/UploadCheckmark";
import Modal from "react-bootstrap/Modal";

function SuccessMessage() {
  return (
    <center>
      {" "}
      <div className="kyc-success-message-container col-md-7">
        <div style={{ display: "flex" }} col-md-12>
          <div className="col-md-3">&nbsp;</div>
          <img src={SuccessImg} alt="smiley" className="col-md-9" />
          <div className="col-md-4 success-checkmark">
            {" "}
            <UploadCheckmark />
          </div>
        </div>
        <center>
          <h3>
            GOLD Card Upgraded <br />
            SUCCESSFULLY
          </h3>
        </center>
      </div>
    </center>
  );
}

export default SuccessMessage;
