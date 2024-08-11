import { useState } from "react";
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
import { Toaster, toast } from 'react-hot-toast';
import { showSuccessToast, showErrorToast } from '../../user/components/toast';

import { Fragment } from "react";
// import "./CreateProductForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductById, updateProduct,
} from "../../user/redux/Product/Action";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const UpdateProductForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState({
    image: "",
    name: "",
    discountedPrice: "",
    price: "",
    discount: "",
    size: initialSizes,
    quantity: "",
    description1: "",
    description2: "",
    description3: "",

    details: "",

  });
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { productId } = useParams();
  const { product } = useSelector((store) => store);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...productData, image: selectedFile}, productId ))
      .then(() => {
        setProductData({
          image: '',
          name: '',
          discountedPrice: '',
          price: '',
          discount: '',
          size: initialSizes,
          quantity: '',
          description1: '',
          description2: '',
          description3: '',
          details: '',
        });
        setSelectedFile(null);
        showSuccessToast('Product updated successfully');
      })
      .catch((error) => {
        console.log('error');
        showErrorToast('Failed to update product. Please try again.');
      });
  };

  useEffect(() => {
    dispatch(findProductById({productId}));
  }, [productId]);

  useEffect(()=>{
    if(product.product){
        for(let key in productData){
    setProductData((prev)=>({...prev,[key]:product.product[key]}))
    console.log(product.product[key],"--------",key)
}
    }

  },[product.product])

  console.log(product.product)

  return (
    <div className=" bg-[#000] ">
      <Toaster/>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Update Product
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
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
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
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description 1"
              multiline
              name="description1"
              rows={3}
              onChange={handleChange}
              value={productData.description1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description 2"
              multiline
              name="description2"
              rows={3}
              onChange={handleChange}
              value={productData.description2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description 3"
              multiline
              name="description3"
              rows={3}
              onChange={handleChange}
              value={productData.description3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Details"
              multiline
              name="details"
              rows={3}
              onChange={handleChange}
              value={productData.details}
            />
          </Grid>
          {/* {productData.size.map((size, index) => (
            <Grid container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>{" "}
            </Grid>
          ))} */}
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
            {/* <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20 ml-10"
              size="large"
              onClick={()=>handleAddProducts(dressPage1)}
            >
              Add Products By Loop
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UpdateProductForm;
