import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../ProfilePage/ProfilePage.css";
import avatar from "../../assets/images/avatar.png";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
// import { InputText } from "primereact/inputtext";
import Avatar from "react-avatar-edit";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { ErrorBoundary } from "react-error-boundary";

export const SourceContext = React.createContext();
export const AltContext = React.createContext();
export const ClassContext = React.createContext();

const ProfilePage = () => {
  //   const [image, setImage] = useState("");
  const [imagecrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(false);
  const [preview, setPreview] = useState(false);

  const onClose = () => {
    setPreview(false);
  };

  const onCrop = (view, e) => {
    setPreview(view);
  };

  const onBeforeFileLoad = (e) => {
    const file = e.target.files[0];
    const type = file;

    console.log(type.name);
  };

  const saveImageCrop = () => {
    setPreview(preview);
    setImageCrop(false);
  };

  const handleRemove = () => {
    setPreview(!preview ? avatar : avatar);
    setImageCrop(false);
  };

  const saveChanges = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Leverpay.io",
      text: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
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
        Swal.fire("Discarded!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes aborted", "", "info");
      }
    });
  };
  return (
    <div col-md-12 className="outer">
      <Form col-md-8 className="inner-form">
        <h4>
          <b>Basic Information</b>
        </h4>
        <div className="upload-control">
          {/* Image Component  */}
          <SourceContext.Provider value={preview ? preview : avatar}>
            <AltContext.Provider value={""}>
              <ClassContext.Provider value={"img-style"}>
                <ImageComponent />
              </ClassContext.Provider>
            </AltContext.Provider>
          </SourceContext.Provider>
          {/* Image Component Ends Here */}
          <Button
            variant="primary"
            className="change-img"
            onClick={() => setImageCrop(true)}
          >
            Change <MdOutlineEdit />
          </Button>

          <Button variant="#fff" className="remove-img" onClick={handleRemove}>
            Remove <MdDeleteOutline />
          </Button>
        </div>

        {/* UPLOAD MODAL STARTS HERE */}
        <Modal
          show={imagecrop}
          onHide={() => setImageCrop(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload Profile Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Avatar  */}
            <ErrorBoundary
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "red",
                    color: "#fff",
                  }}
                >
                  INVALID FILE FORMAT
                </div>
              }
            >
              <Avatar
                width={"100%"}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
                exportSize={390}
                onBeforeFileLoad={onBeforeFileLoad}
                src={src}
              />
            </ErrorBoundary>

            {/* Body ends here  */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setImageCrop(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={saveImageCrop}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* UPLOAD MODAL ENDS HERE */}

        {/* Form fields here */}
        <div className="fields-control">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="" className="text-area" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="" className="text-area" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Business Name</Form.Label>
            <Form.Control type="text" placeholder="" className="text-area" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select className="text-area" enabled>
              <option>Nigeria</option>
            </Form.Select>
          </Form.Group>
          <div className="col-md-12 phone-number-div">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label className="phone-number-label">Code</Form.Label>
                <Form.Select className="text-area country-code">
                  <option>+234</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-9">
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder=""
                  pattern="[0-9]{10}"
                  className="text-area phone-number"
                />
              </Form.Group>
            </div>
          </div>
        </div>
        <div className="button-control">
          <Button variant="#fff" type="submit" onClick={discardChanges}>
            Discard
          </Button>
          <Button variant="dark" type="submit" onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
