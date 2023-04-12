import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ErrorBoundary } from "react-error-boundary";
import avatar from "../../assets/images/avatar.png";
import "../ImageComponent/ImageComponent.css";
import Avatar from "react-avatar-edit";

const ImageComponent = () => {
  //   const [image, setImage] = useState("");
  const [imagecrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(false);
  const [preview, setPreview] = useState(false);

  const onClose = () => {
    setPreview(false);
  };

  const onCrop = (view) => {
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

  return (
    <>
      <div className="upload-control">
        <img src={preview ? preview : avatar} alt="" className="img-style" />
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
    </>
  );
};

export default ImageComponent;
