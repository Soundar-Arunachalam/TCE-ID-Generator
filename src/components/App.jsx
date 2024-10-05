// App.js
import React, { useState } from "react";
import { Box, Button, Typography, Stepper, Step, StepLabel, ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import StudentForm from "./StudentForm"; 
import FacultyForm from "./FacultyForm"; 
import WebcamCapture from "./webcamcapture";
import Header from "./header"; // Ensure only one header is imported
import IDPreview from "./IDPreview";
const steps = ["User Type", "Details Form", "Capture Image", "Preview ID"];

const App = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({});
  const [capturedImage, setCapturedImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    handleNext();
  };

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    handleNext();
  };

  const handleImageCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    handleNext();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
  
            {/* Add Next and Back buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button variant="contained" onClick={handleBack} sx={{ mr: 2 }}>
                Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleNext} 
                  disabled={!capturedImage}// Disable Next until image is captured
                sx={{ ml: 2 }}
              >
                Next
              </Button>
            </Box>
          </Box>
        );
      case 3:
        console.log("Preview: ", { formData, capturedImage });

      if (!formData || !capturedImage) {
        return <Typography variant="body1" align="center">Missing data, please go back and try again.</Typography>;
      }

      return (
        <Box sx={{ textAlign: "center" }}>
          
            
          <IDPreview data={formData} img={capturedImage}/>
          <Button variant="contained" color="primary" onClick={handleBack} sx={{ mt: 3 }}>
            Back
          </Button>
        </Box>
      );
    default:
      return null;
  }
};

  // Define a custom color palette for light and dark modes
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#d32f2f",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header toggleDarkMode={toggleDarkMode} />
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
    </ThemeProvider>
  );
};

export default App;
