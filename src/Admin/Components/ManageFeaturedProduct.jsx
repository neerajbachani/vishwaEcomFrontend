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
  createOurFeaturedProduct,
  deleteOurFeaturedProduct,
  getOurFeaturedProduct,
} from "../../user/redux/OurFeaturedProduct/Action";
import { findProducts } from "../../user/redux/Product/Action";
import { toast } from "react-hot-toast";

const ManageFeaturedProduct = () => {
  const dispatch = useDispatch();
  const { ourFeaturedProduct, product, loading, error } = useSelector((store) => ({
    ourFeaturedProduct: store.ourFeaturedProduct,
    product: store.product,
    loading: store.loading,
    error: store.error,
  }));

  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getOurFeaturedProduct());
    dispatch(findProducts({ pageNumber: 1, pageSize: 1000 }));
  }, [dispatch, ourFeaturedProduct.createFeaturedProducts, ourFeaturedProduct.deleteOurFeaturedProduct]);

  const handleProductSelect = useCallback((event) => {
    setSelectedProduct(event.target.value);
  }, []);

  const handleAddFeaturedProduct = useCallback(() => {
    const selectedProductData = product.products.content.find((p) => p._id === selectedProduct);
    if (selectedProductData) {
      const featuredProductData = {
        image: selectedProductData.image,
        title: selectedProductData.name,
        link: `/products/id/${selectedProductData._id}`,
        price: selectedProductData.price,
        discountedPrice: selectedProductData.discountedPrice,
      };
      dispatch(createOurFeaturedProduct(featuredProductData));
      toast.success("Featured Product added successfully!");
      setSelectedProduct("");
    }
  }, [dispatch, product.products, selectedProduct]);

  const handleDeleteOurFeaturedProduct = useCallback((ourFeaturedProductId) => {
    dispatch(deleteOurFeaturedProduct(ourFeaturedProductId));
    toast.success("Featured Product deleted successfully!");
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
    <Box sx={{ backgroundColor: "#121212", minHeight: "100vh", padding: "2rem" }}>
      <Typography variant="h4" align="center" sx={{ color: "#90caf9", marginBottom: "2rem" }}>
        Manage Featured Products
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
            <InputLabel id="product-select-label" sx={{ color: "#90caf9" }}>
              Select Product
            </InputLabel>
            <Select
              labelId="product-select-label"
              id="product-select"
              value={selectedProduct}
              label="Select Product"
              onChange={handleProductSelect}
              sx={{
                color: "#ffffff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#90caf9",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#64b5f6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#42a5f5",
                },
              }}
            >
              {filteredProducts?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    <Typography sx={{ color: "#ffffff" }}>{item.name}</Typography>
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
            sx={{ backgroundColor: "#42a5f5", color: "#ffffff", padding: "0.75rem 2rem" }}
            onClick={handleAddFeaturedProduct}
            disabled={!selectedProduct}
          >
            Add to Featured Products
          </Button>
        </Grid>
      </Grid>

      <FeaturedProductsTable
        featuredProducts={ourFeaturedProduct?.ourFeaturedProducts}
        onDelete={handleDeleteOurFeaturedProduct}
      />
    </Box>
  );
};

const FeaturedProductsTable = React.memo(({ featuredProducts, onDelete }) => (
  <Box width="100%" mt={4}>
    <Card sx={{ backgroundColor: "#1e1e1e", color: "#ffffff" }}>
      <CardHeader
        title="Featured Products"
        sx={{
          pt: 2,
          alignItems: "center",
          backgroundColor: "#42a5f5",
          color: "#ffffff",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="featured products table">
          <TableHead sx={{ backgroundColor: "#2c2c2c" }}>
            <TableRow>
              <TableCell sx={{ color: "#90caf9" }}>Image</TableCell>
              <TableCell sx={{ color: "#90caf9" }}>Title</TableCell>
              <TableCell align="center" sx={{ color: "#90caf9" }}>Original Price</TableCell>
              <TableCell align="center" sx={{ color: "#90caf9" }}>Discounted Price</TableCell>
              <TableCell align="center" sx={{ color: "#90caf9" }}>Link</TableCell>
              <TableCell align="center" sx={{ color: "#90caf9" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {featuredProducts?.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell>
                  <Avatar alt={item.title} src={item.image} />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.discountedPrice}</TableCell>
                <TableCell align="center">
                  <Button
                    href={item.link}
                    target="_blank"
                    variant="outlined"
                    sx={{ color: "#42a5f5", borderColor: "#42a5f5" }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="error" onClick={() => onDelete(item._id)}>
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
));

export default ManageFeaturedProduct;