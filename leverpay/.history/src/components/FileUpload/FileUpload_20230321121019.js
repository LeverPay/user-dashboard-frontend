import React from "react";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
function FileUpload() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <>
      <div className="App">
        <ImageUploading
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
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
                // eslint-disable-next-line no-undef
                // {...onImageUpdate(index)}
              >
                Click or Drop here
              </button>
              &nbsp;
              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" />
        </Form.Group> */}
      </div>
    </>
  );
}

export default FileUpload;
