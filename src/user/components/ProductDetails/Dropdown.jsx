// Dropdown.jsx
import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-600"
        >
          {selectedOption || 'Select an option'}
          {isOpen ? <HiChevronUp className="ml-2" /> : <HiChevronDown className="ml-2" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {selectedOption && (
        <div className="mt-2 p-4 bg-gray-100 border border-gray-200 rounded-md">
          {/* Display additional content based on selected option */}
          {selectedOption === 'Details' && <p>Product Details: Lorem ipsum dolor sit amet.</p>}
          {selectedOption === 'Highlights' && <p>Product Highlights: Sed ut perspiciatis unde omnis iste natus error.</p>}
          {selectedOption === 'Ratings' && <p>Product Ratings: 4.5/5 stars based on customer reviews.</p>}
        </div>
      )}
    </div>
  );
};

export default Dropdown;



