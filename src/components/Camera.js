import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FiCamera } from "react-icons/fi";
import { FcRefresh } from "react-icons/fc";

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: "enviroment",
};

const Camera = (props) => {
  const [isShown, setIsShown] = useState(true);
  function handleisShown() {
    setIsShown(!isShown);
  }
  function refresh() {
    setUrl(null);
    props.setCameraUrl(null);
    handleisShown();
  }
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    props.setCameraUrl(imageSrc);
    handleisShown();
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };
  console.log(url);
  return (
    <div className="text-center">
      {isShown && (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
            mirrored={true}
            className="rounded-circle"
          />
          <div className="text-center">
            <button
              className="btn-lg btn-outline-dark mt-1"
              onClick={capturePhoto}
            >
              <FiCamera />
            </button>
          </div>
        </>
      )}
      {url && (
        <div className="d-flex justify-content-center">
          <p className="pr-2 font-italic h6 font-weight-light">Preview</p>
          <img src={url} alt="screenshot" className="p-1 border-dashed" />
        </div>
      )}

      {!isShown && (
        <button className="btn-lg btn-outline-info mt-2 ml-5" onClick={refresh}>
          <FcRefresh />
        </button>
      )}
    </div>
  );
};

export default Camera;
