import React from 'react';
import { Box, Typography, Avatar, Divider } from '@mui/material';
import QRCode from 'qrcode.react';

const IDPreview = ({ data }) => {
  const { regNo, name, degree, department, rollNo, validity, image } = data;

  return (
    <Box
      sx={{
        width: 300,
        height: 450,
        border: '2px solid black',
        borderRadius: '10px',
        textAlign: 'center',
        padding: 2,
        backgroundColor: '#fff',
        boxShadow: 3,
      }}
    >
      {/* Header with college name */}
      <Box sx={{ backgroundColor: '#1976d2', padding: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}
        >
          Thiagarajar College of Engineering
        </Typography>
        <Typography variant="caption" sx={{ color: 'white' }}>
          (A Govt. Aided Autonomous Institution)
        </Typography>
      </Box>

      {/* Profile Image */}
      <Avatar
        src={image}
        alt={name}
        sx={{ width: 80, height: 80, margin: '10px auto' }}
      />

      {/* Personal Information */}
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography variant="body2">Reg No: {regNo}</Typography>
      <Typography variant="body2">Roll No: {rollNo}</Typography>
      <Typography variant="body2">{degree}</Typography>
      <Typography variant="body2">{department}</Typography>

      <Divider sx={{ my: 1 }} />

      {/* QR Code */}
      <QRCode value={`${regNo}-${degree}-${department}`} size={80} />

      {/* Validity */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption">Valid Upto: {validity}</Typography>
      </Box>

      {/* Signature and Principal */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Signature of Principal
        </Typography>
        <Divider sx={{ width: '70%', mx: 'auto', my: 1 }} />
      </Box>
    </Box>
  );
};

export default IDPreview;
