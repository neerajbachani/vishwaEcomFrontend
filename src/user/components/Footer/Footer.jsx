import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { BsPinterest } from 'react-icons/bs';

function Footer() {
  const socialMediaIcons = [
    {
      icon: FaInstagram,
      alt: "instagram",
      link: "https://www.instagram.com/rtsybyviishh?igsh=dnBqcW12Z3UzaXRr"
    },
    {
      icon: BsPinterest,
      alt: "pinteres",
      link: "https://pin.it/JIJM3y5nO"
    },
    {
      icon: FaFacebook,
      alt: "facebook",
      link: "https://www.facebook.com/share/ToQb7nY7Vw7wDAtc/?mibextid=qi2Omg"
    },
    {
      icon: FaYoutube,
      alt: "youtube",
      link: "https://youtube.com/@ResinGiftStore?si=jKxMDNKgKbL9EnGj"
    }
  ];
  return (
    <>
      <footer className="">
        <div className="container mx-auto px-5 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start md:gap-[5rem] text-left">
            <div className="flex flex-col w-full md:w-1/2 md:p-0 py-4 gap-8">
              <img
                src='https://res.cloudinary.com/dkhsnhjrh/image/upload/v1708707479/2_igcdbk.png'
                alt="footer_logo"
                className="md:w-[18rem] w-[12rem] mx-auto md:mx-0 "
              />
              <p className="text-[15px] font-medium text-[#646464]">
                Resin treasures crafted uniquely, each piece a heartfelt reflection of your story, bringing joy and memories to life.
              </p>
              <div className="flex gap-7 text-[#646464] justify-center md:justify-start">
                {socialMediaIcons.map(({ icon: Icon, alt, link }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#efefef] p-2 rounded-full hover:bg-[#ff0366] hover:text-white transition-all duration-300 flex items-center justify-center"
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-row justify-between w-full md:w-auto md:gap-[2.5rem] lg:gap-[5rem]">
              <div className="flex flex-col gap-8 relative">
                <p className="text-[22px] font-bold footer-main">Quick Links</p>
                <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#ff0366]"></span>
                <div className="flex flex-col gap-4">
                  <Link to='/products' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    All Products
                  </Link>
                  <Link to='/products?resinRawMaterials=rawcollections' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    Raw Materials
                  </Link>
                  <Link to='/products?resin=wallclock' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    Wall Clock
                  </Link>
                  <Link to='/about-us' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    About Us
                  </Link>
                  <Link to='/contact-us' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    Contact us
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-8 relative">
                <p className="text-[22px] font-bold footer-main">More Links</p>
                <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#ff0366]"></span>
                <div className="flex flex-col gap-4">
                  <Link to='/products?business=businessplate' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    Business Plate
                  </Link>
                  <Link to='/products?digitalArt=digitalartedition' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    Digital Art
                  </Link>
                  <Link to='/products?lippanArt=lippanartedition' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    Lippan Art
                  </Link>
                  <Link to='/products?vintage=vinatgeExclusive' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    Vintage
                  </Link>
                  <Link to='/products?resin=photoframes' className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
                    Photo Frames
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;




