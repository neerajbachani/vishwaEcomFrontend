import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, api } from '../../../Config/ApiConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate OTP
      const otpResponse = await axios.get(`${API_BASE_URL}/api/users/generateOTP?email=${email}`);

      // Send email with OTP
      const mailResponse = await axios.post(`${API_BASE_URL}/api/registerMail`, {
        username: email,
        userEmail: email,
        text: `Your OTP is ${otpResponse.data.code}. Please verify your OTP to reset your password.`,
        subject: 'Reset Password OTP',
      });

      // Navigate to the OTPVerification component with the email as a URL parameter
      navigate(`/otpVerification/email/${email}`);

     
      console.log("otp sent")
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send OTP
          </Button>
        </Box>
      </Box>
   
    </div>
  );
};

export default ForgotPassword;