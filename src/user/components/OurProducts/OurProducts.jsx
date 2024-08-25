import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOurProduct } from '../../redux/OurProduct/Action';
import { Link } from 'react-router-dom';

const OurProducts = () => {
  const dispatch = useDispatch();
  const { ourProduct } = useSelector((store) => store);
  const OurProduct = ourProduct.ourProducts || [];
  const scrollRef = useRef(null);
  const [activeHeading, setActiveHeading] = useState('Top Products');
  
  useEffect(() => {
    dispatch(getOurProduct());
  }, [dispatch]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.clientWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      
      if (scrollPosition > (scrollWidth - containerWidth) / 2) {
        setActiveHeading('Featured Products');
      } else {
        setActiveHeading('Top Products');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 mt-[1rem]  md:mt-[3rem]">
       <div className="flex items-center justify-center ">
        <div className="bg-[#5baef7] w-1 h-7 mr-4"></div>
        <h1 className="font-poppins font-semibold md:text-3xl lg:text-4xl text-2xl">
        {activeHeading}
        </h1>
      </div>
     
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="container mx-auto px-4 mt-12 overflow-x-auto"
      >
        <div className="flex gap-8 md:gap-20 pb-4 md:pb-0">
          {OurProduct.map((product) => (
            <div key={product._id} className="w-[21rem] md:w-2/3 flex-shrink-0">
              <div className="image-content">
                <Link to={product.link || "#"}>
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-[12rem] object-cover md:h-[25rem] md:max-w-screen-lg rounded-lg shadow-md"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProducts;