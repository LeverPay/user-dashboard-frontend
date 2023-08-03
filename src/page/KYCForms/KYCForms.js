import React, { useState, useEffect } from "react";
import "./kyc-forms.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import { gold, diamond, pinkLady, enterprise, groups } from "../../TestData";
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
  const [section1, setSection1] = useState(0);
  const [section2, setSection2] = useState(0);
  const [section3, setSection3] = useState(0);

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
    // }7]0.|









    
  }

  function setStateCallBack(state_id) {
    console.log("called back with state id  " + state_id + "");
    setSelectedStateId(state_id);
  }

  useEffect(() => {
    window.addEventListener("storage", () => {
      setUgradeData(JSON.parse(localStorage.getItem("upgrade_data"), null));
      setSection1(parseInt(localStorage.getItem("section_1", 0)));
      setSection2(parseInt(localStorage.getItem("section_2", 0)));
      setSection3(parseInt(localStorage.getItem("section_3", 0)));
      console.log("section 1:", section1);
      console.log("section 2:", section2);
      console.log("section 3:", section3);
    });
  });
  useEffect(() => {
    setFIleEnable(upgradeData == null ? "" : upgradeData.name);
    console.log(fileEnable);
  }, [upgradeData]);

  function checkSection(data) {
    if (data.group_id) {
      let grp;
      let resp;
      switch (data.group_id) {
        case 1:
          grp = groups[0];
          resp = section1;
          break;
        case 2:
          grp = groups[1];
          resp = section2;
          break;
        default:
          grp = groups[2];
          resp = section3;
          break;
      }
      return resp >= grp.set_req;
    }
    return true;
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
        <div className="flexy flexyM">
          <div className="col-md-12">
            {dt.data.map((data, index) => (
              <FileUpload
                data={data}
                enabled={
                  fileEnable == data.name ||
                  !checkSection(data) ||
                  data.req === true
                }
              />
            ))}
          </div>
        </div>

        <h6 className="country-heading">Select Country</h6>
        <CountrySelect
          countyList={props.countryList}
          callback={setCountry}
          selector="country_name"
        />
        {selectedCountryId != "" ? (
          <>
            <h6 className="country-heading">Select State</h6>
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
            <h6 className="country-heading">Select City</h6>
            <CountrySelect countyList={citiesData} selector="city_name" />
          </>
        ) : (
          ""
        )}
        {/* {dt.inputPlaceholder.map((data, index) => (
          <TextInput data={data} />
        ))} */}
        {selectedCountryId != "" ? (
          <>
            {dt.inputPlaceholder.map((data, index) => (
              <TextInput data={data} selector="state_name" />
            ))}
          </>
        ) : (
          ""
        )}
        <KYCFormsButton
          handleClose={props.handleClose}
          accountType={props.accountType}
        />
      </div>
    </>
  );
};
export default KYCForms;
