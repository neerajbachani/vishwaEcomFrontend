
import { FcGoogle } from "react-icons/fc";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Prachi Jain",
    location: "Mumbai",
    rating: 5,
    text: "Guys go and check out the Resin Gift Store or you can check out their website to get all the resin products. You can get each and every stuff required for your resin art at the best price with the best quality. Even they give you really quick response and receive your parcel on time and in a good condition."
  },
  {
    id: 2,
    name: "Shruthi H Chandrappa",
    location: "Karnataka",
    rating: 5,
    text: "Love the products collection and best quality of each product. Huge variety of items available on their website. Easy to order and pay. They respond well on Instagram DM too."
  },
  {
    id: 3,
    name: "Gauri Patel",
    location: "Chhattisgarh",
    rating: 5,
    text: "I just loved all the materials which I bought from your store, specially the miniatures are so pretty! I'm just in love with that. Thank you so much. I'll definitely shop again and try some new products. Once again thank you Resin Gift Store"
  },
  {
    id: 4,
    name: "Dikshita S",
    location: "Karnataka",
    rating: 5,
    text: "Resin Gift Store is MY FAVOURITE ONE for resin supplies! I mean amazing products and supplies at reasonable prices, and such lovely packaging ❤️ ✨ and faster delivery as well 😍 5 stars is very less for them coz they deserve more 😎"
  },
  {
    id: 5,
    name: "Ananya Sharma",
    location: "Delhi",
    rating: 5,
    text: "Exceptional quality resin and pigments! My artwork has improved significantly since switching to Resin Gift Store products. The customer support team is incredibly helpful and guided me in selecting the perfect materials for my projects."
  },
  {
    id: 6,
    name: "Rajesh Kumar",
    location: "Pune",
    rating: 5,
    text: "As a professional resin artist, I'm very particular about my supplies. Resin Gift Store never disappoints! Their UV resin is top-notch, and the molds are of premium quality. Fast shipping and secure packaging make them my go-to supplier."
  },
  {
    id: 7,
    name: "Meera Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Started my resin journey with Resin Gift store and couldn't be happier! Their starter kits are perfect for beginners, and the tutorial videos they provide are super helpful. The glitters and colors are simply amazing ✨"
  },
  {
    id: 8,
    name: "Kavita Desai",
    location: "Ahmedabad",
    rating: 5,
    text: "Ordered multiple times and each experience has been fantastic! The resin cures perfectly, and their color pigments are so vibrant. Love the new additions to their collection every month. Truly the best resin supplier in India! 🏆"
  }
];

const StarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, index) => (
      <span key={index} className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
    <StarRating rating={review.rating} />
    <p className="mt-4 flex-grow text-gray-600 text-sm md:text-base font-poppins">{review.text}</p>
    <div className="mt-4">
      <p className="font-semibold text-sm md:text-base font-poppins">- {review.name}</p>
      <p className="text-gray-500 text-xs md:text-sm font-poppins">{review.location}</p>
    </div>
  </div>
);

const NavigationButton = ({ direction, onClick, disabled }) => (
  <button 
    onClick={onClick}
    className={`absolute top-1/2 transform -translate-y-1/2 ${direction === 'left' ? '-left-4' : '-right-4'} 
                bg-white p-2 rounded-full shadow-lg z-10 transition-opacity duration-300
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
    disabled={disabled}
  >
    {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </button>
);

export default function Review() {
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleReviews = isMobile ? 1 : 4;

  const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setStartIndex((prev) => Math.min(reviews.length - visibleReviews, prev + 1));

  return (
    <div className="flex justify-center flex-col bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 font-poppins text-gray-800">
          What Our Customers Say
        </h2>
        <div className="relative">
          <NavigationButton direction="left" onClick={handlePrev} disabled={startIndex === 0} />
          <div className="flex gap-6 overflow-hidden">
            {reviews.slice(startIndex, startIndex + visibleReviews).map((review) => (
              <div key={review.id} className={`flex-none ${isMobile ? 'w-full' : 'w-1/4'}`}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
          <NavigationButton 
            direction="right" 
            onClick={handleNext} 
            disabled={startIndex >= reviews.length - visibleReviews} 
          />
        </div>
      </div>
      <div className="flex gap-3 md:gap-5 items-center justify-center mt-8">
        <FcGoogle className='w-10 h-10 md:w-14 md:h-14' />
        <div className='flex flex-col'>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-lg md:text-xl font-poppins'>4.9</p>
            <StarRating rating={5} />
          </div>
          <p className='text-sm md:text-base underline text-center cursor-pointer font-poppins text-blue-600 hover:text-blue-800 transition-colors duration-300'>
            View All Reviews
          </p>
        </div>
      </div>
    </div>
  );
}