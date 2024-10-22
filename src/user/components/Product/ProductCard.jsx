// import React, { useState, useEffect } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { Skeleton } from '@mui/material';

// const ProductCard = ({ product }) => {
//   const { name, brand, image, price, discountedPrice, color, discount } = product;
//   const navigate = useNavigate();
//   const [imageLoaded, setImageLoaded] = useState(false);

//   useEffect(() => {
//     const img = new Image();
//     img.src = image;
//     img.onload = () => setImageLoaded(true);
//   }, [image]);

//   return (
//     <div className='productCard transition-all cursor-pointer'>
//       <NavLink to={`/products/id/${product?._id}`}>
//         <div className='sm:h-[20rem] relative sm:w-[17rem] h-[13rem] px-2 w-[9rem]'>
//           {!imageLoaded && (
//             <Skeleton 
//               variant="rectangular" 
//               sx={{ height: '100%', width: '100%', position: 'absolute', top: 0, right: 0 }} 
//             />
//           )}
//           <img
//             className={`h-full w-full object-cover absolute top-0 right-0 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
//             src={image}
//             alt=""
//             loading="lazy"
//             onLoad={() => setImageLoaded(true)}
//           />
//         </div>
//       </NavLink>
//       <div className='textPart bg-white mt-3 mb-3'>
//         <div>
//           <p className='text-secondary-dark-color sm:text-xl text-lg max-w-[10rem] sm:max-w-[17rem] font-poppins'>
//             {name}
//           </p>
//         </div>
//         <div className='flex space-x-2 items-center'>
//           <p className='font-semibold font-poppins text-primarycolor sm:text-2xl text-lg'>
//             ₹{discountedPrice}
//           </p>
//           <p className='opacity-50 line-through'>₹{price}</p>
//           <p className='font-semibold font-poppins text-[#219ebc]'>
//             {discount}% off
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const ProductCard = ({ product }) => {
  const { name, brand, image, price, discountedPrice, color, discount, _id } = product;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <div className=" w-[40%] md:w-1/3 lg:w-1/4 sm:p-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        <NavLink to={`/products/id/${_id}`} className="block relative h-48 sm:h-64">
          {!imageLoaded && (
            <Skeleton 
              variant="rectangular" 
              width="100%"
              height="100%"
              animation="wave"
            />
          )}
          <img
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={image}
            alt={name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% off
            </span>
          )}
        </NavLink>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-1 line-clamp-2">
              {name}
            </h3>
           
          </div>
          <div>
            <div className="flex items-baseline mb-1">
              <span className="text-xl font-bold text-blue-600 mr-2">
                ₹{discountedPrice}
              </span>
              {price !== discountedPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{price}
                </span>
              )}
            </div>
            {discount > 0 && (
              <p className="text-sm text-green-600 font-semibold">
                You save: ₹{price - discountedPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;