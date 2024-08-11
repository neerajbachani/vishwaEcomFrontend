

import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../redux/Order/Action";

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }));
  }, [jwt]);

  const filteredOrders = order.orders && Array.isArray(order.orders)
    ? order.orders.filter((order) => order.paymentDetails.paymentStatus === "COMPLETED")
    : [];

  console.log("users orders ", order.orders);

  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item sx={{width: "100%"}}>
          <Box className="space-y-5 ">
            {filteredOrders.length > 0 &&
              filteredOrders.map((order, index) => {
                return order.orderItems.map((item, itemIndex) => (
                  <OrderCard key={`${index}-${itemIndex}`} item={item} order={order} />
                ));
              })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;