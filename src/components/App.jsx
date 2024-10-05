import React, { useState } from "react";
import { Box, Button, Typography, Stepper, Step, StepLabel } from "@mui/material";
import StudentForm from "./StudentForm"; // Import your student form component
import FacultyForm from "./FacultyForm"; // Import your faculty form component
import WebcamCapture from "./webcamcapture";

const steps = ["User Type", "Details Form", "Capture Image", "Preview ID"];

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({});
  const [capturedImage, setCapturedImage] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    handleNext(); // Move to the next step after form submission
  };

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    handleNext(); // Move to the next step after selecting user type
  };

  const handleImageCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    handleNext(); // Move to the preview step after capturing image
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" align="center">
              Are you a Student or Faculty?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button variant="contained" onClick={() => handleUserTypeSelection("student")} sx={{ mr: 2 }}>
                Student
              </Button>
              <Button variant="contained" onClick={() => handleUserTypeSelection("faculty")}>
                Faculty
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return userType === "student" ? (
          <StudentForm handleFormSubmit={handleFormSubmit} handleBack={handleBack} />
        ) : (
          <FacultyForm handleFormSubmit={handleFormSubmit} handleBack={handleBack} />
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Capture your Image
            </Typography>
            <WebcamCapture onCapture={handleImageCapture} />
            <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
              Back
            </Button>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" align="center">
              Preview ID Card
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  width: "300px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={capturedImage}
                  alt="Captured"
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%", marginBottom: "16px" }}
                />
                <Typography variant="h6">{formData.name || formData.fatherName}</Typography>
                <Typography variant="body1">RegNo: {formData.regNo || formData.facultyId}</Typography>
                <Typography variant="body1">Department: {formData.department}</Typography>
              </Box>
            </Box>
            <Button variant="contained" color="primary" onClick={handleBack} sx={{ mt: 3 }}>
              Back
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 5 }}>
        {renderStepContent(activeStep)}
      </Box>
    </Box>
  );
};

export default App;
