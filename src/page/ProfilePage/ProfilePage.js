import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../ProfilePage/ProfilePage.css";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import AdditionalDetailsComponent from "../../components/AdditionalDetailsComponent/AdditionalDetailsComponent";
import ReactFlagsSelect from "react-flags-select";
import { CountryFlagData } from "../../TestData";
import PhoneNumberComponent from "../../components/PhoneNumberComponent/PhoneNumberComponent";
import ImageSelectComponent from "../../components/ImageSelectComponent/ImageSelectComponent";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useLocalState } from "../../utils/useLocalStorage";
import {
  getCities,
  getCountry,
  getState,
  updateUserProfile,
} from "../../services/apiService";
import PrimaryEmailComponent from "../../components/PrimaryEmailComponentModal/PrimaryEmailComponent";
import PrimaryNumberComponent from "../../components/PrimaryNumberComponent/PrimaryNumberComponent";
import { FormGroup } from "react-bootstrap";

const ProfilePage = ({ userName }) => {
  const inputRef = React.createRef();

  // let defaultNumber = userName.phoneNumber;
  // let newDefault = defaultNumber.substring(1);

  // console.log(newDefault);

  const [currentImage, setCurrentImage] = useState(false);
  const [originalImage, setOriginalImage] = useState("");
  const [selected, setSelected] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [otherName, setOthername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [otherEmailAddress, setOtherEmailAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState([]);
  const [countryID, setCountryID] = useState("");
  const [state, setState] = useState([]);
  const [stateID, setStateID] = useState("");
  const [city, setCity] = useState([]);
  const [cityID, setCityID] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState(userName.phoneNumber);
  const [otherPhoneNumber, setOtherPhoneNumber] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [primaryEmail, setPrimaryEmail] = useState(false);
  const [primaryNumber, setPrimaryNumber] = useState(false);
  // const [profileError, setProfileError] = useState("");

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);

  const disabled = primaryNumber === true ? true : false;

  const primaryEmailCheck = () => {
    setPrimaryEmail(!primaryEmail);
    if (primaryEmail === false) setShowEmailModal(true);
  };

  const primaryNumberCheck = () => {
    // if (
    //   typeof phoneNumber.phone === "undefined" ||
    //   phoneNumber.phone.length < 10
    // ) {
    //   setProfileError("Invalid, field must contain at least 10 digits");
    //   return setPrimaryNumber(false);
    // } else {
    //   if (setProfileError === "") setPrimaryNumber(false);
    //   return setProfileError("");
    // }
    setPrimaryNumber(!primaryNumber);
    if (primaryNumber === false) setShowNumberModal(true);
  };

  const handleCountry = (code) => {
    setSelected(code);
  };
  const saveChanges = (e) => {
    e.preventDefault();

    //get data from state
    // const phone = phoneNumber.phone;
    const otherPhone = otherPhoneNumber.phone;

    const userDataUpdate = {
      other_name: otherName,
      other_email: otherEmailAddress,
      other_phone: otherPhone,
      primary_email: userName.email,
      primary_phone: userName.phone,
      gender: userName.gender,
      country_id: countryID,
      state_id: stateID,
      city_id: cityID,
      passport: originalImage.name,
    };

    console.log(userDataUpdate);
    //const dataValues = Object.values(userData);
    //-------------- API import --------------- //
    updateUserProfile(jwt, userDataUpdate);
  };

  useEffect(() => {
    getCountry({ setCountry });
  }, []);

  useEffect(() => {
    getState({ countryID, setState });
  }, [countryID]);

  useEffect(() => {
    getCities({ stateID, setCity });
  }, [stateID]);
  return (
    <div col-12 className="outer">
      <Tabs>
        <TabList>
          <Tab>Basic Information</Tab>
          <Tab>Bank Details</Tab>
        </TabList>

        <TabPanel>
          <Form col-md-8 className="inner-form" onSubmit={saveChanges}>
            <ImageSelectComponent
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
              originalImage={originalImage}
              setOriginalImage={setOriginalImage}
            />
            {/* Form fields here */}
            <div className="fields-control">
              <div className="name-row">
                <Form.Group className="mb-3" controlId="">
                  <div className="handle-label">
                    <Form.Label>First Name</Form.Label>
                  </div>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={first_name}
                    placeholder={userName.firstName}
                    ref={inputRef}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="text-area"
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <div className="handle-label">
                    <Form.Label>Last Name</Form.Label>
                  </div>

                  <Form.Control
                    type="text"
                    name="last_name"
                    value={last_name}
                    ref={inputRef}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={userName.lastName}
                    className="text-area"
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <div className="handle-label">
                    <Form.Label>Other Name</Form.Label>
                  </div>
                  <Form.Control
                    type="text"
                    name="other_name"
                    value={otherName}
                    placeholder={
                      userName.other_name === ""
                        ? "other_name"
                        : userName.otherName
                    }
                    ref={inputRef}
                    onChange={(e) => setOthername(e.target.value)}
                    className="text-area"
                  />
                </Form.Group>
              </div>
              <div className="handle-label">
                <Form.Label htmlFor="gender">Gender</Form.Label>
              </div>
              <Form.Control
                type="text"
                name="gender"
                value=""
                placeholder={userName.gender}
                className="text-area gender"
                readOnly
              />
              <br />
              <div className="email-container">
                <Form.Group className="mb-3" controlId="">
                  <Form.Label className="email-label">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={userName.reg_email}
                    className="text-area email-address"
                    value={otherEmailAddress}
                    onChange={(e) => setOtherEmailAddress(e.target.value)}
                    // disabled={primaryEmail === true ? true : false}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label className="email-label-2">
                    Other Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className="text-area email-address"
                    id="email-address-2"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    disabled={primaryEmail === true ? true : false}
                  />
                  &nbsp;
                  <div className="primary-email">
                    <Form.Label className="make-email-text">
                      Make this my primary email
                    </Form.Label>
                    &nbsp;
                    <input
                      type="checkbox"
                      value={primaryEmail}
                      onChange={primaryEmailCheck}
                    />
                  </div>
                </Form.Group>
              </div>
              {/* &nbsp; */}
              <div className="country-state-city">
                <Form.Group>
                  <div className="country-label">
                    <Form.Label>Country</Form.Label>
                  </div>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setCountryID(e.target.value)}
                    className="text-area select-country"
                  >
                    <option>Select your country</option>
                    {country.map((c) => {
                      return <option value={c.id}>{c.country_name}</option>;
                    })}
                  </Form.Select>
                </Form.Group>

                {/* <Form.Group className="">
                  <Form.Label className="labels">Country</Form.Label>
                  <ReactFlagsSelect
                    className="text-area select-country"
                    selected={selected}
                    onSelect={handleCountry}
                    ref={inputRef}
                    value={selected}
                    // countries={CountryFlagData.map((c) => c.code)}
                    countries={CountryFlagData.map((c) => c.code)}
                    // searchable
                    optionsSize={15}
                    // selectButtonClassName="menu-flags-button"
                  />
                </Form.Group> */}
                <Form.Group className="">
                  <div className="state-label">
                    <Form.Label htmlFor="state">State</Form.Label>
                  </div>

                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setStateID(e.target.value)}
                    className="text-area select-state"
                  >
                    {/* <option>Select your state</option> */}
                    {state.map((s) => {
                      return <option value={s.id}>{s.state_name}</option>;
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="">
                  <div className="city-label">
                    <Form.Label htmlFor="city">City</Form.Label>
                  </div>

                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setCityID(e.target.value)}
                    className="text-area select-city"
                  >
                    {city.map((c) => {
                      return <option value={c.id}>{c.city_name}</option>;
                    })}
                  </Form.Select>
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="">
                <div className="handle-label">
                  <Form.Label>Address</Form.Label>
                </div>
                <Form.Control
                  type="text"
                  name="profile_address"
                  value={address}
                  ref={inputRef}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder=""
                  className="text-area address"
                />
              </Form.Group>
              <div className="phone-number-container">
                <Form.Group className="mb-3 other-number" controlId="">
                  <div className="handle-label">
                    <Form.Label>Phone Number</Form.Label>
                  </div>
                  <Form.Control
                    type="text"
                    ref={inputRef}
                    // onChange={(e) => setAddress(e.target.value)}
                    placeholder={userName.reg_phone}
                    className="text-area default-number"
                    readOnly
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3 other-number">
                  <Form.Label className="labels">Phone Number</Form.Label>
                  <PhoneNumberComponent
                    name="phone_number"
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    // disabled={disabled}
                    required
                  />
                </Form.Group> */}
                <Form.Group className="mb-3 phone-number">
                  <div className="handle-label">
                    <Form.Label>Other Phone Number</Form.Label>
                  </div>
                  <PhoneNumberComponent
                    name="phone_number"
                    phoneNumber={otherPhoneNumber}
                    setPhoneNumber={setOtherPhoneNumber}
                    disabled={disabled}
                    required
                  />
                  <div className="primary-number">
                    <Form.Label className="labels primary-number-text">
                      Make this my primary number
                    </Form.Label>
                    &nbsp;
                    <input type="checkbox" onChange={primaryNumberCheck} />
                  </div>
                  {/* <p className="error">{profileError}</p> */}
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="">
                <div className="handle-label">
                  <Form.Label>Profession</Form.Label>
                </div>
                <Form.Control
                  type="text"
                  name="profile_profession"
                  value={profession}
                  ref={inputRef}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder=""
                  className="text-area profession"
                />
              </Form.Group>
              <div className="button-control">
                <Button
                  variant="primary"
                  type="submit"
                  className="update-button"
                  // onClick={saveChanges}
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </Form>
        </TabPanel>
        <TabPanel>
          <AdditionalDetailsComponent />
        </TabPanel>
      </Tabs>

      <ToastContainer style={{ dispay: "flex", textAlign: "left" }} />
      <PrimaryEmailComponent
        show={showEmailModal}
        setShow={setShowEmailModal}
      />
      <PrimaryNumberComponent
        show={showNumberModal}
        setShow={setShowNumberModal}
      />
    </div>
  );
};
export default ProfilePage;
