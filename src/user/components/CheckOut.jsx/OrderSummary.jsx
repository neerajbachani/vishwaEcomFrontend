import React from "react";
import { Badge, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../redux/Order/Action";
import AddressCard from "../Address/AddressCard";
import { createPayment } from "../../redux/Payment/Action";
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

const OrderSummary = () => {
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
const orderId = searchParams.get("order_id");
const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {order}=useSelector(state=>state)

console.log("orderId ", order)

useEffect(() => {
  setProgress(50); // Set loading progress to 50%
  dispatch(getOrderById(orderId))
    .then(() => {
      setProgress(100); // Set loading progress to 100%
      setTimeout(() => {
        setProgress(0); // Reset loading progress after a short delay
      }, 500);
    })
    .catch(() => {
      setProgress(0); // Reset loading progress if there's an error
    });
}, [orderId]);

const handleCreatePayment = () => {
  setProgress(50); // Set loading progress to 50%
  dispatch(createPayment(order.order?._id))
    .then(() => {
      setProgress(100); // Set loading progress to 100%
      setTimeout(() => {
        setProgress(0); // Reset loading progress after a short delay
      }, 500);
    })
    .catch(() => {
      setProgress(0); // Reset loading progress if there's an error
    });
};
  
console.log(order.order?.shippingAddress)

  return (
    <div className="space-y-5">
       <LoadingBar
      color="#e63946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
        <div className="p-5 shadow-lg rounded-md border ">
            <AddressCard address={order.order?.shippingAddress}/>
        </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className=" space-y-3">
            {order.order?.orderItems.map((item) => (
              <div className=" relative" >
                <CartItem item={item} showButton={false}  />

              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4 font-poppins text-lg">PRICE DETAILS</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black text-lg font-poppins ">
                <span>Price ({order.order?.totalItem} item)</span>
                <span>₹{order.order?.totalPrice}</span>
              </div>
              <div className="flex justify-between text-lg font-poppins">
                <span>Discount</span>
                <span className="text-green-700">-₹{order.order?.discount}</span>
              </div>
              <div className="flex justify-between text-lg font-poppins">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg font-poppins">
                <span>Total Amount</span>
                <span className="text-green-700">₹{order.order?.totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" , backgroundColor: "#e63946" , fontFamily: "poppins", fontSize: "1.2rem" }}
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
