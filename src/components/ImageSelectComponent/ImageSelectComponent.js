import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import avatar from "../../assets/images/avatar.png";
import ImageSelectModal from "./ImageSelectModal";
import { ToastContainer, toast } from "react-toastify";
import "./ImageSelectComponent.css";
// import "../ImageComponent/ImageComponent.css";
const ImageSelectComponent = ({ currentImage, setCurrentImage }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [validImage, setValidImage] = useState(true);

  const getImage = (e) => {
    const imageType = e.target.files[0].type;
    if (
      imageType !== "image/jpg" &&
      imageType !== "image/jpeg" &&
      imageType !== "image/png"
    ) {
      toast.error("Invalid file format");
      setValidImage(false);
    }
    setCurrentImage(e.target.files[0]);
  };

  const uploadImg = () => {
    if (currentImage.length !== 0) {
      setCurrentImage(URL.createObjectURL(currentImage));
    } else {
      setCurrentImage(currentImage);
    }
    setModalOpen(false);
  };

  const handleRemoveImage = () => {
    setCurrentImage(!currentImage ? avatar : avatar);
  };
  return (
    <>
      <div className="upload-control">
        <ImageSelectModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          getImage={getImage}
          uploadImg={uploadImg}
          currentImage={currentImage}
          validImage={validImage}
          //setValidImage
        />
        {/* image tag */}
        <img
          src={currentImage ? currentImage : avatar}
          alt=""
          className="profile-img"
        />

        <Button
          variant="primary"
          className="change-img"
          onClick={() => setModalOpen(true)}
        >
          Change <MdOutlineEdit />
        </Button>

        <Button
          variant="#fff"
          className="remove-img"
          onClick={handleRemoveImage}
        >
          Remove <MdDeleteOutline />
        </Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default ImageSelectComponent;