import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-teal-800 mb-8">Terms & Conditions</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {termsItems.map((item, index) => (
            <div key={index} className="p-6 border-b border-gray-200 last:border-b-0">
              <h2 className="text-2xl font-semibold text-teal-700 mb-4">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const termsItems = [
  {
    title: "Product Description and Orders",
    content: "The Company provides a variety of resin art products, including varmala preservation, resin items, jewelry, and raw materials. Product descriptions, including dimensions, materials, and images, are given for reference. Minor variations in color and texture may occur due to the distinctive characteristics of resin art. Orders can be placed through the Company's website or via WhatsApp, with customers responsible for ensuring all details are accurate and complete. The Company reserves the right to accept or reject any order and may cancel or modify orders as necessary."
  },
  {
    title: "Pricing and Payment",
    content: "The prices for resin art products are listed on the Company's website or communicated to the Customer before purchase. Prices may be changed at any time without prior notice. The Customer is required to pay the total amount, which includes the product price, applicable taxes, and any shipping or handling fees, as specified during the order process. We utilize Razorpay for processing payments. Neither we nor Razorpay store your card information on their servers. During payment processing, your data is encrypted according to the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction data is only retained for as long as needed to complete the transaction, after which it is not saved. Our payment gateway complies with PCI-DSS standards, which are managed by the PCI Security Standards Council—a collaborative effort involving brands like Visa, MasterCard, American Express, and Discover. These PCI-DSS requirements ensure the secure handling of credit card information by our store and its service providers. For further details, you may also review Razorpay's terms and conditions at https://razorpay.com."
  },
  {
    title: "Shipping and Delivery",
    content: "The Company will make reasonable efforts to ship products within the estimated timeframe provided to the Customer. However, delivery dates are not guaranteed, and the Company is not responsible for delays caused by unforeseen events or third-party shipping carriers. The Customer is responsible for providing accurate shipping information. Any extra fees resulting from incorrect or incomplete address details will be the Customer's responsibility. The risk of loss or damage to the products transfers to the Customer upon delivery. Customers are advised to inspect the products upon receipt and report any issues to the Company within a reasonable period."
  },
  {
    title: "Returns and Refunds",
    content: "No Returns No Exchange and No Cancellations Policy. Resin Gift Store does not provide with the option to refund or exchange the product once purchased. The exact size and color are mentioned to avoid the need to exchange the product, so check images and read description before purchasing. Furthermore, the Quality Check team checks each product to ensure it does not have any defects. However, in case of any manufacturing defect, damaged item in transit or missing item in order, you can register a complaint with-in 48 hours by sending us an email at resingiftstore@gmail.com. The Company is committed to ensuring customer satisfaction. If a Customer receives a damaged or defective product, they must provide a proper video of the order being unpacked. Without proof of an unboxing video, the Company cannot verify that the product received is defective. Returns or refunds for reasons other than damage or defects may be considered at the Company's discretion and may be subject to a restocking fee and the cost of return shipping. (The shipping charges are non-refundable.) Custom or commissioned resin art products are generally non-refundable, as these items are personalized to individual preferences. Customers should understand that not all customized products appeal to everyone, so custom items cannot be accepted for return. The team will respond to the complaint query within 2- 5 working days and get in touch with you. If you are eligible for the refund or replacement, the team will communicate with you and take the needful steps."
  },
  {
    title: "RTO (Return) Due to Customer Error",
    content: "If a shipment is returned because of a mistake or oversight by the customer—such as providing incorrect or incomplete address details, incorrect contact information, failing to respond to calls from the courier or Resin Gift Store, or not being available to receive the delivery—the customer will be responsible for covering both the return-to-origin (RTO) charges and the costs of reshipping the parcel. Order cancellations will not be accepted in such cases."
  },
  {
    title: "Products or Services",
    content: "Some products or services may be available exclusively through our website. These items might have limited availability and can only be returned or exchanged according to our Return Policy. We strive to accurately display the colors and images of our products as seen in the store. However, we cannot guarantee that the colors displayed on your computer monitor will be exact. We may also limit the quantities of any products or services we offer. Product descriptions and pricing are subject to change at any time without notice, and we may discontinue any product at our discretion. Offers for products or services on this site are void where prohibited. We do not guarantee that the quality of any products, services, information, or other materials purchased or obtained will meet your expectations, nor do we guarantee that any errors in the service will be corrected."
  }
];

export default TermsAndConditions;