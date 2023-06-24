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
import { useLocalState } from "../../utils/useLocalStorage";
import { updateUserProfile } from "../../services/apiService";

const ProfilePage = ({ userName }) => {
  const inputRef = React.createRef();

  const [currentImage, setCurrentImage] = useState(false);
  const [originalImage, setOriginalImage] = useState("");
  const [selected, setSelected] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  // alert(jwt);
  // console.log(originalImage);
  // const handlePhone = (e) => {
  //   setPhone(e.target.value.replace(/\D/g, ""));
  // };

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

  const discardChanges = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Leverpay.io",
      text: "Do you want to discard changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Discard",
      denyButtonText: `Don't discard`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        toast.success("Discarded successfully");
      } else if (result.isDenied) {
        toast.error("Changes aborted");
      }
    });
  };
  return (
    <div col-md-12 className="outer">
      <Form col-md-8 className="inner-form" onSubmit={saveChanges}>
        <h4>
          <b>Basic Information</b>
        </h4>
        <ImageSelectComponent
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          originalImage={originalImage}
          setOriginalImage={setOriginalImage}
        />
        {/* Form fields here */}
        <div className="fields-control">
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
              required
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
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">Profession</Form.Label>
            <Form.Control
              type="text"
              name="profile_profession"
              value={profession}
              ref={inputRef}
              onChange={(e) => setProfession(e.target.value)}
              placeholder=""
              className="text-area"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">Business Name</Form.Label>
            <Form.Control
              type="text"
              name="profile_business"
              value={businessName}
              ref={inputRef}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder=""
              className="text-area"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="labels">Address</Form.Label>
            <Form.Control
              type="text"
              name="profile_address"
              value={address}
              ref={inputRef}
              onChange={(e) => setAddress(e.target.value)}
              placeholder=""
              className="text-area"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="labels">Country</Form.Label>
            <ReactFlagsSelect
              className="text-area"
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
          {/* <div className="col-md-12 phone-number-div"> */}
          <Form.Group className="mb-3">
            <Form.Label className="labels">Phone Number</Form.Label>
            {/* Phone number component  */}
            <PhoneNumberComponent
              name="phone_number"
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              required
            />
          </Form.Group>
          {/* </div> */}
          {/* add account btn */}
          <AdditionalDetailsComponent />
          {/* end add account btn */}
          <div className="button-control">
            <Button variant="#fff" type="submit" onClick={discardChanges}>
              Discard
            </Button>
            <Button
              variant="dark"
              type="submit"
              // onClick={saveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
      <ToastContainer style={{ dispay: "flex", textAlign: "left" }} />
    </div>
  );
};

export default ProfilePage;
