import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
import "./file_upload.css";

import Passport from "../../assets/images/Passport.png";
import UploadCheckmark from "./UploadCheckmark";
import BackArrow from "./BackArrow";
function FileUpload({ data }) {
  // TO DO: fix the bug on auto checkmark on page load
  // TO DO: fix the bug on the uncorrelating index file removal
  const [images, setImages] = useState([true]);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [selected, setSelected] = useState(BackArrow);
  const maxNumber = data.maxUpload;
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
  // console.log(data);

  function imageUpload(onImageUpload, imageList) {
    let ct = images.length;
    let check = ct === maxNumber && imageList.indexOf(data.icon) === -1;
    setUploadStatus(check);
    // console.log(imageList.indexOf(data.icon), check);
    return () => onImageUpload();
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
            <div className="upload__image-wrapper col-md-12">
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
                <h3> {data.name}</h3>
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
      </div>
    </>
  );
}

export default FileUpload;
