import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "../style/webcam.css";
import Confetti from 'react-confetti';
import image from '../assets/frame.png';
import { Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
import { Brightness4, Contrast, FilterVintage } from '@mui/icons-material'; // MUI Icons for filters
const frameImage = image;
const WebcamCapture = ({onCapture}) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [customText, setCustomText] = useState("");
  const [email, setEmail] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(""); // State to manage selected filter

  // Capture image from webcam
  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsPopupVisible(true);
  }, [webcamRef]);

  // Change filter
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleTextChange = (e) => {
    setCustomText(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };
  const handleSendEmail = async () => {
    // if (!email) {
    //   alert("Please enter an email.");
    //   return;
    // }
    try {
      const [capturedImg, frameImg] = await Promise.all([
        loadImage(capturedImage),
        loadImage(frameImage),
      ]);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = capturedImg.width;
      canvas.height = capturedImg.height;

      //ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(capturedImg,0,0, canvas.width-100 , canvas.height-100);

      ctx.font = "20px Celandine";
      ctx.fillStyle = "black";
      ctx.fillText(customText, 20, canvas.height - 20);

      const finalImage = canvas.toDataURL("image/png");

      setFinalImage(finalImage);

      

      // Show confetti after success
      setShowConfetti(true);
      
      // Show notification
      setNotification("success");
onCapture(finalImage);
      // Hide confetti and notification after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setNotification("Failed to send email. Try again later.");
      setTimeout(() => setNotification(null), 5000);
    }

    setCustomText("");
    setEmail("");
    setCapturedImage(null);
    setFinalImage(null);
    setIsPopupVisible(false); 
  

    
  };

  return (
    <Box className="webcam-container" sx={{ padding: 2 }}>
      {showConfetti && <Confetti />}
      {notification && (
        <Typography sx={{ backgroundColor: "green", color: "white", padding: 2, textAlign: "center", borderRadius: 2 }}>
          {notification}
        </Typography>
      )}

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-feed"
      />
      <Button variant="contained" color="primary" onClick={captureImage} sx={{ mt: 2 }}>
        Capture Photo
      </Button>

      {/* Image Preview in Dialog */}
      <Dialog open={isPopupVisible} onClose={() => setIsPopupVisible(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Preview Image</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {capturedImage ? (
            <Box
              component="img"
              src={capturedImage}
              alt="Captured"
              sx={{
                width: "100%",
                height: "auto",
                filter: selectedFilter,  // Apply selected filter
              }}
            />
          ) : (
            <Typography>Processing the image...</Typography>
          )}

          {/* Filter Icons */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <IconButton onClick={() => handleFilterChange("brightness(1.2)")}>
              <Brightness4 />
            </IconButton>
            <IconButton onClick={() => handleFilterChange("contrast(1.5)")}>
              <Contrast />
            </IconButton>
            <IconButton onClick={() => handleFilterChange("sepia(1)")}>
              <FilterVintage />
            </IconButton>
          </Box>

          
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendEmail} variant="contained" color="success">
            Save
          </Button>
          <Button onClick={() => setIsPopupVisible(false)} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WebcamCapture;
