import React from 'react'
import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../redux/Contact/Action";


export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const { auth } = useSelector((store) => store)

  const userId = auth?.user?._id

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createContact({userId, name, email, phone, message}))
  };

  return (
    <>
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.991818381604!2d73.12744447529306!3d22.31614917967511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc933ad095567%3A0xf08f50e967d73000!2sArtish_Isha&#39;s%20Resin%20Art%20Studio!5e0!3m2!1sen!2sin!4v1714390868858!5m2!1sen!2sin" width="100%" height="450"  allowFullScreen='' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
  
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 600,
          mx: "auto",
          p: 2,
          border: "2px solid  #000000",
          borderRadius: "12px",
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" align="center" mb={2}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            margin="normal"
            required
           
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button
            fullWidth
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#111",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
    </>
  );
}