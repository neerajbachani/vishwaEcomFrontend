// import React from "react";

// const AddressCard = ({address}) => {
//   console.log(address)
//   return (
//     <div>
//       {/* <h1 className="text-lg font-semibold py-4">Delivery Adress</h1> */}
//       <div className="space-y-3">
//         <p className="font-semibold font-poppins text-xl ">{`${address?.firstName} ${address?.lastName}`}</p>

//         <p className="font-poppins" >
//           {`${address?.streetAddress}, ${address?.city}, ${address?.state}, ${address?.pincode}`}
//         </p>

//         <div className="space-y-1">
//           <p className="font-semibold font-poppins">Phone Number </p>
//           <p>{address?.mobile}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressCard;

import React from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const AddressCard = ({ address }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <LocationOnIcon sx={{ mr: 1, color: '#e63946' }} />
        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600 }}>
          Delivery Address
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" sx={{ mb: 1, fontFamily: 'Poppins', fontWeight: 600 }}>
        {`${address?.firstName} ${address?.lastName}`}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Poppins' }}>
        {`${address?.streetAddress}, ${address?.city}, ${address?.state}, ${address?.pincode}`}
      </Typography>
      <Box display="flex" alignItems="center">
        <PhoneIcon sx={{ mr: 1, color: '#e63946' }} />
        <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
          {address?.mobile}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AddressCard;