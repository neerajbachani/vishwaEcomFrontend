import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOurBestSellerProduct } from '../redux/OurBestSeller/Action';
import { Link } from 'react-router-dom';
import './button.css'

const OurBestSeller = () => {
  const dispatch = useDispatch();
  const { ourBestSellerProduct } = useSelector((store) => store);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(getOurBestSellerProduct());
  }, [dispatch]);

  const scroll = (scrollOffset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center md:mt-16 mt-8 mb-8">
        <div className="bg-[#5baef7] w-1 h-7 mr-4"></div>
        <h1 className="font-poppins font-semibold md:text-5xl text-2xl">
          Our Best Seller
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll(-200)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#5baef7] hover:bg-[#4a9ce5] text-white rounded-full p-2 z-10 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth gap-4 py-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ourBestSellerProduct?.ourBestSellerProducts?.map((product) => (
            <Link key={product.id} to={product?.link} className="flex-none">
              <div className="sm:w-64 w-52  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="sm:h-64 h-52 overflow-hidden">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover hover:scale-125 transition-all duration-500 cursor-pointer"
                    alt={product.title}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-center text-lg font-semibold font-poppins truncate">
                    {product.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll(200)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#5baef7] hover:bg-[#4a9ce5] text-white rounded-full p-2 z-10 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div id="nav-part2" className=' flex justify-center items-center text-center' >
          <Link to='/products'><h4 className=' px-4 py-2' ><a href="/products">See All</a></h4></Link>
      </div>
    </div>
  );
};

export default OurBestSeller;