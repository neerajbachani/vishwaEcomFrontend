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
    quantity: "",
    description1: "",
    description2: "",
    description3: "",
    details: "",
    weight: "",
    // Add other fields as needed
  });

  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product } = useSelector((store) => store);

  useEffect(() => {
    dispatch(findProductById({productId}));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product.product) {
      setProductData(prevState => ({
        ...prevState,
        ...product.product
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
    if (event.key === 'Enter') {
      event.preventDefault();
      
      const { selectionStart, value } = event.target;
      const textBeforeCursor = value.substring(0, selectionStart);
      
      const endsWithPeriod = /\.\s*$/.test(textBeforeCursor);
      
      if (endsWithPeriod) {
        const newText = 
          value.substring(0, selectionStart) + 
          '\n\n' + 
          value.substring(selectionStart);
        
        setProductData(prevState => ({
          ...prevState,
          [descriptionField]: newText
        }));

        setTimeout(() => {
          const textarea = event.target;
          const newCursorPosition = selectionStart + 2;
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
      } else if (event.shiftKey) {
        const newText = 
          value.substring(0, selectionStart) + 
          '\n' + 
          value.substring(selectionStart);
        
        setProductData(prevState => ({
          ...prevState,
          [descriptionField]: newText
        }));

        setTimeout(() => {
          const textarea = event.target;
          const newCursorPosition = selectionStart + 1;
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
      } else {
        const currentNumber = parseInt(descriptionField.slice(-1));
        if (currentNumber < 3) {
          const nextField = `description${currentNumber + 1}`;
          const nextTextArea = document.querySelector(`textarea[name="${nextField}"]`);
          if (nextTextArea) {
            nextTextArea.focus();
          }
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...productData, image: selectedFile }, productId))
      .then(() => {
        showSuccessToast('Product updated successfully');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        showErrorToast('Failed to update product. Please try again.');
      });
  };

  return (
    <div className="bg-[#000]">
      <Toaster/>
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10 text-center">
        Update Product
      </Typography>
      <form onSubmit={handleSubmit} className="createProductContainer min-h-screen">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="file"
              name="image"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </Grid>
        
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
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