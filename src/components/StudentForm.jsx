import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const StudentForm = ({ handleFormSubmit, handleBack }) => {
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [fatherName, setFatherName] = useState("");

  const handleSubmit = () => {
    const data = {
      regNo,
      name,
      department,
      fatherName,
    };
    handleFormSubmit(data);
  };

  return (
    <Box>
      <TextField
        label="Registration No"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Father's Name"
        value={fatherName}
        onChange={(e) => setFatherName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mr: 2 }}>
        Submit
      </Button>
      <Button variant="outlined" onClick={handleBack}>
        Back
      </Button>
    </Box>
  );
};

export default StudentForm;
