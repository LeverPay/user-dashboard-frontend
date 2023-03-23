import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
import "./file_upload.css";
import BackArrow from "../../assets/images/Back.png";
import Passport from "../../assets/images/Passport.png";
function FileUpload() {
  const [images, setImages] = useState([true]);
  const [uploadStatus, setUploadStatus] = useState(
    "../../assets/images/Back.png"
  );
  //   const [selected, setSelected] = useState("Selected");
  const maxNumber = 2;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  //   useEffect(() => {
  //     function Selected() {
  //       setSelected("Selected Successfully");
  //     }
  //     console.log("file uploaded successfully");
  //   }, [images]);

  return (
    <>
      <div className="file-upload-container col-md-12">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg", "doc", "png", "svg", "jpeg", "pdf"]}
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
            <div className="upload__image-wrapper col-md-6">
              <div
                style={isDragging ? { color: "red" } : null}
                className="file-upload-div"
                onClick={onImageUpload}
                {...dragProps}
                // eslint-disable-next-line no-undef
                // {...onImageUpdate(index)}
              >
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={image.data_url ? image.data_url : Passport}
                      alt="preview"
                      onClick={onImageRemoveAll}
                    />
                  </div>
                ))}{" "}
                <h3> Passport</h3>
                <div className="file-upload-arrow">
                  <img
                    src={uploadStatus}
                    alt="arrow"
                    onClick={onImageUpload}
                    {...dragProps}
                  />
                </div>
              </div>
              &nbsp;
            </div>
          )}
        </ImageUploading>
        <div class="wrapper">
          {" "}
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            {" "}
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />{" "}
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default FileUpload;
