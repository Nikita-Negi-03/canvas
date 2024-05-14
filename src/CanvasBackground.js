import {Box, Button } from '@mui/material';
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

  const generateImage = async() => {
    console.log(sigCanvasRef)
        const canvas = sigCanvasRef.current.getCanvas();
        if (canvas) {
            const imageURL = canvas.toDataURL('image/png');
            const response = await fetch(imageURL);
            const blob = await response.blob();
            // Create a temporary URL to the blob
            const url = window.URL.createObjectURL(blob);
            // Create a link element
            const link = document.createElement('a');
            link.href = url;
            link.download = "test" ; // Specify the download filename
            document.body.appendChild(link);
      
            // Trigger the download
            link.click();
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }

          
  }

  const clearCanvas = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
  };

  return (
    <Box>
      <SignatureCanvas
        ref={sigCanvasRef}
        canvasProps={{ width: 800 , height: 650, style: { border: '2px solid black', marginTop: 20 } }}
        backgroundColor="rgba(0, 0, 0, 0)" // Set canvas background color to transparent using rgba
      />
      <br />
      <Button variant="contained" className='buttons' >
        <input type="file" accept="image/*" onChange={handleImageUpload} /> Select File
      </Button>
      <Button variant="contained" onClick={clearCanvas}  className='buttons' >Clear Canvas</Button>
      <Button onClick={generateImage} variant='contained' className='buttons' >Download</Button>
    </Box>
  );
};

export default CanvasBackground;
