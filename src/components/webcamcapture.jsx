import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "../style/webcam.css";
import Confetti from 'react-confetti';
import { Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
import { Brightness4, Contrast, FilterVintage } from '@mui/icons-material'; // MUI Icons for filters

const WebcamCapture = () => {
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

  const handleSendEmail = async () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }

    // Logic for sending the email remains the same
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

          <TextField
            fullWidth
            label="Enter your custom text"
            value={customText}
            onChange={handleTextChange}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Enter your email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendEmail} variant="contained" color="success">
            Send to Email
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
