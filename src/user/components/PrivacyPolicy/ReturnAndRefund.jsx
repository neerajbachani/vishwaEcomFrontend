import React from 'react';

const ReturnAndRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-red-800 mb-8">Return and Refund Policy</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">1. Overview</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>At Resin Gift Store, we are committed to ensuring the quality of our products. We have a strict policy regarding returns and refunds to maintain transparency and fairness. Please review our policy carefully.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">2. No Returns, No Exchange, and No Cancellations</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Once you buy a product, we do not accept returns, exchanges, or cancellations. Please check the product's size and color carefully in the images and description before you buy. Each item is checked for defects before shipping.</li>
              <li><strong>Custom or personalized items cannot be returned</strong> because they are made specifically for you.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">3. Return and Refund Eligibility</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>We only accept returns and refunds if the product is damaged or broken when you receive it. To request a return or refund, you must provide a video showing the product and packaging as you open it. Without this video, we cannot process returns, refunds, or exchanges.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">4. How to Report a Problem</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>If you receive a broken or damaged product during shipping, or missing items, you must contact us within 24 hours by emailing resingiftstore@gmail.com or contact +91 7863884525. Include a video showing the product being unpacked.</li>
              <li>Without this video, we cannot process any returns or refunds. Shipping costs are not refundable.</li>
              <li>We will review the video and decide if a refund or replacement is needed. We will get back to you within 2-5 working days.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">5. Video Requirements</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Your unboxing video should show the whole process, including the packaging and the product. The video must be one continuous take and not edited. Without this video, we cannot verify claims of damage or defects.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">6. Refunds</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Once we receive and confirm the damaged item, we will process your refund within 7 business days. Refunds will be sent to the original payment method. It may take extra time for your bank or credit card company to complete the refund.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">7. Exchanges</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>We do not offer exchanges. If you want a different item, follow the return process to get a refund and then place a new order.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">8. Non-Returnable Items</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Items that are made to order or customized as per customer specifications</li>
              <li>Any product that has been damaged due to customer mishandling or misuse.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about our Return and Refund Policy or need to report a damaged product, call <strong>+91 78638 84525</strong> or email <strong>resingiftstore@gmail.com</strong>. We're here to help you.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnAndRefund;