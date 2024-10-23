

import { useEffect, useRef, useState } from 'react'
import React from 'react'
import WhatsAppButton from './Whatsapp'
import { Link, useNavigate } from 'react-router-dom'
import { addItemToCart, getCart } from "../../redux/Cart/Action"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findProductById, findProducts } from '../../redux/Product/Action'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { Button, Input, Skeleton } from '@mui/material';
import { FaEye, FaWhatsapp } from 'react-icons/fa'
import ProductDescription from './ProductDescription'

import { useMemo } from 'react';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline'


const processBulletPoints = (content) => {
  // First, check if content is already in HTML format with bullet points
  if (content.includes('<li>')) {
    return content;
  }

  // Split content into sentences, handling multiple types of sentence endings
  const sentences = content
    .split(/(?<=[.!?])\s+/)
    .filter(sentence => sentence.trim().length > 0);

  // Convert sentences into bullet points
  const bulletPoints = sentences.map(sentence => 
    sentence.trim().replace(/^[•\-\*]\s*/, '') // Remove existing bullet points if any
  );

  // Create HTML list
  return `<ul class="list-disc pl-5 space-y-2">
    ${bulletPoints.map(point => `<li>${point}</li>`).join('')}
  </ul>`;
};

const CollapsibleDetails = ({ title = "Product Details", content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const processedContent = useMemo(() => 
    processBulletPoints(content),
    [content]
  );

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <ChevronDoubleDownIcon
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-[500px] opacity-100' 
            : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div 
          className="p-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>
    </div>
  );
};
const ProductDetails = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [customizationNote, setCustomizationNote] = useState('');
  const [customizationImage, setCustomizationImage] = useState(null);
  // const [similarProducts, setSimilarProducts] = useState([]);

  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const data = { productId: productId, jwt };
    setIsLoading(true);
    dispatch(findProductById(data))
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false));
      dispatch(getCart(jwt))
  }, [productId, dispatch, jwt]);

  // useEffect(() => {
  //   if (product?.product) {
  //     const category = Object.keys(product?.product).find(key => 
  //       ['varmalaPreservation', 'wallClock', 'geodeArt', 'namePlate', 'navkarMantraFrame', 'resinSpecial', 'workshop'].includes(key) && product.product[key]
  //     );
      
  //     console.log('Selected category:', category);
      
  //     if (category) {
  //       dispatch(findProducts({ [category]: product?.product[category], pageSize: 4 }))
  //         .then(() => {
          
  //           if (product?.product) {
  //             setSimilarProducts(product?.products.filter(p => p._id !== product.product._id));
  //           } else {
  //             console.error('Unexpected response structure:', response);
  //             setError('Failed to load similar products');
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching similar products:', error);
  //           setError('Failed to load similar products');
  //         });
  //     } else {
  //       console.log('No matching category found');
  //     }
  //   }
  // }, [dispatch, ]);


   const handleAddToCart = () => {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('customizationNote', customizationNote);
        if (customizationImage) {
          formData.append('customizationImage', customizationImage);
        }
    
        dispatch(addItemToCart({ formData, jwt }));
        navigate('/cart');
      };
  const handleImageUpload = (event) => {
    setCustomizationImage(event.target.files[0]);
  };

  const handleWhatsAppClick = (productLink) => {
    const text = encodeURIComponent(`I'm interested in this product. Can you provide more details? ${window.location.origin}/products/id/${productLink}`);
    window.open(`https://wa.me/7863884525?text=${text}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/2 h-96" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }
  const hasDiscount = product.product.discount && product.product.discount > 0;
  const formattedDiscount = hasDiscount ? product.product.discount.toFixed(2) : null;

  if (!product.product?.details) return null;

  const sections = [
    {
      title: "Product Details",
      content: product.product?.details
    },
    // You can add more sections here if needed
  ];

  return (
    
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src={product?.product?.image}
              alt={product?.product?.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              onClick={() => setOpenLightbox(true)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-100"
              onClick={() => setOpenLightbox(true)}
            >
              <FaEye className="h-5 w-5" />
            </Button>
          </div>
          <Lightbox
            open={openLightbox}
            close={() => setOpenLightbox(false)}
            slides={[{ src: product.product.image }]}
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-poppins font-bold">{product?.product?.name}</h1>
          <div className="flex items-baseline flex-wrap gap-2">
        {hasDiscount ? (
          <>
            <span className="text-2xl font-semibold text-indigo-600">
              ₹{product.product?.discountedPrice?.toLocaleString()}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ₹{product.product?.price?.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-green-500 bg-green-50 px-2 py-1 rounded">
              {formattedDiscount}% off
            </span>
          </>
        ) : (
          <span className="text-2xl font-semibold text-gray-900">
            ₹{product.product?.price?.toLocaleString()}
          </span>
        )}
      </div>
      
     
          <div className="prose max-w-none">
          <ProductDescription product={product?.product} />
          <div className="space-y-4">
      {sections.map((section, index) => (
        <CollapsibleDetails
          key={index}
          title={section?.title}
          content={section?.content}
        />
      ))}
    </div>
          </div>
          
          <form className="mt-5 ">
         
        <h4 className="font-poppins font-semibold md:text-lg lg:text-xl text-md bg-gradient-to-r from-blue-500 to-black text-transparent bg-clip-text">
          Add Customization Note or Image (optional)
        </h4>
  <div className="mb-5">
    <label
      htmlFor="large-input"
      className="block mb-2 font-poppins text-xl font-medium text-[#808080] dark:text-white"
    >
      *Note
    </label>
    <input
      type="text"
      id="large-input"
      className="block w-full h-[5rem] p-4 text-gray-900 pb-24 text-sm font-poppins border border-light-text-color rounded-md "
      placeholder="Share your desired changes or customizations in your note."
      value={customizationNote}
      onChange={(e) => setCustomizationNote(e.target.value)}
    />
  </div>
</form>

<div className=' flex justify-between mt-5 ' >
            <label className="block">
                  <span className="sr-only">Upload Customization Image</span>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="block w-44 md:w-auto border border-gray-300 rounded-lg py-2 px-3 bg-white text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </label>
                <button 
  onClick={() => handleWhatsAppClick(product.product._id)} 
  className="flex items-center bg-white text-gray-800 p-2 px-4 rounded-full border-2 border-gray-300 hover:bg-green-600 hover:border-green-600 hover:text-[#fff] transition-colors duration-300"
>
  <FaWhatsapp className="text-xl sm:text-xl mr-2  text-green-600" />
  <span className="text-green-600 font-semibold hover:text-white transition-colors duration-300">WhatsApp</span>
</button>

            </div>

<button
                onClick={handleAddToCart}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3  font-medium hover:bg-black hover:text-[#BDE0FE]  bg-[#BDE0FE] text-[#000] hover:bg-light-text-color  transition duration-500 text-2xl font-poppins "
              >
                Add to Cart
              </button>
          <div className="flex space-x-4">
           
            

           
            
            
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default ProductDetails;