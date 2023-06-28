import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
import "./file_upload.css";
import Button from "react-bootstrap/Button";
import CamIcon from "../../assets/images/camera.png";
// import Passport from "../../assets/images/Passport.png";
import UploadCheckmark from "./UploadCheckmark";
import BackArrow from "./BackArrow";
import Webcamera from "../../page/KYCForms/Webcamera/Webcamera";
function FileUpload({ data, enabled }) {
  // TO DO: fix the bug on auto checkmark on page load
  // TO DO: fix the bug on the uncorrelating index file removal
  const [images, setImages] = useState([true]);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [selected, setSelected] = useState(BackArrow);
  const maxNumber = data.maxUpload;
  const [webcam, setWebcam] = useState(false);
  const toggle = () => setWebcam(!webcam);

  // Function to convert base64 to Blob
  function setCollectedImg(img) {
    let imageList = images;
    let newImg = { data_url: img };

    imageList.push(newImg);
    console.log(imageList);
    setImages(images);
    toggle();
    return () => onChange;
  }
  const onChange = (imageList, addUpdateIndex) => {
    // setImages(imageList);
    let ctx = imageList.length;

    if (ctx === 0) {
      imageList[0] = data.icon;
      setImages(imageList);
      console.log(imageList, ctx);
    } else {
      // eslint-disable-next-line eqeqeq
      let chk = imageList.indexOf(data.icon);
      if (chk >= 0) {
        imageList.splice(imageList.indexOf(data.icon), 1);
      }
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    }
  };

  function imageUpload(onImageUpload, imageList) {
    let ct = images.length;
    setUploadStatus(ct == maxNumber && imageList[0] !== data.icon);
    console.log(ct, uploadStatus);
    return onImageUpload;
  }
  function removeImg(imageList, onImageRemove, index) {
    let chk = index === imageList.indexOf(data.icon);
    let ct = images.length;
    let check = ct === maxNumber;
    console.log(chk, check);
    if (chk && check) {
      imageList.splice(index, 1);
      return onImageRemove;
    }
    return () => onImageRemove(index);
  }
  useEffect(() => {
    setSelected(BackArrow);
    onChange([]);
    // console.log(images, __filename);
  }, []);
  useEffect(() => {
    setSelected(uploadStatus ? UploadCheckmark : BackArrow);
    let sectionName;
    let storedSection;
    switch (data.group_id) {
      case 1:
        sectionName = "section_1";
        break;
      case 2:
        sectionName = "section_2";

        break;
      default:
        sectionName = "section_3";
        break;
    }
    storedSection = parseInt(localStorage.getItem(sectionName, "0"));
    if (isNaN(storedSection)) storedSection = 0;

    if (uploadStatus) {
      localStorage.setItem("upgrade_data", JSON.stringify(data));
      storedSection += 1;
    } else {
      localStorage.removeItem("upgrade_data");
      storedSection = storedSection == 0 ? 0 : storedSection - 1;
    }
    console.log("storedSection:" + sectionName + ":", storedSection);
    localStorage.setItem(sectionName, JSON.stringify(storedSection));
    window.dispatchEvent(new Event("storage"));
  }, [uploadStatus]);

  return (
    <>
      <div className="file-upload-container col-md-12">
        <h5 className="file-title">
          {" "}
          {data.name} <span className="hint2">{data.description}</span>
        </h5>
        <button
          className="btn btn-light file-btn flexy flexyM "
          disabled={!enabled}
        >
          <ImageUploading
            className="file-upload-input"
            multiple
            value={images}
            s
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={[
              "jpg",
              "doc",
              "png",
              "svg",
              "jpeg",
              "pdf",
              "gif",
              "webp",
            ]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper col-md-12 col-12">
                <div
                  style={isDragging ? { color: "red" } : null}
                  className="file-upload-div"
                  onClick={imageUpload(onImageUpload, imageList)}
                  {...dragProps}
                  // eslint-disable-next-line no-undef
                  // {...onImageUpdate(index)}
                >
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={image.data_url ? image.data_url : data.icon}
                        alt="preview"
                        onClick={removeImg(imageList, onImageRemove, index)}
                        {...dragProps}
                      />
                    </div>
                  ))}{" "}
                  {/* <h5> {data.name}</h5> */}
                  <small className="hint">(click or drag to upload)</small>
                  <div
                    className="file-upload-arrow"
                    // onClick={imageUpload(onImageUpload, imageList)}
                    {...dragProps}
                  >
                    {selected}
                  </div>
                </div>
                &nbsp;
              </div>
            )}
          </ImageUploading>{" "}
          <div className="col-md-1 hover-text">
            <button onClick={toggle} className="camera-btn ">
              <img className="" src={CamIcon} alt="Scholar" width="" />
            </button>
            {webcam && <Webcamera tg={toggle} captImg={setCollectedImg} />}
            <span class="tooltip-text" id="top">
              Take a photo
            </span>
          </div>
        </button>
      </div>
    </>
  );
}

export default FileUpload;
