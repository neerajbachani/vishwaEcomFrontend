import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">Privacy Policy</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Privacy Policy</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold mt-4 mb-2">1. Overview</h3>
              <p>At Resin Gift Store, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website and services.</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">2. Information We Collect</h3>
              <p>We collect the following types of information:</p>
              <ul className="list-disc list-inside ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address.</li>
                <li><strong>Order Information:</strong> Details about your purchases, including product and payment information.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">3. How We Use Your Information</h3>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Process and fulfill orders.</li>
                <li>Communicate with you regarding your orders, including shipping updates and customer service inquiries.</li>
                <li>Improve our website and services based on your feedback and usage patterns.</li>
                <li>Send promotional materials and updates, if you have opted in to receive them.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">4. Sharing Your Information</h3>
              <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc list-inside ml-4">
                <li><strong>Service Providers:</strong> Third-party companies that assist us in processing orders, managing payments, and shipping products.</li>
                <li><strong>Legal Requirements:</strong> Authorities if required by law to comply with legal processes or protect our rights.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">5. Data Security</h3>
              <p>We implement security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">6. Cookies and Tracking Technologies</h3>
              <p>Our website uses cookies and other tracking technologies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and track your visits. You can manage your cookie preferences through your browser settings.</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">7. Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Access and update your personal information.</li>
                <li>Request deletion of your data, subject to legal and contractual obligations.</li>
                <li>Opt-out of receiving promotional communications from us.</li>
              </ul>
              <p>To exercise these rights, please contact us at <strong>resingiftstore@gmail.com</strong> or <strong>+91 7863884525</strong>.</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">8. Changes to This Privacy Policy</h3>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of our website constitutes acceptance of the updated policy.</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">9. Contact Us</h3>
              <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
              <ul className="list-disc list-inside ml-4">
                <li><strong>Email:</strong> resingiftstore@gmail.com</li>
                <li><strong>Phone:</strong> +91 7863884525</li>
              </ul>
              <p>We are here to help and address any issues you may have.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;