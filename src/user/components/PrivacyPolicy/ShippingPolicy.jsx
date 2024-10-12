import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-orange-800 mb-8">Shipping Policy</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
          <h2 className="text-3xl font-semibold text-orange-700 mb-6">Shipping Policy</h2>
          
          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">1. Overview</h3>
            <p className="text-gray-700 leading-relaxed">At Resin Gift Store, we are committed to delivering your orders in a timely and efficient manner. This Shipping Policy outlines our procedures and timelines for processing and shipping orders.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">2. Processing Time</h3>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Orders are typically processed within 1-2 business days.</li>
              <li>Please note that processing times may vary during peak seasons or holidays, as well as custom orders.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">3. Shipping Methods and Delivery Times</h3>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Orders are typically shipped within 2-4 working days after confirmation. You will receive a notification via SMS or email once your order has been shipped.</li>
              <li>Orders containing custom products will be shipped within 3-10 working days, depending on your location.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">4. Shipping Charges</h3>
            <p className="text-gray-700 leading-relaxed"><strong>All India:</strong> 50/-</p>
            <p className="text-gray-700 leading-relaxed"><strong>Orders Above 1 kg:</strong> Additional delivery charges may apply based on the weight and destination of the parcel.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">5. Order Tracking</h3>
            <p className="text-gray-700 leading-relaxed">Once your order has been shipped, you will receive a confirmation email with tracking information. You can track your order using the provided tracking number.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">6. Delivery Issues</h3>
            <p className="text-gray-700 leading-relaxed">If you experience any issues with your delivery, please contact our customer service team at resingiftstore@gmail.com / +91 7863884525. We will work with our shipping partners to resolve any problems promptly.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">7. Address Accuracy</h3>
            <p className="text-gray-700 leading-relaxed">Please ensure that your shipping address is accurate and complete. Resin Gift Store is not responsible for orders shipped to incorrect or incomplete addresses provided by the customer.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">8. Shipping Restrictions</h3>
            <p className="text-gray-700 leading-relaxed">We currently ship to most locations within India. For international orders, please contact us at +91 7863884525 to confirm availability.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">9. Returns and Exchanges</h3>
            <p className="text-gray-700 leading-relaxed">Please refer to our [Returns and Exchanges Policy] for information on returning or exchanging items. Shipping charges for returns and exchanges are the responsibility of the customer, unless the return is due to a mistake on our part.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-3">10. Contact Us</h3>
            <p className="text-gray-700 leading-relaxed">If you have any questions about our shipping policy or need assistance with your order, please contact us at +91 7863884525 or resingiftstore@gmail.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;