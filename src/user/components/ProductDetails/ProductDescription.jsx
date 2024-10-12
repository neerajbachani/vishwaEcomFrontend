import React from 'react';

const ProductDescription = ({ product }) => {
  // Function to format description paragraphs
  const formatDescription = (description) => {
    if (!description) return null;
    
    // Split the description by double line breaks (created when admin uses period + Enter)
    const paragraphs = description.split('\n\n').filter(Boolean);
    
    if (paragraphs.length === 0) return null;

    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-600 font-poppins leading-relaxed">
            {paragraph.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex < paragraph.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>
    );
  };

  // Only show descriptions that exist
  const descriptions = [
    product?.description1,
    product?.description2,
    product?.description3
  ].filter(Boolean);

  if (descriptions.length === 0) return null;

  return (
    <div className="sm:mt-8 mt-4">
      <h3 className="text-xl font-semibold font-poppins mb-4">Product Description</h3>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {descriptions.map((description, index) => (
          <div key={index} className={index !== 0 ? 'mt-6' : ''}>
            {index !== 0 && <div className="border-t border-gray-100 mb-6" />}
            {formatDescription(description)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;