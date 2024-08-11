// SimilarProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SimilarProducts = ({ products, selectedSubCategory, selectedProductId }) => {
  // Filter products based on the selected subcategory and exclude the selected product
  const similarProducts = products.filter(product => 
    product.subCategory === selectedSubCategory && product.id !== selectedProductId
  );

  return (
    <div className=' mt-44' >
      <h2 className='text-5xl font-poppins text-secondary-dark-color text-center underline underline-offset-8 w-full' >Similar Products</h2>
      <div className="similar-products-grid mt-20 ">
        {similarProducts.map(product => (
          <div key={product.id} className="similar-product-card mx-20 w-[30rem] h-[30rem]">
            <a href={`/product-details/${product.id}`}>
              <img className=' w-[30rem] h-[30rem] rounded-md object-cover ' src={product.image} alt={product.name} />
              <h3 className='font-poppins text-4xl text-secondary-dark-color text-center font-semibold mt-2 ' >{product.name}</h3>
              <p className='font-poppins text-xl text-[#808080] text-center'>{product.price}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;

