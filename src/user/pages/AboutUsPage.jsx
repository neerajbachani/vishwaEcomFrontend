import React from 'react'

import { TextField, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
   
  };
  return (
    <div>
  
        {/* About Banner */}
        <section className=" mt-10 ">
          <img src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710614079/s254093505207171772_p406_i15_w4696_diinow.webp" alt="" className=" h-[20rem] object-cover  w-full" />
        </section>


        <div className=' md:mt-16 mt-10 ' >
          <h1 className=' text-4xl  text-secondary-dark-color font-poppins font-semibold text-center ' >Transform Your Space with Resin Art</h1>
          <h2 className=' max-w-[85rem] mt-5 mx-auto text-xl tracking-wide text-secondary-dark-color font-poppins font-normal text-center' >Dive into a World of Harmony and Inclusivity. Every resin piece is crafted with care, ensuring it speaks to your style and satisfaction.</h2>

          <div className=' mt-28 flex gap-10   md:gap-20 flex-wrap justify-center' >
            <div className=' border-2 border-primarycolor border-dotted md:px-10 md:py-7 px-7 py-5 rounded-lg flex flex-col gap-  ' >
              <p className=' md:text-5xl text-3xl  font-poppins font-bold text-primarycolor text-center ' > +3K </p>
              <p className=' md:text-2xl text-xl font-poppins font-medium text-primarycolor text-center ' > Products Delivered </p>

            </div>
            <div className=' border-2 border-primarycolor border-dotted md:px-10 md:py-7 px-7 py-5 rounded-lg flex flex-col gap-2  ' >
              <p className=' md:text-5xl text-3xl font-poppins font-bold text-primarycolor text-center ' > +1K</p>
              <p className=' md:text-2xl text-xl font-poppins font-medium text-primarycolor text-center ' > Satisfied Customers </p>

            </div>
            <div className=' border-2 border-primarycolor border-dotted md:px-10 md:py-7 px-7 py-5 rounded-lg flex flex-col gap-2  ' >
              <p className=' md:text-5xl text-3xl font-poppins font-bold text-primarycolor text-center ' > +3.5k </p>
              <p className=' md:text-2xl text-xl font-poppins font-medium text-primarycolor text-center ' >Products in Stock </p>

            </div>


          </div>
          <div>

          </div>
        </div>

        {/* <div className=' bg-[#edede9] mt-36 block  md:flex py-28  items-center  ' >

          <div className=' w-[50rem] ' >
            <img className='  h-[30rem] lg:h-[40rem] w-[100%]  object-cover hidden md:block  ' src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710568440/GeodeArt1_veiuki.jpg" />
          </div>

          <div className=' md:max-w-2xl mx-10 ' >
            <h1 className='text-5xl  text-secondary-dark-color font-poppins font-semibold md:text-left text-center' >About Us</h1>
            <p className='text-xl mt-10 text-secondary-dark-color font-poppins font-thin md:text-left text-center' >Established in 2023, our Resin Gift Store stands as a digital beacon for aficionados of unique, delicate, and captivating resin creations. Fusing the elegance of resin art with artisanal craftsmanship, we proudly highlight "Made In India" ingenuity in our curated collection.
              <ul></ul>
              Welcome to Resin Gift Store!
At Resin Gift Store, we pride ourselves on offering a wide range of beautifully crafted resin products, digital art, resin raw materials, vintage work, frames, and festival specials. Our mission is to bring joy and elegance to your spaces with unique home decor items that reflect your personal style. Based in Surat, Gujarat, India, we are dedicated to providing our customers with high-quality, customizable products at affordable prices.
 We find great joy in anticipating the delight you'll experience as you delve into our resin treasures, wishing for each artwork to illuminate your space and spark genuine appreciation. As we grow, our commitment remains unwavering: to bring you the finest in resin artistry while championing the rich tapestry of Indian craftsmanship.</p>
          </div>

        </div> */}
        <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710614079/s254093505207171772_p406_i15_w4696_diinow.webp"
              alt="Resin Gift Store"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <h1 className="text-5xl font-poppins font-bold mb-6 text-secondary-dark-color">Welcome to Resin Gift Store!</h1>
            <p className="mb-6 font-poppins text-xl text-gray-700">
              At Resin Gift Store, we pride ourselves on offering a wide range of beautifully crafted resin products, digital art, resin raw materials, vintage work, frames, and festival specials. Our mission is to bring joy and elegance to your spaces with unique home decor items that reflect your personal style. Based in Surat, Gujarat, India, we are dedicated to providing our customers with high-quality, customizable products at affordable prices.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-4xl font-poppins font-semibold mb-4 text-secondary-dark-color">Who We Are</h2>
          <p className="mb-6 text-xl font-poppins text-gray-700">
            Established in 2023, Resin Gift Store stands as a digital beacon for aficionados of unique, delicate, and captivating resin creations. Fusing the elegance of resin art with artisanal craftsmanship, we proudly highlight "Made In India" ingenuity in our curated collection. Vishwa, hailing from Gujarat, India, is passionate about art and craftsmanship, finding great joy in providing resin treasures that illuminate spaces and spark genuine appreciation.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-4xl font-poppins font-semibold mb-4 text-secondary-dark-color">Why Us?</h2>
          <ul className="list-disc text-xl list-inside font-poppins mb-6 text-gray-700">
            <li>Affordable Prices: We offer products at prices lower than the market rate.</li>
            <li>Customization: Every product can be customized to match your personal preferences.</li>
            <li>Special Gift Packaging: We offer special gift packaging services.</li>
            <li>Customer Satisfaction: Our primary goal is to ensure customer happiness.</li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-4xl font-semibold mb-4 text-secondary-dark-color font-poppins ">Our Mission</h2>
          <p className="mb-6 text-xl font-poppins text-gray-700">
            Our mission is to enable Indian consumers to renovate their spaces with a unique set of home decor items. We strive to provide an extensive range of products that cater to diverse tastes and preferences, all at budget-friendly prices.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-4xl font-semibold mb-4 font-poppins text-secondary-dark-color">Our Vision</h2>
          <p className="mb-6 font-poppins text-xl text-gray-700">
            We aim to establish a unique perspective among shoppers by offering distinctive and high-quality products. Our vision is to edge out the competition and be recognized as the best home decor and gifting brand in India. We are committed to creating a happy place for our customers by providing products that bring joy and beauty to their lives.
          </p>
        </div>

        <div className="mt-12">
          <p className="text-gray-700 italic font-poppins text-xl text-secondary-dark-color ">
            Thank you for visiting Resin Gift Store. We look forward to helping you find the perfect pieces to enhance your space and bring joy to your life. Our commitment remains unwavering: to bring you the finest in resin artistry while championing the rich tapestry of Indian craftsmanship.
          </p>
        </div>
      </div>
    </div>
<div className=' flex gap-2'>
    <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="flex w-1/2 flex-wrap">
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230509/WhatsApp_Image_2024-07-14_at_12.14.12_2_hna7qr.jpg" />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230509/WhatsApp_Image_2024-07-14_at_12.14.11_1_s25nay.jpg" />
              </div>
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230509/WhatsApp_Image_2024-07-14_at_12.14.11_3_ahihhg.jpg" />
              </div>
            </div>
            <div className="flex w-1/2 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230509/WhatsApp_Image_2024-07-14_at_12.14.12_a5ykbi.jpg" />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230510/WhatsApp_Image_2024-07-14_at_12.14.11_xusff4.jpg" />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230510/WhatsApp_Image_2024-07-14_at_12.14.10_1_zhehkq.jpg" />
              </div>
            </div>
          
          </div>
          <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="flex w-1/2 flex-wrap">
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230510/WhatsApp_Image_2024-07-14_at_12.14.10_el4dwt.jpg" />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230511/WhatsApp_Image_2024-07-14_at_12.14.09_1_crsepf.jpg" />
              </div>
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230511/WhatsApp_Image_2024-07-14_at_12.14.09_jq8i56.jpg" />
              </div>
            </div>
            <div className="flex w-1/2 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230509/WhatsApp_Image_2024-07-14_at_12.14.12_1_qapqke.jpg" />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230510/WhatsApp_Image_2024-07-14_at_12.14.10_2_rm50yj.jpg" />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1721230513/WhatsApp_Image_2024-07-14_at_12.14.11_2_nzr01s.jpg" />
              </div>
            </div>
          </div>
          </div>
          
        
        <Link to='/gallery' className=" relative inline-flex items-center justify-center md:px-9 px-2 py-1  overflow-hidden font-medium font-poppins text-indigo-600 transition duration-300 border border-secondary-dark-color ease-out rounded-full shadow-md   group">
<span className="absolute inset-0 flex items-center justify-center w-full h-full text-[#fff] duration-300 -translate-x-full bg-primarycolor group-hover:translate-x-0 ease">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease md:text-2xl text-lg text-primarycolor">Explore Gallery</span>
<span className="relative invisible">Explore Gallery</span>
</Link>
        </div>
       


        

        


       
      

  )
}

export default AboutUsPage