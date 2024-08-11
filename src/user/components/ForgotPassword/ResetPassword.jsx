import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, api } from "../../../Config/ApiConfig"
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { emailId } = useParams();
  console.log(emailId)
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/resetPassword?email=${emailId}`, {email: emailId, password: confirmPassword });
      // Handle the response (e.g., show a success message, navigate to the login page)
      navigate('/signin')
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;