import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">Privacy Policy</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {policyItems.map((item, index) => (
            <div key={index} className="p-6 border-b border-gray-200 last:border-b-0">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const policyItems = [
  {
    title: "Information Collection",
    content: "The Company may gather personal details from Customers, such as names, contact information (including email address and phone number), shipping addresses, and payment details. This information is collected when Customers place orders, interact with Company representatives, sign up for newsletters or promotions, or voluntarily provide details in other ways."
  },
  {
    title: "Information Sharing",
    content: "The Company may share personal information with reliable third-party service providers, like shipping carriers or payment processors, to assist with order fulfillment, delivery, and payment processing. These third parties are required to protect the personal information and use it only for the intended purposes."
  },
  {
    title: "Return Policy",
    content: "Returns are not accepted for customized products. However, returns may be considered for non-customized items. Please note that refunds cannot be issued for customized products."
  },
  {
    title: "Floral Work Policy",
    content: "If you provide us with your own rose or gajra, please be aware that each rose or petal color may vary. The images we show are of the flowers sent to us by clients, which may differ from those we purchase due to variations in natural drying processes. Complaints about color differences, such as the gajra not being as red as shown in our videos, will not be addressed as the examples shown are client-provided. We appreciate your understanding and encourage you to send your own materials if preferred."
  },
  {
    title: "Dried Packet Flower Work",
    content: "When using dried packet flowers for our resin products, it is acceptable to receive items similar to those in our articles but with different flowers and leaves of the same theme. Stock availability can vary, and restocking can take up to a month due to the personal importation of these materials. Minor variations are expected and acceptable in resin art."
  },
  {
    title: "Same Design and Colour",
    content: "As a handmade business, we do not use machines to create exact replicas of our designs. Even if machines could, they would not replicate the uniqueness of handmade resin art. The flow of colors in resin art can affect the final design in unpredictable ways, and slight differences in color may occur due to variations in new supplies."
  },
  {
    title: "Parcel Delivery",
    content: "Delivery usually takes 3-5 working days. For urgent delivery, we can arrange overnight service at the customer's expense. If a customer requests urgent delivery but does not cover the additional charges, we are not responsible for any resulting delays."
  },
  {
    title: "Cookies and Tracking Technologies",
    content: "The Company's website may use cookies or similar tracking technologies to improve the browsing experience and collect data on website usage patterns."
  },
  {
    title: "Updates to the Privacy Policy",
    content: "The Company may revise this Privacy Policy periodically. Customers are encouraged to check the Policy regularly to remain informed about how their information is used and safeguarded."
  },
  {
    title: "Contact Information",
    content: "For any questions, concerns, or requests regarding this Privacy Policy or the management of personal information, Customers can reach out to the Company using the contact details provided."
  },
  {
    title: "Changes to This Privacy Policy",
    content: "We reserve the right to modify this privacy policy at any time. We recommend reviewing it frequently. Changes will take effect immediately upon being posted on our website. If significant updates are made, we will inform you here to ensure you understand how we collect, use, and disclose your information."
  }
];

export default PrivacyPolicy;