import { useRef } from "react";
import { useFrappeCreateDoc, useFrappeUpdateDoc } from "frappe-react-sdk";
// import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Webcam from "react-webcam";
import { useContext } from "react";
import { locateContext } from "./App";
const videoConstraints = {
  width: 220,
  height: 200,
  borderRadius: "50px",
  facingMode: "user",
};
export const WebcamCapture = () => {
  const { userFormImage, setUserFormImage,formDataEmployee, imageCaptured,setImageCaptured}: any = useContext(locateContext);
  console.log(userFormImage.image);
  const webcamRef = useRef<Webcam>(null);
  // const navigate = useNavigate();
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc: any = webcamRef.current.getScreenshot();
      setUserFormImage({ ...userFormImage, image: imageSrc });
      setImageCaptured(1);
    }
  }, []);


  return (
    <div>
    <div className="webcam-container">
      <div
        className="webcam-img"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          width: "350px",
          height: "350px",
          marginTop:"130px",
          marginLeft:"20px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        {userFormImage.image === null ? (
          <Webcam
            audio={false}
            height={350}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img
            style={{
              width: "350",
              height: "350",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              gap: "10px",
            }}
            src={userFormImage.image}
            alt="Captured"
          />
        )}
      </div>
      <div>
        {userFormImage.image !== null ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setUserFormImage({ ...userFormImage, image: null });
              setImageCaptured(0);
            }}
            className="webcam-btn"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "140px",
              marginTop: "30px",
              backgroundColor: "#2D5831",borderRadius: "5px",
              padding:"8px 15px",
              color:"white",
              borderStyle: "solid", // You can set the border style as needed (e.g., dashed, solid, etc.)
              borderWidth: "1px",
            }}
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "160px",
              marginTop: "30px",
              backgroundColor: "#2D5831",borderRadius: "5px",
              padding:"8px 15px",
              color:"white",
              borderStyle: "solid", // You can set the border style as needed (e.g., dashed, solid, etc.)
              borderWidth: "1px",
            }}
          >
            Capture
          </button>
        )}
        {/* <button
          onClick={() => {
            navigate("/ThankyouPage");
          }}
          className="webcam-btn"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "720px",
          }}
        >
          Next
        </button> */}
      </div>
    </div>
   </div>

  );
};