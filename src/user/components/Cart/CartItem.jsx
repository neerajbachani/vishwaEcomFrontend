// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { removeCartItem, updateCartItem } from "../../redux/Cart/Action";
// import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

// const CartItem = ({ item, showButton, cartItemsCount }) => {
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");

//   const [customizationNote, setCustomizationNote] = useState(
//     item?.customizationNote
//   );
//   const [customizationImage, setCustomizationImage] = useState(
//     item?.customizationImage || null
//   );

//   useEffect(() => {
//     setCustomizationNote(item?.customizationNote || "");
//     setCustomizationImage(item?.customizationImage || null);
//   }, [item?.customizationNote, item?.customizationImage]);

//   const handleRemoveItemFromCart = () => {
//     const data = { cartItemId: item?._id, jwt };
//     dispatch(removeCartItem(data));
//   };

//   const handleUpdateCartItem = () => {
//     const formData = new FormData();
//     formData.append("quantity", item.quantity);
//     formData.append("customizationNote", customizationNote);
//     if (customizationImage) {
//       formData.append("customizationImage", customizationImage);
//     }

//     const data = { data: formData, cartItemId: item._id, jwt };
//     dispatch(updateCartItem(data));
//   };

//   const handleQuantityChange = (num) => {
//     const formData = new FormData();
//     formData.append("quantity", item.quantity + num);

//     const data = { data: formData, cartItemId: item._id, jwt };
//     dispatch(updateCartItem(data));
//   };

//   const handleImageUpload = (event) => {
//     setCustomizationImage(event.target.files[0]);
//   };

//   return (
//     <div>
      
     
//       <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//           <div className="flex items-center mb-4 md:mb-0">
//             <img
//               className="w-24 h-24 object-cover rounded-lg mr-4"
//               src={item?.product?.image}
//               alt=""
//             />
//             <div>
//               <h3 className="font-semibold text-lg text-gray-800">
//                 {item?.product?.name}
//               </h3>
//               <p className="text-gray-600">
//                 Price: ₹{item?.product?.discountedPrice}{" "}
//                 <span className="text-sm text-gray-400 line-through">
//                   ₹{item?.product?.price}
//                 </span>
//               </p>
//             </div>
//           </div>
//           {showButton && (
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
//                 <button
//                   onClick={() => handleQuantityChange(-1)}
//                   disabled={item?.quantity <= 1}
//                   className="p-1 rounded-full text-gray-600 hover:text-gray-800 focus:outline-none"
//                 >
//                   <FiMinus />
//                 </button>
//                 <span className="text-gray-800 font-semibold">
//                   {item?.quantity}
//                 </span>
//                 <button
//                   onClick={() => handleQuantityChange(1)}
//                   className="p-1 rounded-full text-gray-600 hover:text-gray-800 focus:outline-none"
//                 >
//                   <FiPlus />
//                 </button>
//               </div>
//               <button
//                 onClick={handleRemoveItemFromCart}
//                 className="text-red-500 hover:text-red-600 focus:outline-none"
//               >
//                 <FiTrash2 />
//               </button>
//             </div>
//           )}
//         </div>
//         {showButton && (
//           <div className="space-y-4">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <h4 className="text-lg font-semibold mb-2 md:mb-0">
//                 Customization
//               </h4>
//               <div className="flex items-center space-x-4">
//                 <input
//                   type="text"
//                   placeholder="Customization Note"
//                   value={customizationNote}
//                   onChange={(e) => setCustomizationNote(e.target.value)}
//                   className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <label className="block">
//                   <span className="sr-only">Upload Customization Image</span>
//                   <input
//                     type="file"
//                     onChange={handleImageUpload}
//                     accept="image/*"
//                     className="block w-full md:w-auto border border-gray-300 rounded-lg py-2 px-3 bg-white text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                   />
//                 </label>
//               </div>
//             </div>
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <p className="text-gray-600 mb-2 md:mb-0">
//                 {item?.customizationNote}
//               </p>
//               {item?.customizationImage && (
//                 <img
//                   className="w-36 h-36 object-cover rounded-lg"
//                   src={item?.customizationImage}
//                   alt="Customization"
//                 />
//               )}
//             </div>
//             <button
//               onClick={handleUpdateCartItem}
//               className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
//             >
//               Update
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartItem;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../redux/Cart/Action";
import { Box, Typography, Button, TextField, IconButton, Paper, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ item, showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [customizationNote, setCustomizationNote] = useState(item?.customizationNote || "");
  const [customizationImage, setCustomizationImage] = useState(item?.customizationImage || null);

  useEffect(() => {
    setCustomizationNote(item?.customizationNote || "");
    setCustomizationImage(item?.customizationImage || null);
  }, [item?.customizationNote, item?.customizationImage]);

  const handleRemoveItemFromCart = () => {
    dispatch(removeCartItem({ cartItemId: item?._id, jwt }));
  };

  const handleUpdateCartItem = () => {
    const formData = new FormData();
    formData.append("quantity", item.quantity);
    formData.append("customizationNote", customizationNote);
    if (customizationImage) {
      formData.append("customizationImage", customizationImage);
    }

    dispatch(updateCartItem({ data: formData, cartItemId: item?._id, jwt }));
  };

  const handleQuantityChange = (num) => {
    const formData = new FormData();
    formData.append("quantity", item.quantity + num);
    dispatch(updateCartItem({ data: formData, cartItemId: item?._id, jwt }));
  };

  const handleImageUpload = (event) => {
    setCustomizationImage(event.target.files[0]);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <img
            src={item?.product?.image}
            alt={item?.product?.name}
            style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, marginRight: 16 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: 16 }}>
              {item?.product?.name}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: 'text.secondary' }}>
              ₹{item?.product?.discountedPrice}{" "}
              <Typography component="span" sx={{ textDecoration: 'line-through', color: 'text.disabled', ml: 1 }}>
                ₹{item?.product?.price}
              </Typography>
            </Typography>
          </Box>
        </Box>
        {showButton && (
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => handleQuantityChange(-1)} disabled={item?.quantity <= 1} size="small">
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 2, fontFamily: 'Poppins' }}>{item?.quantity}</Typography>
            <IconButton onClick={() => handleQuantityChange(1)} size="small">
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemoveItemFromCart} color="error" sx={{ ml: 2 }}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      {showButton && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontFamily: 'Poppins', fontWeight: 600 }}>
              Customization
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Customization Note"
              value={customizationNote}
              onChange={(e) => setCustomizationNote(e.target.value)}
              sx={{ mb: 2, '& .MuiInputBase-root': { fontFamily: 'Poppins' } }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id={`customization-image-${item?._id}`}
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor={`customization-image-${item?._id}`}>
              <Button variant="outlined" component="span" sx={{ fontFamily: 'Poppins', mr: 2 }}>
                Upload Image
              </Button>
            </label>
            <Button
              variant="contained"
              onClick={handleUpdateCartItem}
              sx={{ fontFamily: 'Poppins', bgcolor: '#e63946', '&:hover': { bgcolor: '#d62828' } }}
            >
              Update
            </Button>
          </Box>
          {customizationImage && (
            <Box mt={2}>
              <img
                src={URL.createObjectURL(customizationImage)}
                alt="Customization"
                style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }}
              />
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default CartItem;