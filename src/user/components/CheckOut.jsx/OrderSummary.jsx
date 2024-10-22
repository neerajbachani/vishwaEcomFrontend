import React, { useState, useEffect } from "react";
import { Button, Paper, Typography, Divider, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from 'react-top-loading-bar';
import CartItem from "../Cart/CartItem";
import AddressCard from "../Address/AddressCard";
import { getOrderById } from "../../redux/Order/Action";
import { createPayment } from "../../redux/Payment/Action";

const OrderSummary = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { order } = useSelector(state => state);

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const fetchOrder = async () => {
      setProgress(50);
      try {
        await dispatch(getOrderById(orderId));
        setProgress(100);
      } catch (error) {
        console.error("Error fetching order:", error);
        setProgress(0);
      }
    };
    fetchOrder();
  }, [orderId, dispatch]);

  const handleCreatePayment = async () => {
    setProgress(50);
    try {
      await dispatch(createPayment(order.order?._id));
      setProgress(100);
      // Navigate to payment confirmation page or show success message
    } catch (error) {
      console.error("Error creating payment:", error);
      setProgress(0);
      // Show error message to user
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <LoadingBar
        color="#e63946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>
        Order Summary
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 2 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Delivery Address
            </Typography>
            <AddressCard address={order.order?.shippingAddress} />
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Order Items
            </Typography>
            {order.order?.orderItems.map((item) => (
              <CartItem key={item._id} item={item} showButton={false} />
            ))}
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Price Details
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontFamily: 'Poppins' }}>Price ({order.order?.totalItem} items)</Typography>
              <Typography sx={{ fontFamily: 'Poppins' }}>₹{order.order?.totalPrice}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontFamily: 'Poppins' }}>Discount</Typography>
              <Typography sx={{ fontFamily: 'Poppins', color: 'green' }}>-₹{order.order?.discount}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontFamily: 'Poppins' }}>Delivery Charges</Typography>
              <Typography sx={{ fontFamily: 'Poppins', color: 'green' }}>{order.order?.deliveryCharge}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>Total Amount</Typography>
              <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, color: 'green' }}>
                ₹{order.order?.totalDiscountedPrice}
              </Typography>
            </Box>
            <Button
              onClick={handleCreatePayment}
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#e63946",
                fontFamily: "Poppins",
                fontSize: "1rem",
                '&:hover': {
                  backgroundColor: "#d62828",
                },
              }}
            >
              Proceed to Payment
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSummary;