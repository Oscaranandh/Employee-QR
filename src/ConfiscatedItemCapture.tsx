import React, { useState, useRef, useEffect } from 'react';

function ConfiscatedItemCapture() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [capturedImages, setCapturedImages] = useState<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startWebcam(); // Start the webcam as soon as the component is mounted
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 320 }, // Set desired width
          height: { ideal: 240 }, // Set desired height
        },
      });
      setWebcamStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setWebcamStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const captureImage = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const capturedImagesArray = await Promise.all(
        selectedItems.map(async (item) => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || 320; // Adjust as needed
          canvas.height = video.videoHeight || 240; // Adjust as needed
          const ctx = canvas.getContext('2d');
  
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            return new Promise<Blob | null>((resolve) =>
              canvas.toBlob((blob) => resolve(blob), 'image/png')
            );
          }
          return null;
        })
      );
  
      const validImages = capturedImagesArray.filter((image) => image !== null);

    //setCapturedImages((prevImages) => [...prevImages, ...validImages]);
  }
};
  const toggleItemSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    }
  };

  const confiscatedItems = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div>
      <div>
        {selectedItems.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={selectedItems.includes(item)}
              onChange={() => toggleItemSelection(item)}
            />
            {item}
          </label>
        ))}
      </div>
      <div>
        {webcamStream && (
          <div>
            <video ref={videoRef} autoPlay muted={true} />
            <button onClick={captureImage} disabled={selectedItems.length === 0}>
              Capture Image
            </button>
          </div>
        )}
      </div>
      {capturedImages.length > 0 && (
        <div>
          {capturedImages.map((image, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Captured Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
          }

export default ConfiscatedItemCapture;
