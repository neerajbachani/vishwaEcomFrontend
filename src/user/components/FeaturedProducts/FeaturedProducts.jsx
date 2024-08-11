import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../redux/Cart/Action';
import { useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';


const products = [
  {
    image: `${"https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710567598/a26a8c4a842fbbb968be90192d4cc46c_ma6buw.png"}`,
    name: 'Resin Jewelry / pendant',
    price: '199₹',
    discountedPrice: '279₹',
    productId: '65dabcee0ad20b6449767060'
  },
  {
    image: `${"https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710567587/IMG_20240204_104249_wh5b6n.png"}`,
    name: 'Glass frame',
    price: '999₹',
    discountedPrice: '549₹',
    productId: '65db4a6c0ad20b6449767104'
  },
  {
    image: `${"https://res.cloudinary.com/dkhsnhjrh/image/upload/v1706928853/Resin/Mantra%20frame/bb0bdf25cfc20959d950d1b3e1b3cb4a_mqr6ct.jpg"}`,
    name: 'Mantra Frame - Lord Shivji',
    price: '499₹',
    discountedPrice: '549₹',
    productId: '65f5bd43aa0a3ef296f6a359'
  },

  {
    image: `${"https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710567597/IMG_20231201_133843_1_i0xbl6.png"}`,
    name: 'Aesthetic Vintage Frame',
    price: '799₹',
    discountedPrice: '1099₹',
    productId: '65dac0140ad20b644976709c'
  },
  {
    image: 'https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710568440/GeodeArt1_veiuki.jpg',
    name: 'Blue, White, Golden Sapphire Geode Wall Art',
    price: '499₹',
    discountedPrice: '549₹',
    productId: '65f5cc65aa0a3ef296f6a383',
  },
  {
    image: `${"https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710567588/IMG_20240217_163114_zeoicv.png"}`,
    name: 'Resin Wall clock - 14 inch',
    price: '1799₹',
    discountedPrice: '2299₹',
    productId: '65dabef30ad20b644976708f'
  },
  {
    image: `${"https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710566830/IMG_20240108_081142_ff88pw.png"}`,
    name: 'Resin Varmala Preservation',
    price: '2499₹',
    discountedPrice: '2399₹',
    productId: '65dac14f0ad20b64497670b1',
  },
  
  {
    image: 'https://res.cloudinary.com/dkhsnhjrh/image/upload/v1706928860/Resin/Marriage%20Special/Screenshot_2023-05-31-23-32-51-172_com.instagram.android-edit_taoqa6.jpg',
    name: 'Resin Frame With Customized Quote, Name and Date',
    price: '499₹',
    discountedPrice: '549₹',
    productId: '65f5d3baaa0a3ef296f6a3ab',
  },
  
];


const FeaturedProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
const handleAddToCart = (productId) => {
  const data = { productId: productId };
  console.log(data)
  dispatch(addItemToCart({ data }));
  navigate("/cart");
};

  return (
    <section className='mt-[5rem]'>
      
      <div className='flex justify-between items-center md:mx-[3rem] mx-[1rem] '>
      <h3 className=' md:text-4xl text-3xl  text-secondary-dark-color text-left  font-bold font-poppins ' >
                Featured Products
            </h3>
            <Link to='/products' className="  relative inline-flex items-center justify-center md:px-5 px-2 py-1  overflow-hidden font-medium font-poppins text-indigo-600 transition duration-300 ease-out rounded-full shadow-sm   group">
<span className="absolute inset-0 flex items-center justify-center w-full h-full text-[#fff] duration-300 -translate-x-full bg-primarycolor group-hover:translate-x-0 ease">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease md:text-2xl text-lg text-primarycolor">View All</span>
<span className="relative invisible">View All</span>
</Link>
      </div>
      {/* <div className='mx-5 h-[0.3rem] bg-light-bg-color'></div> */}
      <div className='  flex flex-wrap justify-center 2xl:gap-20 sm:gap-10 gap-5  items-center px-10 pb-4 pt-[3rem] bg-blue-primary bg-opacity-20'>
        
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className=" flex max-w-sm flex-col overflow-hidden bg-white">
            <div className="relative flex items-center h-[18rem] w-[15rem] group overflow-hidden">
              <Link to={`/products/id/${product.productId}`}>
                <img
                  className=" absolute top-0 right-0 h-full w-full object-cover"
                  src={product.image}
                  alt="product image"
                />
              </Link>
              <div className="absolute -right-24 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-4 group-hover:bottom-4">
                <button
                  onClick={() => handleAddToCart(product.productId)}
                  className=" z-20 flex h-14 w-14 items-center justify-center hover:bg-primarycolor rounded-full text-whitecolor transition bg-[#b4afaf7d]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-col max-w-[15rem]">
              <h5 className="text-center tracking-tight text-gray-500 font-poppins font-medium text-xl text-secondary-dark-color ">
                {product.name}
              </h5>
              <div className="mb-5 mt-1 flex justify-center">
                <p>
                  <span className="font-bold text-primarycolor text-lg">{product.price}</span>
                  <span className="text-sm font-semibold text-[#7a7575] line-through ml-3 ">
                    {product.discountedPrice}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="m-2">
              <Skeleton variant="rectangular" width={250} height={350} />
            </div>
          ))}
        </div>
      )}
      </div>
      
    </section>
  );
};

export default FeaturedProducts;
