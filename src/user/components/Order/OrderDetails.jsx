

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import OrderTraker from "./OrderTracker";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import AddressCard from "../Address/AddressCard";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../redux/Order/Action";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  const orderData = order.orders ? order.orders[orderId] : null;

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" px-2 lg:px-36 space-y-7 ">
      <h1 className=" text-secondary-dark-color text-3xl font-poppins">Your Order Summary</h1>
      <Grid container className="p-3 shadow-lg">
        <Grid xs={12}>
          <p className="font-bold text-lg py-2 font-poppins">Delivery Address</p>
        </Grid>
        <Grid item xs={6}>
          <AddressCard address={orderData.shippingAddress} />
        </Grid>
      </Grid>
      <Box className="p-5 shadow-lg border rounded-md">
        <Grid container sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Grid item xs={9}>
            <OrderTraker
              activeStep={
                orderData.orderStatus === "DELIVERED"
                  ? 5
                  : orderData.orderStatus === "CONFIRMED"
                  ? 2
                  : orderData.orderStatus === "SHIPPED"
                  ? 3
                  : 1
              }
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Box>
      <Grid container className="space-y-5">
        {orderData.orderItems.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              {" "}
              <div className="flex items-center ">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.product.image}
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p className="">{item.product.name}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Quantity: {item.quantity}</span>
                  </p>
                  
                  <p>₹{item.discountedPrice}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              {" "}
              <Box
                sx={{ color: deepPurple[500] }}
                onClick={() => navigate(`/account/rate/${item.product._id}`)}
                className="flex items-center cursor-pointer"
              >
                <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;