import React from "react";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
import "./file_upload.css";
function FileUpload() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 2;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <>
      <div>10</div>
      <div>20</div>
      <div>30</div>
      <div>40</div>

      <div className="file-upload-container col-md-2">
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
            <div className="upload__image-wrapper ">
              <button
                style={isDragging ? { color: "red" } : null}
                className="file-upload-button"
                onClick={onImageUpload}
                {...dragProps}
                // eslint-disable-next-line no-undef
                // {...onImageUpdate(index)}
              >
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={image.data_url}
                      alt="preview"
                      onClick={onImageRemoveAll}
                    />
                  </div>
                ))}{" "}
                Passport
              </button>
              &nbsp;
            </div>
          )}
        </ImageUploading>
      </div>
    </>
  );
}

export default FileUpload;
