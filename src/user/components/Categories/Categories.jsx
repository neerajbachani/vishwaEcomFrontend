import React, { useState, useEffect } from 'react';
import './categories.css'
import { Link } from 'react-router-dom';

const categoryData = [
  { to: '/products?wallClock=resinWallClock', img: 'https://res.cloudinary.com/dbuu5kd93/image/upload/v1723358268/Screenshot_2024_0811_120239_zpmcjj.jpg', name: 'Varmala Preservation' },
  { to: '/products?namePlate=customizedNamePlate', img: 'https://res.cloudinary.com/dbuu5kd93/image/upload/v1723358267/Screenshot_2024_0811_120503_yxigli.jpg', name: 'Mantra Frame' },
  { to: '/products?varmalaPreservation=square12', img: 'https://res.cloudinary.com/dbuu5kd93/image/upload/v1723358269/Screenshot_2024_0811_120300_bwhgdc.jpg', name: 'Resin Rakhi' },
  { to: '/products?namePlate=customizedNamePlate', img: 'https://res.cloudinary.com/dbuu5kd93/image/upload/v1723358267/Screenshot_2024_0811_120334_kj2jyn.jpg', name: 'Resin Pendant' },
  { to: '/products?navkarMantraFrame=presonalizedMantraFrame', img: 'https://res.cloudinary.com/dbuu5kd93/image/upload/v1723358269/Screenshot_2024_0811_120442_hv5xhy.jpg', name: 'Pooja Thali' },
  { to: '/products?varmalaPreservation=planter', img: 'https://res.cloudinary.com/dbuu5kd93/image/upload/v1723358268/Screenshot_2024_0811_120143_uqqf4s.jpg', name: 'Wall Clock' },
  { to: '/products?geodeArt=geodeartedition', img: 'https://res.cloudinary.com/dbuu5kd93/image/upload/v1723358269/Screenshot_2024_0811_120419_feccst.jpg', name: 'Vintage Frame' },
  { to: '/products?resin=coaster', img: 'https://res.cloudinary.com/dkhsnhjrh/image/upload/v1723193569/WhatsApp_Image_2024-08-09_at_14.17.34_3_jpekwf.jpg', name: 'Resin Coaster' },
];

const CategorySkeleton = () => (
  <div className='flex-none animate-pulse'>
    <div className='flex flex-col gap-2'>
      <div className='rounded-full md:h-40 md:w-40 w-28 h-28 bg-gray-300'></div>
      <div className='h-6 bg-gray-300 rounded w-20 mx-auto'></div>
    </div>
  </div>
);

const Categories = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='py-2 md:mt-[7rem] mt-[4rem] '>
      <div className='flex items-center justify-center space-x-5'>
        <div className='bg-[#5baef7] w-1 h-7'></div>
        <h1 className="font-poppins font-semibold md:text-4xl lg:text-5xl text-2xl">Shop By Category</h1>
      </div>
      <div className='horizontal-scroll-container flex mt-[2rem] gap-10 mx-4'>
        {loading ? (
          // Skeleton loader
          Array(7).fill().map((_, index) => <CategorySkeleton key={index} />)
        ) : (
          // Actual content
          categoryData.map((category, index) => (
            <div key={index} className='flex-none'>
              <Link className='flex flex-col gap-2' to={category.to}>
                <div className='h-min overflow-hidden rounded-full'>
                  <img
                    className='rounded-full md:h-40 md:w-40 sm:w-28 sm:h-28 w-24 h-24 hover:scale-125 transition-all duration-500 cursor-pointer object-cover '
                    loading='eager'
                    src={category.img}
                    alt={`Category ${index + 1}`}
                  />
                </div>
                <p className='md:text-xl text-base font-poppins text-balance  text-center'>{category.name}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Categories;