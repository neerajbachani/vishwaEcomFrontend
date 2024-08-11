

import React from "react";
import CartItem from "./CartItem";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCart } from "../../redux/Cart/Action";
import AuthenticatedComponent from "../AuthenticatedComponent";
import LoadingBar from 'react-top-loading-bar';

const Cart = () => {
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const {cart}=useSelector((store)=>store);
  console.log("cart ",cart)

useEffect(() => {
  setProgress(50); // Set loading progress to 50%
  dispatch(getCart(jwt))
    .then(() => {
      setProgress(100); // Set loading progress to 100%
      setTimeout(() => {
        setProgress(0); // Reset loading progress after a short delay
      }, 500);
    })
    .catch(() => {
      setProgress(0); // Reset loading progress if there's an error
    });
}, [jwt, cart.addedCartItems, cart.updateCartItem, cart.deleteCartItem]);
  return (
    <div className="">
      <LoadingBar
      color="#e63946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    
      {cart.cartItems?.length>0 && <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="lg:col-span-2 lg:px-5 bg-white">
        <div className=" space-y-3">
          {cart.cartItems.map((item) => (
            <><h2 className="text-2xl font-bold mb-4 mt-3 font-poppins">Your Cart</h2>
              <CartItem item={item} showButton={true}/>
            </>
          ))}
        </div>
      </div>
      <div className="px-5 sticky top-0  mt-5 lg:mt-5 ">
        <div className="border p-5 bg-white shadow-lg rounded-md">
          <p className="font-bold opacity-60 pb-4 font-poppins">PRICE DETAILS</p>
          <hr />

          <div className="space-y-3 font-semibold">
            <div className="flex justify-between pt-3 text-black font-poppins text-lg ">
              <span>Price ({cart.cart?.totalItem} item)</span>
              <span>₹{cart.cart?.totalPrice}</span>
            </div>
            <div className="flex justify-between font-poppins text-lg">
              <span>Discount</span>
              <span className="text-green-700 font-poppins">-₹{cart.cart?.discount}</span>
            </div>
            <div className="flex justify-between font-poppins text-lg">
              <span>Delivery Charges</span>
              <span className="text-green-700 font-poppins">Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-xl font-poppins ">
              <span>Total Amount</span>
              <span className="text-green-700 font-poppins">₹{cart.cart?.totalDiscountedPrice}</span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/checkout?step=2")}
            variant="contained"
            type="submit"
            sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" , backgroundColor: "#e63946" , fontFamily: "poppins", fontSize: "1.2rem" }}
          >
            Check Out
          </Button>
        </div>
      </div>
      </div>}
      
    </div>
  );
};

export default AuthenticatedComponent(Cart)