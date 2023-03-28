import React, { useEffect } from "react";
import "./kyc-forms.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import { gold, diamond, pinkLady, enterprise } from "../../TestData";
import { KYCFormsButton } from "./KYCFormsButton/KYCFormsButton";
import TextInput from "../../components/FileUpload/TextInput/TextInput";
const KYCForms = (props) => {
  let dt = {};
  useEffect(() => {}, []);
  switch (props.accountType) {
    case "gold":
    default:
      dt = gold;
      break;
    case "diamond":
      dt = diamond;
      break;
    case "pinkLady":
      dt = pinkLady;
      break;
    case "enterprise":
      dt = enterprise;
      break;
  }
  return (
    <>
      <div className="kyf-form-container col-md-12">
        <h3>
          (<span className="kyc">KYC</span>) Verification for{" "}
          <span
            className="kyc-account-type"
            style={{ color: dt.color || "#0B0230" }}
          >
            {dt.title}
          </span>
        </h3>
        <h4>Select the type of Document you would like to Upload</h4>

        {dt.data.map((data, index) => (
          <FileUpload data={data} />
        ))}
        {dt.inputPlaceholder.map((data, index) => (
          <TextInput data={data} />
        ))}
        <KYCFormsButton handleClose={props.handleClose} />
      </div>
    </>
  );
};
export default KYCForms;
