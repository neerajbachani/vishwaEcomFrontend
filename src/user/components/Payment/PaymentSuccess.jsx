import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../redux/Payment/Action";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import { getOrderById } from "../../redux/Order/Action";
import OrderTraker from "../Order/OrderTracker";
import AddressCard from "../Address/AddressCard";
import { Link, useParams } from "react-router-dom";


const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId, jwt };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [orderId, paymentId]);

  const orderData = order.orders?.[orderId] || {};

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>
      </div>
      <OrderTraker activeStep={0} />
      <Grid container className="space-y-5 py-5 pt-20">
        {orderData.orderItems?.map((item) => (
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
                  src={item?.product.image}
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p className="">{item.product.name}</p>
                  
                 
                  <p>₹{item.price}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <AddressCard address={orderData.shippingAddress} />
            </Grid>
          </Grid>
        ))}
      </Grid>
      
      <Link to='/' className=" relative inline-flex items-center justify-center md:px-9 px-2 py-1  overflow-hidden font-medium font-poppins text-indigo-600 transition duration-300 border border-secondary-dark-color ease-out rounded-full shadow-md   group">
<span className="absolute inset-0 flex items-center justify-center w-full h-full text-[#fff] duration-300 -translate-x-full bg-primarycolor group-hover:translate-x-0 ease">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease md:text-2xl text-lg text-primarycolor">Back to home →</span>
<span className="relative invisible">Back to home →</span>
</Link>
     
    </div>
  );
};

export default PaymentSuccess;