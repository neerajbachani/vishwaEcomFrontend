

import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  console.log("items ", item);
  console.log(order);

  // Helper function to format the date and time in the Indian format
  const formatIndianDateTime = (dateTimeString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString("en-IN", options);
  };

  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border ">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div
            onClick={() => navigate(`/account/order/${order?._id}`)}
            className="flex cursor-pointer"
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product?.image}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product?.name}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>Quantity: {item?.quantity}</span>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>₹{item?.price}</p>
        </Grid>
        <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
            {order?.orderStatus === "DELIVERED" ? (
              <>
              <p className=" text-[grey]">Order Created On</p>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-[green] p-0 mr-2 text-sm"
                />
                <span>{formatIndianDateTime(order.createdAt)}</span>
              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span className=" text-lg font-poppins">
                  Expected Delivery in 10-15 Days
                </span>
              </>
            )}
          </p>
          {item.orderStatus === "DELIVERED" && (
            <div
              onClick={() => navigate(`/account/rate/${id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon
                sx={{ fontSize: "2rem" }}
                className="px-2 text-5xl"
              />
              {/* <span>Rate & Review Product</span> */}
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;