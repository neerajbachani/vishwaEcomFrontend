import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-teal-800 mb-8">Terms of Services</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">Welcome to Resin Gift Store. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service. Please read these terms carefully before using our site.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">By accessing and using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
            <p className="text-gray-700 leading-relaxed">If you do not agree with any part of these terms, you should not use our website.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">3. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">We reserve the right to modify or update these Terms of Service at any time without prior notice. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the updated terms.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">4. Use of Website</h2>
            <p className="text-gray-700 leading-relaxed">You agree to use our website for lawful purposes and in accordance with these Terms of Service.</p>
            <p className="text-gray-700 leading-relaxed">You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">5. Product Information and Pricing</h2>
            <p className="text-gray-700 leading-relaxed">At Resin Gift Store, we are committed to providing accurate descriptions and pricing for all our products. However, in the event of any errors, we reserve the right to correct inaccuracies and update product information as needed.</p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2">
              <li><strong>Prices and Availability:</strong> Product prices and availability may change without prior notice. We recommend checking back regularly for updated pricing and stock information.</li>
              <li><strong>Special Gift Packaging:</strong> We offer special gift packaging services to make your purchase even more memorable. Depending on the customization, an additional charge of ₹30 to ₹80 will be applied for this service.</li>
              <li><strong>Product Customization:</strong> If you wish to customize any product by adding elements such as names, dates, flowers, etc., please note that additional charges may apply, depending on the complexity of the customization.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">6. Order Acceptance</h2>
            <p className="text-gray-700 leading-relaxed">All orders are subject to acceptance and availability. We may refuse or cancel an order at our discretion.</p>
            <p className="text-gray-700 leading-relaxed">You will receive an order confirmation email once your order has been successfully placed.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">7. Shipping and Delivery</h2>
            <p className="text-gray-700 leading-relaxed">For information about shipping and delivery, please refer to our [Shipping Policy].</p>
            <p className="text-gray-700 leading-relaxed">Delivery times and shipping costs are subject to change based on factors such as location and shipping method.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">8. Returns and Refunds</h2>
            <p className="text-gray-700 leading-relaxed">Returns and refunds are only accepted if the product is broken upon receipt. An opening video of the parcel is mandatory to process a return or refund. For more details, please refer to our [Return and Refund Policy].</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">All content on our website, including but not limited to text, images, and logos, is the property of Resin Gift Store and is protected by copyright and other intellectual property laws.</p>
            <p className="text-gray-700 leading-relaxed">You may not reproduce, distribute, or otherwise use any content from our website without our prior written consent.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">Resin Gift Store shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or products.</p>
            <p className="text-gray-700 leading-relaxed">We do not warrant that our website will be error-free or uninterrupted.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat, India.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">If you have any questions or concerns about these Terms of Service, please contact us at +91 7863884525 or email at resingiftstore@gmail.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;