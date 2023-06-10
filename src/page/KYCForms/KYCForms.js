import React, { useState, useEffect } from "react";
import "./kyc-forms.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import { gold, diamond, pinkLady, enterprise } from "../../TestData";
import { KYCFormsButton } from "./KYCFormsButton/KYCFormsButton";
import TextInput from "../../components/FileUpload/TextInput/TextInput";

const KYCForms = (props) => {
  const [upgradeData, setUgradeData] = useState(null);
  const [fileEnable, setFIleEnable] = useState("");
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
  useEffect(() => {
    window.addEventListener("storage", () => {
      setUgradeData(JSON.parse(localStorage.getItem("upgrade_data"), null));
      console.log("Change to local storage!");
      console.log(upgradeData);
    });
  });
  useEffect(() => {
    setFIleEnable(upgradeData == null ? "" : upgradeData.name);
    console.log(fileEnable);
  }, [upgradeData]);

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
          <FileUpload
            data={data}
            enabled={
              fileEnable == data.name || fileEnable == "" || data.req === true
            }
          />
        ))}
        {dt.inputPlaceholder.map((data, index) => (
          <TextInput data={data} />
        ))}
        <KYCFormsButton
          handleClose={props.handleClose}
          accountType={props.accountType}
        />
      </div>
    </>
  );
};
export default KYCForms;
