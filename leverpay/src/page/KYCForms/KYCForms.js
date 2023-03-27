import React, { useEffect } from "react";
import "./kyc-forms.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import { gold, diamond } from "../../TestData";
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
  }
  return (
    <>
      <div className="kyf-form-container col-md-12">
        <h2>
          (<span className="kyc">KYC</span>) Verification for{" "}
          <span className="kyc-account-type">{dt.title}</span>
        </h2>
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
