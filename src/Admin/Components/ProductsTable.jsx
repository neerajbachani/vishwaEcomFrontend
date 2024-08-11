import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../user/redux/Product/Action";
import { Toaster } from "react-hot-toast";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  TextField,
} from "@mui/material";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    sort: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value - 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    searchParams.set("search", event.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    setFilterValue({ availability, sort });
    const data = {
      colors: [],
      varmalaPreservation: [],
      workshop: [],
      wallClock: [],
      namePlate: [],
      navkarMantraFrame: [],
      resinSpecial: [],
      resinRawMaterials: [],
      geodeArt: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber: page || 1,
      pageSize: 10,
      stock: availability,
      search: searchTerm,
    };
    dispatch(findProducts(data))
  }, [availability, sort, page, product.deleteProduct, searchTerm]);

  const handleDeleteProduct = (productId) => {
    console.log("delete product ", productId)
    dispatch(deleteProduct(productId))
  }

  const handleUpdateProduct = (productId) => {
    navigate(`/admin/product/update/${productId}`)
  }

  return (
    <>
      <Toaster />
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
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', px: 2 }}>
            <TextField
              label="Search products"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Discounted/Original Price</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Discount</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product?.products?.content
                  ?.filter((item) => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.name} src={item.image} />{" "}
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
                      <Typography variant="caption">{item.name}</Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>{item.category.name}</TableCell> */}
                   <TableCell sx={{ textAlign: "center" }}>{item.discountedPrice}</TableCell>
                   <TableCell sx={{ textAlign: "center" }}>{item.price}</TableCell>
                   <TableCell sx={{ textAlign: "center" }}>{item.discount}</TableCell>

                
                   
                   <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" 
                    onClick={()=>handleUpdateProduct(item._id)}
                    >Update</Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" 
                    onClick={()=>handleDeleteProduct(item._id)}
                    >Delete</Button>
                  </TableCell>
                </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Card className="mt-2 border">
          <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
            <Pagination
              count={product.products?.totalPages}
              color="primary"
              className=""
              onChange={handlePaginationChange}
            />
          </div>
        </Card>
      </Box>
    </>
  );
};

export default ProductsTable;