import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterest } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#313638] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Resin Gift Store</h2>
            <p className="text-gray-400"> Resin treasures crafted uniquely, each piece a heartfelt reflection of your story, bringing joy and memories to life.</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
  {[
    { name: 'All Products', link: '/products' }, 
    { name: 'Gallery', link: '/gallery' }, 
    { name: 'Digital Art', link: '/products?digitalArt=digitalartedition' },
    { name: 'Lippan Art', link: '/products?lippanArt=lippanartedition' },
    { name: 'Festival Special', link: '/products?festivalSpecial=diwali&festivalSpecial=rakhi' },
    { name: 'About Us', link: '/about-us' },
    { name: 'Contact Us', link: '/contact-us' },
   
  ].map((item) => (
    <li key={item.name} className="mb-2">
      <Link to={item.link} className="text-gray-400 hover:text-blue-400 transition-colors duration-300 relative group">
        {item.name}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </li>
  ))}
</ul>

          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <a href="https://www.google.com/maps/dir//223,+Artish_Isha's+Resin+Art+Studio,+Lotus+Elite,+Gotri+-+Sevasi+Rd,+near+Collabera,+New+Alkapuri,+Chandramauleshwar+Nagar,+Gotri,+Vadodara,+Gujarat+390021/@22.316283,73.130009,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x395fc933ad095567:0xf08f50e967d73000!2m2!1d73.1300194!2d22.3161492?hl=en&entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D" className="text-gray-400 hover:text-blue-300 mb-2">B - 101, Priyank residency, Mahadev Chowk, Mota varachha, Surat.</a>
            <p className="text-gray-400 mb-2">Phone: 7863884525</p>
            <p className="text-gray-400">Email: resingiftstore@gmail.com</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul>
  {[
    { name: 'Privacy Policy', link: '/privacy-policy' }, 
    { name: 'Terms & Conditions', link: '/terms&conditions' }, 
    { name: 'Shipping Policy', link: '/shipping-policy' },
    { name: 'Return & Cancellation', link: '/return&refund' },

   
  ].map((item) => (
    <li key={item.name} className="mb-2">
      <Link to={item.link} className="text-gray-400 hover:text-blue-400 transition-colors duration-300 relative group">
        {item.name}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </li>
  ))}
</ul>

          </div>
          
          <div className="mb-8">
    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
    <div className="flex space-x-4">
      {[ 
        { Icon: FaFacebookF, link: "https://www.facebook.com/share/ToQb7nY7Vw7wDAtc/?mibextid=qi2Omg" }, 
        { Icon: FaInstagram, link: "https://www.instagram.com/rtsybyviishh?igsh=dnBqcW12Z3UzaXRr" }, 
        { Icon: FaYoutube, link: "https://youtube.com/@ResinGiftStore?si=jKxMDNKgKbL9EnGj" },
        { Icon: FaPinterest, link: "https://pin.it/JIJM3y5nO" }

      ].map(({ Icon, link }, index) => (
        <a key={index} href={link} className="text-gray-400 hover:text-blue-400 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
          <Icon size={24} />
        </a>
      ))}
    </div>
</div>

        </div>
        
    
      </div>
    </footer>
  );
};

export default Footer;









