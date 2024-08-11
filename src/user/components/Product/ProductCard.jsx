import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const ProductCard = ({ product }) => {
  const { name, brand, image, price, discountedPrice, color, discount } = product;
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <div className='productCard transition-all cursor-pointer'>
      <NavLink to={`/products/id/${product?._id}`}>
        <div className='sm:h-[20rem] relative sm:w-[17rem] h-[15rem] px-2 w-[11rem]'>
          {!imageLoaded && (
            <Skeleton 
              variant="rectangular" 
              sx={{ height: '100%', width: '100%', position: 'absolute', top: 0, right: 0 }} 
            />
          )}
          <img
            className={`h-full w-full object-cover absolute top-0 right-0 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={image}
            alt=""
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </NavLink>
      <div className='textPart bg-white mt-3 mb-3'>
        <div>
          <p className='text-secondary-dark-color sm:text-xl text-lg font-poppins'>
            {name}
          </p>
        </div>
        <div className='flex space-x-2 items-center'>
          <p className='font-semibold font-poppins text-primarycolor sm:text-2xl text-lg'>
            ₹{discountedPrice}
          </p>
          <p className='opacity-50 line-through'>₹{price}</p>
          <p className='font-semibold font-poppins text-[#219ebc]'>
            {discount}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;





