import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, api } from '../../../Config/ApiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';


const OTPVerification = () => {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
  const { emailId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/verifyOTP?email=${emailId}&code=${otp}`);
      navigate(`/resetPassword/email/${emailId}`);
      console.log("otp verified")
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          OTP Verification
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoFocus
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify OTP
          </Button>
        </Box>
      </Box>
     
    </div>
  );
};

export default OTPVerification;