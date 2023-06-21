import React, { useState, useEffect } from "react";
import "./kyc-forms.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import { gold, diamond, pinkLady, enterprise } from "../../TestData";
import { KYCFormsButton } from "./KYCFormsButton/KYCFormsButton";
import TextInput from "../../components/FileUpload/TextInput/TextInput";
import { CountrySelect } from "../../components/CountrySelect";
import { fetchInfo, states, cities, baseUrl } from "../../components/Endpoints";
import axios from "axios";

const KYCForms = (props) => {
  const [upgradeData, setUgradeData] = useState(null);
  const [fileEnable, setFIleEnable] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [statesData, setStatesData] = useState({});
  const [citiesData, setCitiesData] = useState({});
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

  const fetchData = async (country_id) => {
    try {
      const response = await axios.post(baseUrl + states, {
        country_id: country_id,
      }); // Replace with your API endpoint
      setStatesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataState = async (state_id) => {
    try {
      const response = await axios.post(baseUrl + cities, {
        state_id: state_id,
      }); // Replace with your API endpoint
      setCitiesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCountryId !== "") {
      fetchData(selectedCountryId);
    }
  }, [selectedCountryId]);

  useEffect(() => {
    if (selectedStateId !== "") {
      fetchDataState(selectedStateId);
    }
  }, [selectedStateId]);

  function setCountry(country_id) {
    console.log("called back with " + country_id + "");
    // if (country_id !== "") {
    setSelectedCountryId(country_id);
    // }
  }

  function setStateCallBack(state_id) {
    console.log("called back with state id  " + state_id + "");
    setSelectedStateId(state_id);
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

        <h6>Select Country</h6>
        <CountrySelect
          countyList={props.countryList}
          callback={setCountry}
          selector="country_name"
        />
        {selectedCountryId != "" ? (
          <>
            <h6>Select State</h6>
            <CountrySelect
              countyList={statesData}
              callback={setStateCallBack}
              selector="state_name"
            />
          </>
        ) : (
          ""
        )}
        {selectedStateId != "" ? (
          <>
            <h6>Select City</h6>
            <CountrySelect countyList={citiesData} selector="city_name" />
          </>
        ) : (
          ""
        )}
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
