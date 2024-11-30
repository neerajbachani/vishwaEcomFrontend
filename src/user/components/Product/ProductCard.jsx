import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';

// const ProductCard = ({ product }) => {
//   const { name, brand, image, price, discountedPrice, color, discount, _id } = product;
//   const [imageLoaded, setImageLoaded] = useState(false);

//   useEffect(() => {
//     const img = new Image();
//     img.src = image;
//     img.onload = () => setImageLoaded(true);
//   }, [image]);

//   return (
//     <div className=" w-[40%] md:w-1/3 lg:w-[27%] xl:w-1/4 sm:p-2">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
//         <NavLink to={`/products/id/${_id}`} className="block relative h-48 sm:h-64">
//           {!imageLoaded && (
//             <Skeleton 
//               variant="rectangular" 
//               width="100%"
//               height="100%"
//               animation="wave"
//             />
//           )}
//           <img
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
//               imageLoaded ? 'opacity-100' : 'opacity-0'
//             }`}
//             src={image}
//             alt={name}
//             loading="lazy"
//             onLoad={() => setImageLoaded(true)}
//           />
//           {discount > 0 && (
//             <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//               {discount}% off
//             </span>
//           )}
//         </NavLink>
//         <div className="p-4 flex-grow flex flex-col justify-between">
//           <div>
//             <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-1 line-clamp-2">
//               {name}
//             </h3>
           
//           </div>
//           <div>
//             <div className="flex items-baseline mb-1">
//               <span className="text-xl font-bold text-blue-600 mr-2">
//                 ₹{discountedPrice}
//               </span>
//               {price !== discountedPrice && (
//                 <span className="text-sm text-gray-500 line-through">
//                   ₹{price}
//                 </span>
//               )}
//             </div>
//             {discount > 0 && (
//               <p className="text-sm text-green-600 font-semibold">
//                 You save: ₹{price - discountedPrice}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

const ProductCard = ({ product }) => {
  const { name, brand, image, price, discountedPrice, color, discount, _id } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  // const eyeHandler = (productId) => {
  //   navigate(`/products/id/${productId}`);
  // };

 

  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-lg bg-gray-50 shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
      
          <div className="relative aspect-square w-full">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0" />
            )}
          <NavLink to={`/products/id/${_id}` } className=' z-20 cursor-pointer' >
            <img
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              src={image}
              alt={name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
       </NavLink>
          </div>
        
        
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-blue-600">₹{discountedPrice}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">₹{price}</span>
          </div>
          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
            {discount?.toFixed(2)}% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
