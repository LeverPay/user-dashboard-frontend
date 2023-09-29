import React from 'react'
import { useState, useEffect } from 'react';

function Helpimageupload(props) {

    

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      setImage(selectedImage)
    }
  }, [selectedImage]);
  function handleImg(e){
    setSelectedImage(e.target.files[0])
    props.GetfileImg(e.target.files[0])
  }

  
    return (
      <>
        <label htmlFor="select-image" style={{border: 'none' }} >
        <img alt='' src='./images/imgIcon.png' style={{ width: '20px', border: 'none' }} /> Attach an image or screenshot {props.optional ? '(Optional)' : ''}
        <input
          accept="image/*"
          type="file"
          id="select-image"
          name="select-image"
          multiple
          style={{ display: "none" }}
          onChange={handleImg}
        />
        </label>
        {imageUrl && selectedImage && (
          <div>
            <div>Image Preview:</div>
            <img src={imageUrl} alt={selectedImage.name} height="100px" width='100px' />
          </div>
        )}
      </>
    );
}

export default Helpimageupload