import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
import "./file_upload.css";

import Passport from "../../assets/images/Passport.png";
import UploadCheckmark from "./UploadCheckmark";
import BackArrow from "./BackArrow";
function FileUpload({ data }) {
  const [images, setImages] = useState([true]);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [selected, setSelected] = useState(BackArrow);
  const maxNumber = data.maxUpload;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    console.log(imageList);
    let ctx = imageList.length;
    if (ctx === 0) {
      imageList[0] = data.icon;
      setImages(imageList);
    } else {
      // eslint-disable-next-line eqeqeq
      if (imageList[0] == data.icon) {
        imageList.splice(0, 1);
      }
    }
  };
  console.log(data);

  function imageUpload(onImageUpload) {
    let ct = images.length;
    setUploadStatus(ct == maxNumber);
    return onImageUpload;
  }
  useEffect(() => {
    setSelected(BackArrow);
    console.log(images);
  }, []);
  useEffect(() => {
    setSelected(uploadStatus ? UploadCheckmark : BackArrow);
  }, [uploadStatus]);

  return (
    <>
      <div className="file-upload-container col-md-12">
        <ImageUploading
          multiple
          value={images}
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
            <div className="upload__image-wrapper col-md-6">
              <div
                style={isDragging ? { color: "red" } : null}
                className="file-upload-div"
                onClick={imageUpload(onImageUpload)}
                {...dragProps}
                // eslint-disable-next-line no-undef
                // {...onImageUpdate(index)}
              >
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={image.data_url ? image.data_url : data.icon}
                      alt="preview"
                      onClick={onImageRemove(index)}
                    />
                  </div>
                ))}{" "}
                <h3> {data.name}</h3>
                <div
                  className="file-upload-arrow"
                  onClick={imageUpload(onImageUpload)}
                  {...dragProps}
                >
                  {selected}
                </div>
              </div>
              &nbsp;
            </div>
          )}
        </ImageUploading>{" "}
      </div>
    </>
  );
}

export default FileUpload;
