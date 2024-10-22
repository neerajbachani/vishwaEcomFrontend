import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Grid,
  Button,
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  createOurBestSellerProduct,
  deleteOurBestSellerProduct,
  getOurBestSellerProduct,
} from "../../user/redux/OurBestSeller/Action";
import { findProducts } from "../../user/redux/Product/Action";
import { toast } from "react-hot-toast";

const ManageOurBestSellerProduct = () => {
  const dispatch = useDispatch();
  const { ourBestSellerProduct, product, loading, error } = useSelector((store) => ({
    ourBestSellerProduct: store.ourBestSellerProduct,
    product: store.product,
    loading: store.loading,
    error: store.error,
  }));

  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getOurBestSellerProduct());
    dispatch(findProducts({ pageNumber: 1, pageSize: 1000 }));
  }, [dispatch, ourBestSellerProduct.createOurBestSellerProducts, ourBestSellerProduct.deleteOurBestSellerProduct]);

  const handleProductSelect = useCallback((event) => {
    setSelectedProduct(event.target.value);
  }, []);

  const handleAddBestSellerProduct = useCallback(() => {
    const selectedProductData = product.products.content.find((p) => p._id === selectedProduct);
    if (selectedProductData) {
      const bestSellerProductData = {
        image: selectedProductData.image,
        title: selectedProductData.name,
        link: `/products/id/${selectedProductData._id}`,
        price: selectedProductData.price,
        discountedPrice: selectedProductData.discountedPrice,
      };
      dispatch(createOurBestSellerProduct(bestSellerProductData));
      toast.success("Best Seller Product added successfully!");
      setSelectedProduct("");
    }
  }, [dispatch, product.products, selectedProduct]);

  const handleDeleteOurBestSellerProduct = useCallback((ourBestSellerProductId) => {
    dispatch(deleteOurBestSellerProduct(ourBestSellerProductId));
    toast.success("Best Seller Product deleted successfully!");
  }, [dispatch]);

  const filteredProducts = product.products?.content?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    toast.error(error);
    return null;
  }

  return (
    <Box sx={{ backgroundColor: "#1b1b1b", minHeight: "100vh", padding: "2rem" }}>
      <Typography variant="h3" align="center" sx={{ color: "#ffffff", marginBottom: "2rem" }}>
        Manage Best Seller Products
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Products"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: 1,
              input: { color: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#90caf9" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#90caf9" },
                "&:hover fieldset": { borderColor: "#64b5f6" },
                "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#1e1e1e", borderRadius: 1 }}>
            <InputLabel id="product-select-label">Select Product</InputLabel>
            <Select
              labelId="product-select-label"
              id="product-select"
              value={selectedProduct}
              label="Select Product"
              onChange={handleProductSelect}
            >
              {filteredProducts?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    <Typography>{item.name}</Typography>
                    <Avatar src={item.image} alt={item.name} sx={{ width: 40, height: 40 }} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ padding: "0.75rem 2rem" }}
            onClick={handleAddBestSellerProduct}
            disabled={!selectedProduct}
          >
            Add to Best Seller Products
          </Button>
        </Grid>
      </Grid>

      <Box width="100%" mt={4}>
        <Card>
          <CardHeader
            title="All Best Seller Products"
            sx={{
              pt: 2,
              alignItems: "center",
              backgroundColor: "#1976d2",
              color: "#ffffff",
              "& .MuiCardHeader-action": { mt: 0.6 },
            }}
          />
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label="best seller products table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Original Price</TableCell>
                  <TableCell align="center">Discounted Price</TableCell>
                  <TableCell align="center">Link</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ourBestSellerProduct?.ourBestSellerProducts?.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>
                      <Avatar alt={item.title} src={item.image} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontWeight: 500 }}>
                          {item.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{item.price}</TableCell>
                    <TableCell align="center">{item.discountedPrice}</TableCell>
                    <TableCell align="center">
                      <Button
                        href={item.link}
                        target="_blank"
                        variant="outlined"
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteOurBestSellerProduct(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Box>
  );
};

export default ManageOurBestSellerProduct;