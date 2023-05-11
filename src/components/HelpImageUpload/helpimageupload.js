import React from 'react'
import { useState, useEffect } from 'react';

function Helpimageupload(props) {

    

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  useEffect(()=>{
    props.GetfileImg(imageUrl, selectedImage)
})

  
    return (
      <>
        <label htmlFor="select-image">
        <img alt='' src='./images/imgIcon.png' style={{ width: '20px' }} /> Attach an image or screenshot (Optional)
        <input
          accept="image/*"
          type="file"
          id="select-image"
          name="select-image"
          multiple
          style={{ display: "none" }}
          onChange={(e) => setSelectedImage(e.target.files[0])}
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