import React, { useState } from "react";
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
import { updateUserProfile } from "../../services/apiService";
import PrimaryEmailComponent from "../../components/PrimaryEmailComponentModal/PrimaryEmailComponent";
import PrimaryNumberComponent from "../../components/PrimaryNumberComponent/PrimaryNumberComponent";

const ProfilePage = ({ userName }) => {
  const inputRef = React.createRef();

  const [currentImage, setCurrentImage] = useState(false);
  const [originalImage, setOriginalImage] = useState("");
  const [selected, setSelected] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [otherName, setOthername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [primaryEmail, setPrimaryEmail] = useState(false);
  const [primaryNumber, setPrimaryNumber] = useState(false);
  // const [profileError, setProfileError] = useState("");

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);

  // alert(jwt);
  // console.log(originalImage);
  // const handlePhone = (e) => {
  //   setPhone(e.target.value.replace(/\D/g, ""));
  // };

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
    const phone = phoneNumber.phone;

    const userDataUpdate = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      passport: originalImage.name,
    };

    console.log(userDataUpdate);
    //const dataValues = Object.values(userData);
    //-------------- API import --------------- //
    updateUserProfile(jwt, userDataUpdate);
  };
  return (
    <div col-md-12 className="outer">
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
                  <Form.Label className="labels">First Name</Form.Label>
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
                  <Form.Label className="labels">Last Name</Form.Label>
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
                  <Form.Label className="labels">Other Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="other_name"
                    value={otherName}
                    placeholder="other name"
                    ref={inputRef}
                    onChange={(e) => setOthername(e.target.value)}
                    className="text-area"
                    readOnly
                  />
                </Form.Group>
              </div>
              <Form.Label htmlFor="gender" className="labels">
                Gender
              </Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value=""
                placeholder=""
                className="text-area gender"
                readOnly
              />
              <br />
              <div className="email-container">
                <Form.Group className="mb-3" controlId="">
                  <Form.Label className="labels email-label">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    className="text-area email-address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    // disabled={primaryEmail === true ? true : false}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label className="labels email-label-2">
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
                    required
                  />
                  &nbsp;
                  <div className="primary-email">
                    <Form.Label className="labels make-email-text">
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
                <Form.Group className="">
                  <Form.Label className="labels">Country</Form.Label>
                  <ReactFlagsSelect
                    className="text-area select-country"
                    selected={selected}
                    onSelect={handleCountry}
                    ref={inputRef}
                    value={selected}
                    countries={CountryFlagData.map((c) => c.code)}
                    // searchable
                    optionsSize={15}
                    // selectButtonClassName="menu-flags-button"
                  />
                </Form.Group>
                <Form.Group className="">
                  <Form.Label htmlFor="state" className="labels">
                    State
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="select-state"
                  >
                    <option value="1"></option>
                    <option value="2"></option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="">
                  <Form.Label htmlFor="city" className="labels">
                    City
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="select-city"
                  >
                    <option value="1"></option>
                    <option value="2"></option>
                  </Form.Select>
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="">
                <Form.Label className="labels">Address</Form.Label>
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
                <Form.Group className="mb-3 other-number">
                  <Form.Label className="labels">Phone Number</Form.Label>
                  <PhoneNumberComponent
                    name="phone_number"
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    // disabled={disabled}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 phone-number">
                  <Form.Label className="labels">Other Phone Number</Form.Label>
                  <PhoneNumberComponent
                    name="phone_number"
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
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
                <Form.Label className="labels">Profession</Form.Label>
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
