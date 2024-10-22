import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOurFeaturedProduct } from '../../redux/OurFeaturedProduct/Action';
import  DirectionAwareHover  from '../DirectionAwareHover';
import "../button.css"
import { Link } from 'react-router-dom';

const OurFeaturedCollections = () => {
  const dispatch = useDispatch();
  const { ourFeaturedProduct } = useSelector((store) => store);
  const featuredProducts = ourFeaturedProduct.ourFeaturedProducts || [];
  console.log("feature hai ji",featuredProducts)

  useEffect(() => {
    dispatch(getOurFeaturedProduct());
  }, [dispatch]);

  return (
    <>
  
      <div className='max-w-5xl mx-auto' >
      <div className=' flex   items-center justify-center md:mt-[7rem] mt-[4rem] space-x-5 '>
          <div className=' bg-[#5baef7] w-1 h-7 '></div>
        <h1 className="  font-poppins font-semibold md:text-4xl text-2xl     ">
          
        Featured Raw Materials
      </h1>
      </div>
        <div className='py-5 grid md:grid-cols-3 grid-cols-2 gap-5' >
          <div className='flex flex-col gap-2'>
            {featuredProducts.length > 0 && (
              <Link to={featuredProducts[0]?.link}>
               <DirectionAwareHover imageUrl={featuredProducts[0].image} className='w-full md:h-[16rem] h-[10rem] object-cover cursor-pointer '>
                <p>{featuredProducts[0].title}</p>
              </DirectionAwareHover>
              </Link>
             
            )}
            {featuredProducts.length > 1 && (
              <Link to={featuredProducts[1]?.link}>
              <DirectionAwareHover imageUrl={featuredProducts[1].image} className='w-full md:h-[16rem] h-[10rem]  object-cover'>
                
                <p>{featuredProducts[1].title}</p>
              </DirectionAwareHover>
              </Link>
            )}
          </div>
          <div>
            {featuredProducts.length > 2 && (
              <Link to={featuredProducts[2]?.link}>
              <DirectionAwareHover imageUrl={featuredProducts[2].image} className='w-full md:h-[32.5rem] h-[20.25rem] object-cover'>
              
                <p>{featuredProducts[2].title}</p>
              </DirectionAwareHover>
              </Link>
            )}
          </div>
          <div className='grid grid-flow-col md:flex md:flex-col col-span-2 md:col-span-1 md:gap-2 gap-5'>
            {featuredProducts.length > 3 && (
              <Link to={featuredProducts[3]?.link}>
              <DirectionAwareHover imageUrl={featuredProducts[3].image} className='w-full md:h-[16rem] h-[10rem] object-cover'>
                <p>{featuredProducts[3].title}</p>
              </DirectionAwareHover>
              </Link>
            )}
            {featuredProducts.length > 4 && (
              <Link to={featuredProducts[4]?.link}>
              <DirectionAwareHover imageUrl={featuredProducts[4].image}  className='w-full md:h-[16rem] h-[10rem]  object-cover'>
                <p>{featuredProducts[4].title}</p>
              </DirectionAwareHover>
              </Link>
            )}
          </div>
        </div>
        <div id="nav-part2" className=' flex justify-center items-center text-center' >
          <Link to='/products?resinRawMaterials=rawcollections'><h4 className=' px-4 py-2' ><a href="/products?resinRawMaterials=rawcollections">See All</a></h4></Link>
      </div>
      </div>
     
    </>
  );
};

export default OurFeaturedCollections;