import * as React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/Order/Action";
// import userEvent from "@testing-library/user-event";
import AddressCard from "../Address/AddressCard";
import { useState } from "react";
import LoadingBar from 'react-top-loading-bar';

export default function AddDeliveryAddressForm({ handleNext }) {

  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [selectedAddress, setSelectedAdress] = useState(null);

  // console.log("auth", auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      pincode: data.get("pincode"),
      mobile: data.get("phoneNumber"),
    };
  
    setProgress(50); // Set loading progress to 50%
    dispatch(createOrder({ address, navigate }))
      .then(() => {
        setProgress(100); // Set loading progress to 100%
        setTimeout(() => {
          setProgress(0); // Reset loading progress after a short delay
          handleNext(); // Call handleNext after loading is finished
        }, 500);
      })
      .catch(() => {
        setProgress(0); // Reset loading progress if there's an error
      });
  };

  const handleCreateOrder = (item) => {
    setProgress(50); // Set loading progress to 50%
    dispatch(createOrder({ address: item, navigate }))
      .then(() => {
        setProgress(100); // Set loading progress to 100%
        setTimeout(() => {
          setProgress(0); // Reset loading progress after a short delay
          handleNext(); // Call handleNext after loading is finished
        }, 500);
      })
      .catch(() => {
        setProgress(0); // Reset loading progress if there's an error
      });
  };

  return (
    <Grid container spacing={4}>
      <LoadingBar
      color="#e63946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll ">
          {auth.user?.address.map((item) => (
            <div
              onClick={() => setSelectedAdress(item)}
              className="p-5 py-7 border-b cursor-pointer"
            >
              {" "}
              <AddressCard address={item} />
              {selectedAddress?.id === item.id && (
                <Button
                sx={{ padding: ".8rem 2rem", marginTop: "2rem", backgroundColor: "#e63946" , fontFamily: "poppins", fontSize: "0.85rem" }}
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={()=>handleCreateOrder(item)}
                >
                  Deliver Here
                </Button>
              )}
            </div>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="pincode"
                  name="pincode"
                  label="pincode / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".8rem 2rem", backgroundColor: "#e63946" , fontFamily: "poppins", fontSize: "1rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Deliver Here 
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
