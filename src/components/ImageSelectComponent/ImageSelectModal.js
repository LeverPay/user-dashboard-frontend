import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ImageSelectModal.css";

const ImageSelectModal = ({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImg,
  currentImage,
  validImage,
}) => {
  return (
    <div>
      {/* UPLOAD MODAL STARTS HERE */}
      <Modal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Body ends here  */}
          <div className="image-upload-main">
            <p>{currentImage.name}</p>
            <label for="image-upload" className="upload-btn">
              Add an image
            </label>
            <input
              hidden
              id="image-upload"
              type={"file"}
              accept="image/jpeg, image/jpg, image/png"
              onChange={getImage}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={validImage && currentImage.name ? false : true}
            variant="primary"
            onClick={uploadImg}
          >
            Save Profile Picture
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageSelectModal;
