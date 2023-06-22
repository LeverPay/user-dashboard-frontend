import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./webcamera.css";
import CamIcon from "../../../assets/images/camera.png";
import Reload from "../../../assets/images/reload.png";

function Webcamera({ tg, captImg }) {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);
  function collectedImg() {
    console.log(img);
    if (img !== null) {
      captImg(img);
    }
  }
  return (
    <div className="camera-container">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture} className="snap-btn">
            <img className=" camera-img" src={CamIcon} alt="Scholar" width="" />
          </button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" className="cam" />
          <div className="flexy flexyM offset-md-3">
            {" "}
            <button onClick={() => setImg(null)} className="snap-btn">
              <img src={Reload} alt="screenshot" className="" width="70%" />
            </button>
            <button
              onClick={collectedImg}
              className="set-snap-btn btn btn-success"
            >
              Set
            </button>
            <button onClick={tg} className="close-snap-btn btn btn-danger">
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Webcamera;
