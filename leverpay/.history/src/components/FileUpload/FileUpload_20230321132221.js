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
            <div className="upload__image-wrapper col-md-5">
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
                      src={image.data_url}
                      alt="preview"
                      onClick={onImageRemoveAll}
                    />
                  </div>
                ))}{" "}
                Passport
              </div>
              &nbsp;
            </div>
          )}
        </ImageUploading>
      </div>
    </>
  );
}

export default FileUpload;
