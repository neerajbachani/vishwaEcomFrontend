import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import productData from '../../user/productData';

const ProductDetailsPage = () => {
  
  // Get the productId from the URL parameters
  const { productId } = useParams();

  // Find the selected product based on productId
  const selectedProduct = productData.find(product => product.id === parseInt(productId, 10));

  const similarProducts = productData.filter(
    (product) => product.category === selectedProduct.category && product.id !== productId
  );
  // Render the ProductDetails component for the selected product
  return (
    <>
      {selectedProduct && <ProductDetails product={selectedProduct} productData={similarProducts} selectedSubcategories={[]} />}
    </>
  );
};

export default ProductDetailsPage;
