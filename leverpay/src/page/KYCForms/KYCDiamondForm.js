import React from "react";
import "./kyc-forms.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import {
  gold,
  inputPlaceholder,
  inputPlaceholderDiamond,
} from "../../TestData";
import { KYCFormsButton } from "./KYCFormsButton/KYCFormsButton";
import TextInput from "../../components/FileUpload/TextInput/TextInput";
export const KYCDiamondForm = (props) => {
  return (
    <>
      <div className="kyf-form-container col-md-12">
        <h2>
          (<span className="kyc">KYC</span>) Verification for{" "}
          <span className="kyc-account-type">{props.accountType}</span>
        </h2>
        <h4>Select the type of Document you would like to Upload</h4>

        {gold.map((data, index) => (
          <FileUpload data={data} />
        ))}
        {inputPlaceholderDiamond.map((data, index) => (
          <TextInput data={data} />
        ))}
        <KYCFormsButton handleClose={props.handleClose} />
      </div>
    </>
  );
};
