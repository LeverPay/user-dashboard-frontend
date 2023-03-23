import React from "react";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
function FileUpload() {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
    </>
  );
}

export default FileUpload;
