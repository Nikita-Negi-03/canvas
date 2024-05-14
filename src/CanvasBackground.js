import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const CanvasBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const sigCanvasRef = useRef(null);

  useEffect(() => {
    // Load the uploaded image onto the canvas when the backgroundImage state changes
    if (sigCanvasRef.current && backgroundImage) {
      const canvas = sigCanvasRef.current.getCanvas();
      const ctx = canvas.getContext('2d');

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the background image with transparency
      const img = new Image();
      img.onload = () => {
        ctx.globalAlpha = 1; // Reset global alpha (in case it was changed)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image
      };
      img.src = backgroundImage;
    }
  }, [backgroundImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImage(reader.result); // Set the uploaded image as backgroundImage
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  const clearCanvas = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={clearCanvas}>Clear Canvas</button>
      <br />
      <SignatureCanvas
        ref={sigCanvasRef}
        canvasProps={{ width: 400, height: 200, style: { border: '1px solid black' } }}
        backgroundColor="rgba(0, 0, 0, 0)" // Set canvas background color to transparent using rgba
      />
    </div>
  );
};

export default CanvasBackground;
