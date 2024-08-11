import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Collapse,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingBar from 'react-top-loading-bar';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../user/redux/Admin/Order/Action";
import AddressCard from "../../user/components/Address/AddressCard";
import { getOrderById } from "../../user/redux/Order/Action";
import { getUser } from "../../user/redux/Auth/Action";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminOrder } = useSelector((store) => store);
  const { order } = useSelector((store) => store);
 
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDetailsLoading, setIsUserDetailsLoading] = useState(true);
const [isShippingAddressLoading, setIsShippingAddressLoading] = useState(true);

  const [anchorElArray, setAnchorElArray] = useState([]);
  const [openDetails, setOpenDetails] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  }

  const filteredOrders = adminOrder.orders?.filter((order) => {
    const paymentCompleted = order.paymentDetails?.paymentStatus === "COMPLETED";
  
    if (formData.status === "") {
      return paymentCompleted; // Show orders with payment status "COMPLETED" if no shipping status is selected
    } else {
      return paymentCompleted && order.shippingStatus === formData.status;
    }
  }).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setProgress(30);
      dispatch(getOrders());
  
      const completedOrders = adminOrder.orders?.filter(
        (order) => order.paymentDetails?.paymentStatus === "COMPLETED"
      );
  
      if (completedOrders) {
        setProgress(60);
        // setIsOrderDetailsLoading(true);
        setIsUserDetailsLoading(true); // Set isUserDetailsLoading to true before fetching individual order details
        setIsShippingAddressLoading(true); // Set isShippingAddressLoading to true before fetching individual order details
        await Promise.all(
          completedOrders.map((order) => dispatch(getOrderById(order._id)))
        );
        // setIsOrderDetailsLoading(false);
        setIsUserDetailsLoading(false); // Set isUserDetailsLoading to false after fetching individual order details
        setIsShippingAddressLoading(false); // Set isShippingAddressLoading to false after fetching individual order details
      }
  
      setProgress(100);
      setIsLoading(false);
    };
  
    fetchData();
  }, [jwt, adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deleteOrder, dispatch]);






  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED");
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
    setOrderStatus("SHIPPED");
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId));
    setOrderStatus("DELIVERED");
  };

  const handleDeleteOrder = (orderId) => {
    handleUpdateStatusMenuClose();
    dispatch(deleteOrder(orderId));
  };

  const handleToggleDetails = (index) => {
    setOpenDetails((prevOpenDetails) => {
      const newOpenDetails = [...prevOpenDetails];
      newOpenDetails[index] = !newOpenDetails[index];
      return newOpenDetails;
    });
  };

 
  


  return (
    <div>
      <Box>
        <Card className="p-3">
          <CardHeader
            title="Sort"
            sx={{
              pt: 0,
              alignItems: "center",
              "& .MuiCardHeader-action": { mt: 0.6 },
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value={"PLACED"}>PLACED</MenuItem>
                  <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                  <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                  <MenuItem value={"CANCELED"}>CANCELED</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.sort}
                  label="Sort By"
                  onChange={handleChange}
                >
                  <MenuItem value={"Newest"}>Newest</MenuItem>
                  <MenuItem value={"Older"}>Older</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
        <Card className="mt-2">
          <CardHeader
            title="All Orders"
            sx={{
              pt: 2,
              alignItems: "center",
              "& .MuiCardHeader-action": { mt: 0.6 },
            }}
          />
          <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Loading...
        </div>
      ) : (
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
           
              
              <TableBody>
              
              {filteredOrders.map((item, index) => {
    const orderDetails = order.orders[item._id];
    // console.log(orderDetails);
    const userDetails = orderDetails?.user;
    const shippingAddress = orderDetails?.shippingAddress;
                  return (
                    <React.Fragment key={item._id}>
                      <TableRow
                        hover
                        sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                      >
                        <TableCell sx={{}}>
                          <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                            {item.orderItems.map((orderItem) => (
                              <Avatar key={orderItem._id} alt={item.name} src={orderItem.product?.image} />
                            ))}
                          </AvatarGroup>
                        </TableCell>

                        <TableCell>
                          <Button onClick={() => handleToggleDetails(index)}>
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "0.875rem !important",
                              }}
                            >
                              {item?.orderItems.map((order) => (
                                <span key={order._id} className="">
                                  {order.product?.name},
                                </span>
                              ))}
                            </Typography>
          
                          </Button>
                        </TableCell>

                        <TableCell>{item?.totalDiscountedPrice}</TableCell>
                        <TableCell>{item?._id}</TableCell>
                        <TableCell className="text-white">
                          <Chip
                            sx={{
                              color: "white !important",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                            label={item?.orderStatus}
                            size="small"
                            color={
                              item.orderStatus === "PENDING"
                                ? "info"
                                : item?.orderStatus === "DELIVERED"
                                ? "success"
                                : "secondary"
                            }
                            className="text-white"
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }} className="text-white">
                          <div>
                            <Button
                              id={`basic-button-${item?._id}`}
                              aria-controls={`basic-menu-${item._id}`}
                              aria-haspopup="true"
                              aria-expanded={Boolean(anchorElArray[index])}
                              onClick={(event) => handleUpdateStatusMenuClick(event, index)}
                            >
                              Status
                            </Button>
                            <Menu
                              id={`basic-menu-${item?._id}`}
                              anchorEl={anchorElArray[index]}
                              open={Boolean(anchorElArray[index])}
                              onClose={() => handleUpdateStatusMenuClose(index)}
                              MenuListProps={{
                                "aria-labelledby": `basic-button-${item._id}`,
                              }}
                            >
                              <MenuItem
                                onClick={() => handleConfirmedOrder(item?._id, index)}
                                disabled={
                                  item.orderStatus === "DELIVERED" ||
                                  item.orderStatus === "SHIPPED" ||
                                  item.orderStatus === "CONFIRMED"
                                }
                              >
                                CONFIRMED ORDER
                              </MenuItem>
                              <MenuItem
                                disabled={item.orderStatus === "DELIVERED" || item.orderStatus === "SHIPPED"}
                                onClick={() => handleShippedOrder(item._id, index)}
                              >
                                SHIPPED ORDER
                              </MenuItem>
                              <MenuItem onClick={() => handleDeliveredOrder(item._id)}>DELIVERED ORDER</MenuItem>
                            </Menu>
                          </div>
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }} className="text-white">
                          <Button onClick={() => handleDeleteOrder(item._id)} variant="text">
                            delete
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                          <Collapse in={openDetails[index]} timeout="auto" unmountOnExit>
                       
                            <Box sx={{ margin: 1 }}>
                              <Typography variant="h6" gutterBottom component="div">
                                Order Details
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Customization Note</TableCell>
                                    <TableCell>Customization Image</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {item.orderItems.map((orderItem) => (
                                    <TableRow key={orderItem._id}>
                                      <TableCell component="th" scope="row">
                                        {orderItem.product.name}
                                      </TableCell>
                                      <TableCell>{orderItem.quantity}</TableCell>
                                      <TableCell>{orderItem.discountedPrice}₹</TableCell>
                                      <TableCell>{orderItem?.customizationNote}</TableCell>
                                      <TableCell>
                                        <a href={orderItem?.customizationImage} target="_blank" rel="noreferrer">
                                        <img src={orderItem?.customizationImage} width={70} height={70}/>
                                        </a>
                                        </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
             
                              </Table>
                              {orderDetails && (
                    <>
                      <Typography variant="h6" gutterBottom component="div" mt={2}>
                        User Details
                      </Typography>
                      {isUserDetailsLoading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Loading user details...
      </div>
    ) : (
                      userDetails && (
                        <>
                          <Typography variant="body1">
                            Name: {userDetails.firstName} {userDetails.lastName}
                          </Typography>
                          <Typography variant="body1">Email: {userDetails.email}</Typography>
                        </>
                      )
    )}

                      <Typography variant="h6" gutterBottom component="div" mt={2}>
                        Shipping Address
                      </Typography>
                      {isShippingAddressLoading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Loading shipping address...
      </div>
    ) : (
                      shippingAddress && (
                        <>
                          <Typography variant="body1">
                            Address: {shippingAddress.streetAddress}
                          </Typography>
                          <Typography variant="body1">City: {shippingAddress.city}</Typography>
                          <Typography variant="body1">State: {shippingAddress.state}</Typography>
                          <Typography variant="body1">
                            Postal Code: {shippingAddress.pincode}
                          </Typography>
                          <Typography variant="body1">
                            Contact No: {shippingAddress.mobile}
                          </Typography>
                        </>
                      )
    )}
                      </>
                      )}
                        
                              <Typography variant="h6" gutterBottom component="div" mt={2}>
                                Payment Details
                              </Typography>
                              <Typography variant="body1">
                                Payment Status: {item.paymentDetails.paymentStatus}
                              </Typography>
                              <Typography variant="body1">Payment ID: {item.paymentDetails.paymentId}</Typography>
                             
                            </Box>
    
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                    );
                    
                              })}
                  
              </TableBody>
              
             
                {/* <AddressCard address={address}/> */}
          
            </Table>
          </TableContainer>
          )}
        </Card>
        
        <Card className="mt-2 felx justify-center items-center">
          <Pagination
            className="py-5 w-auto"
            size="large"
            count={Math.ceil(adminOrder.orders.length / itemsPerPage)}
            page={currentPage}
            color="primary"
            onChange={handlePaginationChange}
          />
        </Card>
      </Box>
    </div>
  );
};

export default OrdersTable;