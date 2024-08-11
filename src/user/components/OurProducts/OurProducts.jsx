import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOurProduct } from '../../redux/OurProduct/Action';
import { Link } from 'react-router-dom';
import DirectionAwareHover from '../DirectionAwareHover';
 // Import the DirectionAwareHover component

const OurProducts = () => {
  const dispatch = useDispatch();
  const { ourProduct } = useSelector((store) => store);
  const OurProduct = ourProduct.ourProducts || [];
  console.log(OurProduct);

  useEffect(() => {
    dispatch(getOurProduct());
  }, [dispatch]);

  const [activeButton, setActiveButton] = useState('Top');

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const filteredProducts = OurProduct.filter((product) => product.type === activeButton);

  

  return (
    // <div className="w-full bg-white" >
    //   <div className="max-w-7xl mx-auto py-8" data-aos='fade-up'>
    //   <div className=' flex   items-center justify-center md:mt-[5rem] mt-[1rem] space-x-5 mb-4 '>
    //       <div className=' bg-[#5baef7] w-1 h-7 '></div>
    //     <h1 className="  font-poppins font-semibold md:text-4xl text-2xl     ">
          
    //     Our Products
    //   </h1>
    //   </div>
    //     <div className="flex justify-center space-x-5 mb-4" >
    //       <button
    //         className={`sm:px-4 sm:py-2 px-2 py-1 mr-2 rounded-md ${
    //           activeButton === 'Top' ? 'bg-[#BDE0FE] font-poppins' : 'bg-gray-200 text-gray-700 font-poppins'
    //         }`}
    //         onClick={() => handleButtonClick('Top')}
    //       >
    //         Top
    //       </button>
    //       <button
    //         className={`sm:px-4 sm:py-2 px-2 py-1 mr-2 rounded-md ${
    //           activeButton === 'Featured' ? 'bg-[#BDE0FE] font-poppins' : 'bg-gray-200 text-gray-700 font-poppins'
    //         }`}
    //         onClick={() => handleButtonClick('Featured')}
    //       >
    //         Featured
    //       </button>
    //       <button
    //         className={`sm:px-4 sm:py-2 px-2 py-1 mr-2 rounded-md ${
    //           activeButton === 'Max Discount' ? 'bg-[#BDE0FE] font-poppins' : 'bg-gray-200 text-gray-700 font-poppins'
    //         }`}
    //         onClick={() => handleButtonClick('Max Discount')}
    //       >
    //         Max Discount
    //       </button>
    //     </div>
    //     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#BDE0FE] p-4 ">
    //       {filteredProducts.map((product) => (
    //         <Link to={product.link}>
    //         <DirectionAwareHover key={product.id} imageUrl={product.image} className='w-full h-full' >
             

    //           <p className="mt-2 font-bold text-sm md:text-md">{product.title}</p>
    //           {/* <p className="mt-2 font-bold text-xl text-[#BDE0FE]">{product.price}₹</p> */}
    //         </DirectionAwareHover>
    //         </Link>
    //       ))}
    //       <div className=' flex justify-center col-span-full'>
    //         <Link to='/products'>
    //           <button className=' text-xl font-poppins px-5 py-3 rounded-xl  text-black bg-white hover:bg-black hover:text-[#BDE0FE] transition duration-500 ease-in-out ' >Explore Now</button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="container mx-auto px-4 mt-[4rem] md:mt-[6rem] overflow-x-auto ">
  <div class="flex gap-8 md:gap-20 pb-4 md:pb-0">
    <div class="w-[21rem] md:w-2/3 flex-shrink-0">
      <div class="image-content">
        <Link to="/products">
          <img 
            src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1723214653/Untitled_design_6_o5lwsb.png" 
            alt="Wall Art" 
            className="w-full h-[12rem] object-cover md:h-[25rem] md:max-w-screen-lg rounded-lg shadow-md"
          />
        </Link>
      </div>
    </div>
    
    <div class="w-[21rem] md:w-2/3 flex-shrink-0">
      <div class="image-content">
        <a href="https://customize.the-next-decor.com/customize">
          <img 
            src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1722344013/download_13_jpk95k.png" 
            alt="Customized Acrylic" 
            class="w-full h-[12rem] object-cover md:h-[25rem] md:max-w-screen-lg rounded-lg shadow-md"
          />
        </a>
      </div>
    </div>
  </div>
</div>
  );
};

export default OurProducts;