import { useEffect, useState } from "react";
import React from 'react'
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";


import { Fragment } from "react";

import { useDispatch } from "react-redux";
import { createProduct, findProducts, resetProductOrders } from "../../user/redux/Product/Action";
import { Toaster, toast } from 'react-hot-toast';
import { showSuccessToast, showErrorToast } from '../../user/components/toast';
import { useSelector } from "react-redux";


 

const CreateProductForm = () => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState({
    image: "",
    name: "",
    details: "",
    color: "",
    discount: "",
    weight: "",
    price: "",
    discountPercent: "",
    discountedPrice: "",
    quantity: "",
    resin: "",
          jewel: "",
          resinRawMaterials: "",
          festivalSpecial: "",
          digitalArt: "",
          business: "",
          lippanArt: "",
          geodeArt: "",
          vintage: "",
    description1: "",
    description2: "",
    description3: "",
    productOrder: 0,

  });
const dispatch=useDispatch();
const products = useSelector(state => state.product.products.content); 
console.log("products hai ",products)

useEffect(() => {
  dispatch(findProducts({})); // Fetch all products when component mounts
}, [dispatch]);
const jwt=localStorage.getItem("jwt")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleKeyDown = (descriptionField, event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      const { selectionStart, value } = event.target;
      const textBeforeCursor = value.substring(0, selectionStart);
      
      // Check if the last non-whitespace character before the cursor is a period
      const endsWithPeriod = /\.\s*$/.test(textBeforeCursor);
      
      if (endsWithPeriod) {
        // Insert a new line at cursor position
        const newText = 
          value.substring(0, selectionStart) + 
          '\n\n' + 
          value.substring(selectionStart);
        
        setProductData(prevState => ({
          ...prevState,
          [descriptionField]: newText
        }));

        // We need to wait for the state to update and the textarea to re-render
        setTimeout(() => {
          const textarea = event.target;
          const newCursorPosition = selectionStart + 2; // +2 for the two newline characters
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
      } else if (event.shiftKey) {
        // If Shift+Enter is pressed, always insert a new line
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
        // If it's just Enter (no period, no Shift), move to next description field
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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const highestOrder = products.length > 0 
    ? Math.max(...products.map(p => p.productOrder || 0))
    : 0;
  const newProductOrder = highestOrder + 1;
    dispatch(createProduct({ ...productData, image: selectedFile, productOrder: newProductOrder }))
      .then(() => {
        setProductData({
          image: '',
          name: '',
          details: '',
          color: '',
          discount: '',
          weight: '',
          price: '',
          discountPercent: '',
          discountedPrice: '',
          quantity: '',
          resin: "",
          jewel: "",
          resinRawMaterials: "",
          festivalSpecial: "",
          digitalArt: "",
          business: "",
          lippanArt: "",
          geodeArt: "",
          vintage: "",
          description1: '',
          description2: '',
          description3: '',
          productOrder: 0,
        });
        setSelectedFile(null);
        // showSuccessToast('Product created successfully');
      })
      .catch((error) => {
        console.log('error');
        // showErrorToast('Failed to create product. Please try again.');
      });
  };

 
  return (
    <><Toaster />
   
    <div className=" bg-[#1b1b1b]">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Add New Product
  
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        
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
              label="Name"
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
              label="Weight"
              name="weight"
              value={productData.weight}
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
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Resin</InputLabel>
              <Select
                name="resin"
                value={productData.resin}
                onChange={handleChange}
                label="Resin"
              >
                <MenuItem value="wallclock">Wall Clock</MenuItem>
                <MenuItem value="keychains">Keychains</MenuItem>
                <MenuItem value="poojathali">Pooja Thali</MenuItem>
                <MenuItem value="homedecor">Home Decor</MenuItem>
                <MenuItem value="photoframes">Photo Frames</MenuItem>
                <MenuItem value="photokeychains">Photo Keychains</MenuItem>
                <MenuItem value="photoframes">Photo Frames</MenuItem>
                <MenuItem value="phonecase">Phone Case</MenuItem>
                <MenuItem value="tray">Tray</MenuItem>
                <MenuItem value="marriagespecial">Marriage Special</MenuItem>
                <MenuItem value="mantraframe">Mantra Frame</MenuItem>
                <MenuItem value="nameplate">Name Plate</MenuItem>
                <MenuItem value="nailplatter">Nail Platter</MenuItem>
                <MenuItem value="book">Book</MenuItem>
                <MenuItem value="chess">Chess</MenuItem>
                <MenuItem value="coaster">Coaster</MenuItem>








              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Jewel</InputLabel>
              <Select
                name="jewel"
                value={productData.jewel}
                onChange={handleChange}
                label="Jewel"
              >
                <MenuItem value="bracelet">Bracelet</MenuItem>
                <MenuItem value="earrings">Earrings</MenuItem>
                <MenuItem value="pendant">Pendant</MenuItem>
                <MenuItem value="rings">Rings</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Resin Raw Materials</InputLabel>
              <Select
                name="resinRawMaterials"
                value={productData.resinRawMaterials}
                onChange={handleChange}
                label="Resin Raw Materials"
              >
                <MenuItem value="rawcollections">Raw Collections</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Festival Special</InputLabel>
              <Select
                name="festivalSpecial"
                value={productData.festivalSpecial}
                onChange={handleChange}
                label="Festival Special"
              >
                <MenuItem value="diwali">Diwali</MenuItem>
                <MenuItem value="rakhi">Rakhi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Digital Art</InputLabel>
              <Select
                name="digitalArt"
                value={productData.digitalArt}
                onChange={handleChange}
                label="Digital Art"
              >
                <MenuItem value="digitalartedition">Digital Art</MenuItem>
                <MenuItem value="illustrationoncanvas">Illustration on Canvas</MenuItem>
                <MenuItem value="lippanart">Lippan Art</MenuItem>
                <MenuItem value="geodeart">Geode Art</MenuItem>


              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Business</InputLabel>
              <Select
                name="business"
                value={productData.business}
                onChange={handleChange}
                label="business"
              >
                <MenuItem value="businessplate">Business Plate</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Lippan Art</InputLabel>
              <Select
                name="lippanArt"
                value={productData.lippanArt}
                onChange={handleChange}
                label="Lippan Art"
              >
                <MenuItem value="lippanartedition">Lippan Art Edition</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Geode Art</InputLabel>
              <Select
                name="geodeArt"
                value={productData.geodeArt}
                onChange={handleChange}
                label="Geode Art"
              >
                <MenuItem value="geodeartedition">Geode Art Edition</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Vintage</InputLabel>
              <Select
                name="vintage"
                value={productData.vintage}
                onChange={handleChange}
                label="Vintage"
              >
                <MenuItem value="vintageExclusive">Vintage Exclusive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {[1, 2, 3].map((num) => (
            <Grid item xs={12} key={`description${num}`}>
              <TextField
                fullWidth
                label={`Description ${num}`}
                multiline
                name={`description${num}`}
                rows={5}
                onChange={handleChange}
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
          <Grid item xs={12} >
            <TextField
              fullWidth
              label="Details"
              name="details"
              value={productData.details}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} >
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
         
          </Grid>
        </Grid>
      </form>
   
    </div>
    </>
  );
};

export default CreateProductForm;

