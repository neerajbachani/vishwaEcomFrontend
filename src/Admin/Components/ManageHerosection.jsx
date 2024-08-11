import { useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
 
} from "@mui/material";


import { useDispatch } from "react-redux";
import { createHeroSection, deleteHeroSection, getHeroSection } from "../../user/redux/HeroSection/Action";
// import { createProduct } from "../../user/redux/Product/Action";
import {
    Avatar,
    Box,
   
    Card,
    CardHeader,
    FormControl,
   
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
 
  } from "@mui/material";
  
  import React from "react";
  // import { dressPage1 } from "../../../Data/dress/page1";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useEffect } from "react";
  import {  useSelector } from "react-redux";
  import { deleteProduct, findProducts } from "../../user/redux/Product/Action";




const ManageHerosection = () => {
  
  const [heroSectionData, setHeroSectionData] = useState({
    image: "",
    title: "",
    link: "",
  });
const dispatch=useDispatch();
const jwt=localStorage.getItem("jwt")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroSectionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createHeroSection(heroSectionData))
    // dispatch(createProduct(productData))
    console.log(heroSectionData);
  };

  const location = useLocation();
  const navigate = useNavigate();
  
  const { heroSection } = useSelector((store) => store);
  console.log(heroSection?.heroSections)
  console.log(heroSection)

  useEffect(() => {
    
    dispatch(getHeroSection())
  }, [heroSection.deleteHeroSection]);


  const handleDeleteHeroSection=(heroSectionId)=>{
    console.log("delete product ", heroSectionId)
    dispatch(deleteHeroSection(heroSectionId))
  }

  return (
    <div className=" bg-[#1b1b1b]">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Add New Herosection
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
              value={heroSectionData.image}
              onChange={handleChange}
            />
          </Grid>
            
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={heroSectionData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Link"
              name="link"
              value={heroSectionData.link}
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
              Add Herosection
            </Button>
         
          </Grid>
        </Grid>
      </form>
      <div className="">
      <Box width={"100%"}>
      
      <Card className="mt-2">
        <CardHeader
          title="All Herosections"
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
                <TableCell sx={{ textAlign: "center" }}>Link</TableCell>
               
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {heroSection?.heroSections?.map((item) => (
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
                      <Typography variant="caption">{item.title}</Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>{item.category.name}</TableCell> */}
                   <TableCell sx={{ textAlign: "center" }}>{item.link}</TableCell>
                   
              
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" 
                    onClick={()=>handleDeleteHeroSection(item._id)}
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

export default ManageHerosection;