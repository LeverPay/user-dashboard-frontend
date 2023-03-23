import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
import "./file_upload.css";

import Passport from "../../assets/images/Passport.png";
import UploadCheckmark from "./UploadCheckmark";
function FileUpload() {
  const [images, setImages] = useState([true]);
  const [uploadStatus, setUploadStatus] = useState(false);
  //   const [selected, setSelected] = useState("Selected");
  const maxNumber = 2;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  useEffect(() => {}, []);

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
                <div
                  className="file-upload-arrow"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  if (uploadStatus) {UploadCheckmark}
                  else{<img src={uploadStatus} alt="arrow" />}
                </div>
              </div>
              &nbsp;
            </div>
          )}
        </ImageUploading>{" "}
        // <UploadCheckmark />
        <BackArrow />
      </div>
    </>
  );
}

export default FileUpload;
