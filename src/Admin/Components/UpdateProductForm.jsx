import { useState, useEffect } from "react";
import React from 'react';
import { Typography, Grid, TextField, Button } from "@mui/material";
import { Toaster } from 'react-hot-toast';
import { showSuccessToast, showErrorToast } from '../../user/components/toast';
import { useDispatch, useSelector } from "react-redux";
import { findProductById, updateProduct } from "../../user/redux/Product/Action";
import { useParams } from "react-router-dom";

const UpdateProductForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState({
    image: "",
    name: "",
    discountedPrice: "",
    price: "",
    discount: "",
    quantity: "0", // Initialize with "0" instead of empty string
    description1: "",
    description2: "",
    description3: "",
    details: "",
    weight: "",
  });

  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product } = useSelector((store) => store);

  useEffect(() => {
    dispatch(findProductById({productId}));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product.product) {
      // Ensure quantity is converted to string and has a default value
      const processedProduct = {
        ...product.product,
        quantity: product.product.quantity?.toString() || "0"
      };
      setProductData(prevState => ({
        ...prevState,
        ...processedProduct
      }));
    }
  }, [product.product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (descriptionField, event) => {
    const { value } = event.target;
    setProductData(prevState => ({
      ...prevState,
      [descriptionField]: value,
    }));
  };

  const handleKeyDown = (descriptionField, event) => {
    // ... (keeping existing handleKeyDown logic unchanged)
  };

  const validateForm = () => {
    const requiredFields = ['name', 'price', 'quantity'];
    const errors = [];

    requiredFields.forEach(field => {
      if (!productData[field]) {
        errors.push(`${field} is required`);
      }
    });

    // Validate numeric fields
    const numericFields = ['price', 'discountedPrice', 'discount', 'quantity', 'weight'];
    numericFields.forEach(field => {
      if (productData[field] && isNaN(Number(productData[field]))) {
        errors.push(`${field} must be a valid number`);
      }
    });

    // Validate quantity specifically
    if (Number(productData.quantity) < 0) {
      errors.push('Quantity cannot be negative');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => showErrorToast(error));
      return;
    }

    // Process the data before submission
    const submissionData = {
      ...productData,
      quantity: Number(productData.quantity), // Convert quantity to number
      price: Number(productData.price),
      discountedPrice: Number(productData.discountedPrice),
      discount: Number(productData.discount),
      weight: Number(productData.weight),
    };

    try {
      await dispatch(updateProduct({ ...submissionData, image: selectedFile }, productId));
    } catch (error) {
      console.error('Error updating product:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update product. Please try again.';
      showErrorToast(errorMessage);
    }
  };

  return (
    <div className="bg-[#000]">
      <Toaster/>
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10 text-center">
        Update Product
      </Typography>
      <form onSubmit={handleSubmit} className="createProductContainer min-h-screen">
        <Grid container spacing={2}>
          {/* Existing file input */}
          <Grid item xs={12}>
            <input
              type="file"
              name="image"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Grid>
          
          {/* Product Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </Grid>
        
          {/* Quantity Field */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
              inputProps={{ min: "0" }}
            />
          </Grid>

          {/* Existing price fields */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
              inputProps={{ min: "0" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
              inputProps={{ min: "0" }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discount"
              value={productData.discount}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          
          {[1, 2, 3].map((num) => (
            <Grid item xs={12} key={`description${num}`}>
              <TextField
                fullWidth
                label={`Description ${num}`}
                multiline
                name={`description${num}`}
                rows={5}
                onChange={(e) => handleDescriptionChange(`description${num}`, e)}
                onKeyDown={(e) => handleKeyDown(`description${num}`, e)}
                value={productData[`description${num}`]}
                placeholder={`Start typing...
• End a sentence with a period and press Enter for a new line in this field
• Press Shift+Enter for a new line without a period
• Press Enter alone to move to the next description field`}
                helperText="Format text with periods + Enter or Shift+Enter"
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Details"
              name="details"
              value={productData.details}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Product Weight in KG"
              name="weight"
              value={productData.weight}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UpdateProductForm;