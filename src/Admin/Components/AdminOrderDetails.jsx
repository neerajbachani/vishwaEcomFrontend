import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../user/redux/Order/Action';
import { useParams } from 'react-router-dom';

import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
} from '@mui/material';
import moment from 'moment';
import AddressCard from '../../user/components/Address/AddressCard';
import OrderDetails from '../../user/components/Order/OrderDetails';

const AdminOrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { adminOrder, loading, error } = useSelector((store) => store);

 
  
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h5" color="error">{error}</Typography>;
  }

  const { user, orderItems, paymentDetails, shippingAddress, orderDate } = adminOrder;
 
  return (
    // <div>
    //   <OrderDetails/>
    //   <Typography variant="h4" component="h2" gutterBottom>
    //     Order Details
    //   </Typography>
    //   <Grid container spacing={3}>
    //     <Grid item xs={12} md={6}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6" component="h3" gutterBottom>
    //             User Details
    //           </Typography>
    //           <Box display="flex" alignItems="center" marginBottom={2}>
    //             <Avatar>{user?.firstName.charAt(0)}</Avatar>
    //             <Box marginLeft={2}>
    //               <Typography variant="body1">
    //                 {`${user.firstName} ${user.lastName}`}
    //               </Typography>
    //               <Typography variant="body2" color="textSecondary">
    //                 {user.email}
    //               </Typography>
    //             </Box>
    //           </Box>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={12} md={6}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6" component="h3" gutterBottom>
    //             Payment Details
    //           </Typography>
    //           <Typography variant="body1">Payment Status: {paymentDetails.paymentStatus}</Typography>
    //           <Typography variant="body1">Payment ID: {paymentDetails.paymentId}</Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6" component="h3" gutterBottom>
    //             Shipping Address
    //           </Typography>
    //           <h1 className=' bg-primarycolor m-20'>hyyy</h1>
    //           <AddressCard address={shippingAddress}/>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6" component="h3" gutterBottom>
    //             Order Items
    //           </Typography>
    //           {orderItems.map((item) => (
    //             <Box key={item._id} marginBottom={2}>
    //               <Typography variant="body1">{item.product.name}</Typography>
    //               <Typography variant="body2" color="textSecondary">
    //                 Quantity: {item.quantity}
    //               </Typography>
    //               <Typography variant="body2" color="textSecondary">
    //                 Price: ${item.price}
    //               </Typography>
    //             </Box>
    //           ))}
    //           <Divider />
    //           <Box display="flex" justifyContent="space-between" marginTop={2}>
    //             <Typography variant="body1">Total Price: ${adminOrder.totalPrice}</Typography>
    //             <Typography variant="body1">Discount: ${adminOrder.discount}</Typography>
    //             <Typography variant="body1">Total Items: {adminOrder.totalItem}</Typography>
    //           </Box>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6" component="h3" gutterBottom>
    //             Order Details
    //           </Typography>
    //           <Typography variant="body1">Order Status: {adminOrder.orderStatus}</Typography>
    //           <Typography variant="body1">
    //             Order Date: {moment(orderDate).format('MMMM D, YYYY')}
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </div>
    <></>
  );
};

export default AdminOrderDetails;