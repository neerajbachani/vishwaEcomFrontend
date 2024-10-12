import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts, reorderProduct } from '../../user/redux/Product/Action';
import toast, { Toaster } from 'react-hot-toast';
import {
  Box, Card, CardHeader, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  Typography, TextField, Button, Avatar, Pagination, CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import debounce from 'lodash/debounce';
import { EditTwoTone } from '@mui/icons-material';

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page") || 1;

  const [products, setProducts] = useState([]);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newOrder, setNewOrder] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = useCallback((searchValue = "") => {
    setIsLoading(true);
    const loadingToastId = ""
    
    const data = {
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber: page,
      pageSize: 10,
      stock: availability,
      search: searchValue,
    };
    
    dispatch(findProducts(data))
      .then((response) => {
        if (response.payload && response.payload.content) {
          setProducts(response.payload.content);
          setTotalProducts(response.payload.totalProducts);
          toast.success('Products loaded successfully', {
            id: loadingToastId,
          });
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch((error) => {
        console.error('no error ', error);
       
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, availability, sort, page]);

  const handleOrderChange = async () => {
    const orderNum = parseInt(newOrder);
    if (isNaN(orderNum) || orderNum < 1 || orderNum > totalProducts) {
      toast.error(`Please enter a number between 1 and ${totalProducts}`);
      return;
    }

    setIsUpdatingOrder(true);
    const loadingToastId = toast.loading('Updating product order...');
    
    try {
      const originalProducts = [...products];
      
      // Optimistically update the UI
      const updatedProducts = products.map(p => 
        p._id === selectedProduct._id ? { ...p, productOrder: orderNum } : p
      ).sort((a, b) => a.productOrder - b.productOrder);
      setProducts(updatedProducts);
      
      // Close the dialog immediately
      handleCloseOrderDialog();

      // Make the API call
      const result = await dispatch(reorderProduct({
        productId: selectedProduct._id,
        newOrder: orderNum
      })).unwrap();
      
      // If successful, update the toast and refresh the products
      toast.success('Product order updated successfully', {
        id: loadingToastId,
      });
      
      // Wait a brief moment before refreshing the list
      setTimeout(() => {
        fetchProducts(searchTerm);
      }, 500);
      
    } catch (error) {
      console.error('Error updating product order:', error);
      
      // Show error toast
      toast.error('Failed to update product order. Please try again.', {
        id: loadingToastId,
      });
      
      // Revert the optimistic update
      setProducts(originalProducts);
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const debouncedFetchProducts = useCallback(
    debounce((searchValue) => fetchProducts(searchValue), 300),
    [fetchProducts]
  );
  
  useEffect(() => {
    if (product?.products) {
      setProducts(product.products.content);
      setTotalProducts(product.products.totalProducts);
    }
  }, [product.products]);

  const handleOpenOrderDialog = (item) => {
    setSelectedProduct(item);
    setNewOrder(item.productOrder.toString());
    setOpenOrderDialog(true);
  };

  const handleCloseOrderDialog = () => {
    setOpenOrderDialog(false);
    setSelectedProduct(null);
    setNewOrder('');
  };

 

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);

    const newOrder = result.destination.index + 1;
    dispatch(reorderProduct({
      productId: reorderedItem._id,
      newOrder
    }))
      .unwrap()
      .then(() => {
        toast.success('Product order updated successfully');
        fetchProducts(searchTerm);
      })
      .catch(() => {
        setProducts(products);
        toast.error('Failed to update product order');
      });
  };
  useEffect(() => {
    fetchProducts(searchTerm);
  }, [fetchProducts, searchTerm]);

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    searchParams.set("search", value);
    searchParams.set("page", "1");
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    debouncedFetchProducts(value);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/admin/product/update/${productId}`);
  };

  return (
    <>
      <Toaster />
      <Box width={"100%"}>
        <Card className="mt-2">
        <CardHeader 
            title="All Products" 
            subheader={`Drag and drop to reorder within page, or click the edit icon to move across pages. Total products: ${totalProducts}`}
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
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="products">
                {(provided) => (
                  <TableContainer {...provided.droppableProps} ref={provided.innerRef}>
                    <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
                      <TableHead>
                        <TableRow>
                          <TableCell>Order</TableCell>
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
                        {products.map((item, index) => (
                          <Draggable key={item._id} draggableId={item._id} index={index}>
                            {(provided) => (
                              <TableRow
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                hover
                                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                              >
                                 <TableCell>
                      {item.productOrder || index + 1}
                      <IconButton
                        size="small" 
                        onClick={() => handleOpenOrderDialog(item)}
                        sx={{ ml: 1 }}
                      >
                        <EditTwoTone fontSize="small" />
                      </IconButton>
                    </TableCell>
                                <TableCell>
                                  <Avatar alt={item.title} src={item.image} />
                                </TableCell>
                                <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}>
                                      {item.title}
                                    </Typography>
                                    <Typography variant="caption">{item.name}</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.discountedPrice}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.price}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{item.discount}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Button variant="text" onClick={() => handleUpdateProduct(item._id)}>
                                    Update
                                  </Button>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Button variant="text" onClick={() => handleDeleteProduct(item._id)}>
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Card>
        <Card className="mt-2 border">
          <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
            <Pagination
              count={product.products?.totalPages}
              page={parseInt(page)}
              color="primary"
              className=""
              onChange={handlePaginationChange}
            />
          </div>
        </Card>
      </Box>
      <Dialog 
        open={openOrderDialog} 
        onClose={handleCloseOrderDialog}
        disableEscapeKeyDown={isUpdatingOrder}
        disableBackdropClick={isUpdatingOrder}
      >
        <DialogTitle>Edit Product Order</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Current order: {selectedProduct?.productOrder}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="New Order"
            type="number"
            fullWidth
            value={newOrder}
            onChange={(e) => setNewOrder(e.target.value)}
            inputProps={{ min: 1, max: totalProducts }}
            disabled={isUpdatingOrder}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOrderDialog} disabled={isUpdatingOrder}>
            Cancel
          </Button>
          <Button 
            onClick={handleOrderChange}
            disabled={isUpdatingOrder}
            color="primary"
          >
            {isUpdatingOrder ? (
              <CircularProgress size={24} />
            ) : (
              'Update Order'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductsTable;