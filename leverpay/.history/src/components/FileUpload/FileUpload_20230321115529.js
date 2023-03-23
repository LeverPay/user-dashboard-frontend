import React from "react";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
function FileUpload() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
    </>
  );
}

export default FileUpload;
