import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-orange-800 mb-8">Shipping Policy</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {shippingItems.map((item, index) => (
            <div key={index} className="p-6 border-b border-gray-200 last:border-b-0">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const shippingItems = [
  {
    title: "Standard Shipping",
    content: "Orders are typically shipped within 2-4 working days after confirmation. You will receive a notification via SMS or email once your order has been shipped."
  },
  {
    title: "Custom Product Shipping",
    content: "Orders containing custom products will be shipped within 5-10 working days, depending on your location."
  },
  {
    title: "Order Changes",
    content: "Once an order is confirmed, no changes are allowed. This includes cancellations, additions, product changes, or changes to coupon codes. Please review all details carefully before confirming your order."
  },
  {
    title: "Delays and Unavailability",
    content: "If any product in your order becomes unavailable or experiences delays, we will contact you within 1-2 working days via phone or message to inform you of the possible delays."
  }
];

export default ShippingPolicy;