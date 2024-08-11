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
import { createOurProduct, deleteOurProduct, getOurProduct } from "../../user/redux/OurProduct/Action";




const ManageOurProduct = () => {
  
  const [ourProductData, setOurProductData] = useState({
    image: "",
    title: "",
    link: "",
    price: "",
    discountedPrice: "",
    type: ""
  });
const dispatch=useDispatch();
const jwt=localStorage.getItem("jwt")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOurProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOurProduct(ourProductData))
    // dispatch(createProduct(productData))
    console.log(ourProductData);
  };

  const location = useLocation();
  const navigate = useNavigate();
  
  const { ourProduct } = useSelector((store) => store);
  console.log(ourProduct?.ourProducts)


  useEffect(() => {
    
    dispatch(getOurProduct())
  }, [ourProduct.deleteOurProduct]);


  const handleDeleteOurProduct=(ourProductId)=>{
    console.log("delete our product ", ourProductId)
    dispatch(deleteOurProduct(ourProductId))
  }

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
              value={ourProductData.image}
              onChange={handleChange}
            />
          </Grid>
            
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={ourProductData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>type</InputLabel>
              <Select
                name="type"
                value={ourProductData.type}
                onChange={handleChange}
                label="Type"
              >
                <MenuItem value="Top">Top</MenuItem>
                <MenuItem value="Featured">Featured</MenuItem>
                <MenuItem value="Max Discount">Max Discount</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Price"
              name="price"
              value={ourProductData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Original or Discounted Price"
              name="discountedPrice"
              value={ourProductData.discountedPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Link"
              name="link"
              value={ourProductData.link}
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

                <TableCell sx={{ textAlign: "center" }}>Type</TableCell>

                <TableCell sx={{ textAlign: "center" }}>Link</TableCell>
               
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ourProduct?.ourProducts?.map((item) => (
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

                  <TableCell sx={{ textAlign: "center" }}>{item.type}</TableCell>
                   <TableCell sx={{ textAlign: "center" }}>{item.link}</TableCell>
                   
              
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" 
                    onClick={()=>handleDeleteOurProduct(item._id)}
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

export default ManageOurProduct;