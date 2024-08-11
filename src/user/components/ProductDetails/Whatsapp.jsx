// WhatsAppButton.js
import React from 'react';


const WhatsAppButton = () => {
    const handleWhatsAppShare = () => {
        const phoneNumber = '919429350252'; // Replace with your business phone number
        const deepLink = `whatsapp://send?phone=${encodeURIComponent(phoneNumber)}`;
        window.open(deepLink, '_blank');
      };

  return (
    <button 
    className="whatsapp-button bg-[#075e54] sm:p-3 p-2 text-md sm:text-xl rounded-md text-[#fff]"
    onClick={handleWhatsAppShare}
    >
      Share on WhatsApp
    </button>
  );
};

export default WhatsAppButton;
