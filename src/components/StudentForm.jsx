import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";

const StudentForm = ({ handleFormSubmit, handleBack }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleFormSubmit(data);
  };

  // Options for batches (4-year intervals)
  const currentYear = dayjs().year();
  const batchOptions = [];
  for (let i = 0; i < 10; i++) {
    const startYear = currentYear + i;
    const endYear = startYear + 4;
    batchOptions.push(`${startYear}-${endYear}`);
  }

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Registration Number */}
      <Controller
        name="regNo"
        control={control}
        defaultValue=""
        rules={{ required: "Registration Number is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Registration No"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.regNo}
            helperText={errors.regNo?.message}
          />
        )}
      />

      {/* Roll Number */}
      <Controller
        name="rollNo"
        control={control}
        defaultValue=""
        rules={{ required: "Roll Number is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Roll No"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.rollNo}
            helperText={errors.rollNo?.message}
          />
        )}
      />

      {/* Name */}
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      {/* Department */}
      <Controller
        name="department"
        control={control}
        defaultValue=""
        rules={{ required: "Department is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Department"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.department}
            helperText={errors.department?.message}
          />
        )}
      />

      {/* Degree */}
      <Controller
        name="degree"
        control={control}
        defaultValue=""
        rules={{ required: "Degree is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Degree"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.degree}
            helperText={errors.degree?.message}
          />
        )}
      />

      {/* Batch */}
      <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.batch}>
        <InputLabel>Batch</InputLabel>
        <Controller
          name="batch"
          control={control}
          defaultValue=""
          rules={{ required: "Batch is required" }}
          render={({ field }) => (
            <Select {...field} label="Batch">
              {batchOptions.map((batch) => (
                <MenuItem key={batch} value={batch}>
                  {batch}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.batch?.message}</FormHelperText>
      </FormControl>

      {/* Blood Group */}
      <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.bloodGroup}>
        <InputLabel>Blood Group</InputLabel>
        <Controller
          name="bloodGroup"
          control={control}
          defaultValue=""
          rules={{ required: "Blood Group is required" }}
          render={({ field }) => (
            <Select {...field} label="Blood Group">
              {bloodGroups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.bloodGroup?.message}</FormHelperText>
      </FormControl>

      {/* Date of Birth */}
      <Controller
        name="dob"
        control={control}
        defaultValue=""
        rules={{ required: "Date of Birth is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Date of Birth"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />
        )}
      />

      {/* Address */}
      <Controller
        name="address"
        control={control}
        defaultValue=""
        rules={{ required: "Address is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        )}
      />

      {/* Contact Number */}
      <Controller
        name="contactNo"
        control={control}
        defaultValue=""
        rules={{
          required: "Contact Number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Invalid phone number",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Contact No"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.contactNo}
            helperText={errors.contactNo?.message}
          />
        )}
      />

      {/* Parent's Contact Number */}
      <Controller
        name="parentContactNo"
        control={control}
        defaultValue=""
        rules={{
          required: "Parent's Contact Number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Invalid phone number",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Parent's Contact No"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.parentContactNo}
            helperText={errors.parentContactNo?.message}
          />
        )}
      />

      {/* Father's Name */}
      <Controller
        name="fatherName"
        control={control}
        defaultValue=""
        rules={{ required: "Father's Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Father's Name"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.fatherName}
            helperText={errors.fatherName?.message}
          />
        )}
      />

      {/* Buttons */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default StudentForm;
