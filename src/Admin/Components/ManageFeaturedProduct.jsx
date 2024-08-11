import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
    Avatar,
    Box, 
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
 
  } from "@mui/material";
  
  import React from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useEffect } from "react";
  import {  useSelector } from "react-redux";
import { createOurFeaturedProduct, deleteOurFeaturedProduct, getOurFeaturedProduct } from "../../user/redux/OurFeaturedProduct/Action";




const ManageFeaturedProduct = () => {
  
  const [ ourFeaturedProductData , setOurFeaturedProductData ] = useState({
    image: "",
    title: "",
    link: "",
    price: "",
    discountedPrice: "",
  });
const dispatch=useDispatch();
const jwt=localStorage.getItem("jwt")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOurFeaturedProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOurFeaturedProduct(ourFeaturedProductData))
    // dispatch(createProduct(productData))
    console.log(ourFeaturedProductData);
  };

  const location = useLocation();
  const navigate = useNavigate();
  
  const { ourFeaturedProduct } = useSelector((store) => store);
  console.log(ourFeaturedProduct?.ourFeaturedProducts)
console.log("1")

  useEffect(() => {
    
    dispatch(getOurFeaturedProduct())
  }, [ourFeaturedProduct.deleteOurFeaturedProduct]);


  const handleDeleteOurFeaturedProduct=(ourFeaturedProductId)=>{
    console.log("delete our featured product ", ourFeaturedProductId)
    dispatch(deleteOurFeaturedProduct(ourFeaturedProductId))
  }
console.log("2")


  return (
    <div className=" bg-[#1b1b1b]">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Add New Product Top - Featured - MaxDisc
      </Typography>
      <form
        onSubmit={handleSubmit}
        className=" min-h-[17rem]"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={ourFeaturedProductData.image}
              onChange={handleChange}
            />
          </Grid>
            
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={ourFeaturedProductData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Price"
              name="price"
              value={ourFeaturedProductData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Original or Discounted Price"
              name="discountedPrice"
              value={ourFeaturedProductData.discountedPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Link"
              name="link"
              value={ourFeaturedProductData.link}
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
              Add Product
            </Button>
         
          </Grid>
        </Grid>
      </form>
      <div className="">
      <Box width={"100%"}>
      
      <Card className="mt-2">
        <CardHeader
          title="All Products"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>Category</TableCell> */}
                <TableCell sx={{ textAlign: "center" }}>Original price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>price</TableCell>


                <TableCell sx={{ textAlign: "center" }}>Link</TableCell>
               
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ourFeaturedProduct?.ourFeaturedProducts?.map((item) => (
                <TableRow
                  hover
                  key={item.title}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.title} src={item.image} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.title}
                      </Typography>
                    
                    </Box>
                  </TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>{item.category.name}</TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>{item.price}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.discountedPrice}</TableCell>

                   <TableCell sx={{ textAlign: "center" }}>{item.link}</TableCell>
                   
              
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" 
                    onClick={()=>handleDeleteOurFeaturedProduct(item._id)}
                    >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      
    </Box>
      </div>
    </div>
  );
};

export default ManageFeaturedProduct;