import axios from "axios";
import { API_BASE_URL, api } from "../../../Config/ApiConfig";


import {
  FIND_PRODUCTS_BY_CATEGORY_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
  FIND_PRODUCTS_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_ORDER_REQUEST,
  UPDATE_PRODUCT_ORDER_SUCCESS,
  UPDATE_PRODUCT_ORDER_FAILURE,
  REORDER_PRODUCT_REQUEST,
  REORDER_PRODUCT_SUCCESS,
  REORDER_PRODUCT_FAILURE,
} from "./ActionType";
import { showErrorToast, showSuccessToast } from "../../components/toast";

export const findProducts = (reqData) => async (dispatch) => {
  const {
    colors,
 
    resin,
    digitalArt,
  jewel,
  resinRawMaterials,
  festivalSpecial,
  lippanArt,
  vintage,
  business,
 
    geodeArt,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    stock,
    sort,
    pageNumber,
    pageSize,
    search,
  } = reqData;

  try {
    dispatch({ type: FIND_PRODUCTS_BY_CATEGORY_REQUEST });

    // Construct the query parameters
    const params = new URLSearchParams({
      query: search || '',
     
      resin: resin || '',
      digitalArt: digitalArt || '',
      jewel: jewel || '',
      resinRawMaterials: resinRawMaterials || '',
      festivalSpecial: festivalSpecial || '',
      lippanArt: lippanArt || '',
      geodeArt: geodeArt || '',
      vintage: vintage || '',
      business: business || '',  
      sort: sort ||'productOrder',
      pageNumber: pageNumber || '',
      pageSize: pageSize || '',
      minPrice: minPrice || '',
      maxPrice: maxPrice || '',
      minDiscount: minDiscount || '',
      stock: stock || '',
      sizes: sizes ? sizes.join(',') : ''
    });

    // Remove empty parameters
    for (const [key, value] of params.entries()) {
      if (!value) {
        params.delete(key);
      }
    }

    const timestamp = new Date().getTime();
    const apiUrl = `/api/products?${params.toString()}&_t=${timestamp}`;

    const { data } = await api.get(apiUrl);

    console.log("Fetched data from API:", data);
    console.log(sort)
    console.log("Products sorted by productOrder:", 
      data.content.map(p => ({ id: p._id, name: p.name, order: p.productOrder }))
    );
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    console.error("Error response:", error.response);
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const findProductById = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const { data } = await api.get(`/api/products/id/${reqData.productId}`);

    console.log("products by id:", data);
    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


const jwt = localStorage.getItem("jwt")

const apii = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Authorization": `Bearer ${jwt}`,
    'Content-Type': 'multipart/form-data',
  },
});

import { createAsyncThunk } from '@reduxjs/toolkit';

export const reorderProduct = createAsyncThunk(
  'product/reorder',
  async ({ productId, newOrder }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/products/${productId}/reorder`, { newOrder });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetProductOrders = () => async (dispatch) => {
  try {
    dispatch({ type: 'RESET_PRODUCT_ORDERS_REQUEST' });
    await api.post('/api/admin/products/reset-orders');
    dispatch({ type: 'RESET_PRODUCT_ORDERS_SUCCESS' });
    // Refetch products after reset
    dispatch(findProducts({}));
  } catch (error) {
    dispatch({ 
      type: 'RESET_PRODUCT_ORDERS_FAILURE',
      payload: error.message
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const formData = new FormData();
    formData.append('image', product.image);
    formData.append('name', product.name);
    formData.append('details', product.details);
    formData.append('color', product.color);
    formData.append('discount', product.discount);
    formData.append('price', product.price);
    formData.append('discountPercent', product.discountPercent);
    formData.append('discountedPrice', product.discountedPrice);
    formData.append('quantity', product.quantity);
    formData.append('resin', product.resin);
    formData.append('jewel', product.jewel);
    formData.append('resinRawMaterials', product.resinRawMaterials);
    formData.append('festivalSpecial', product.festivalSpecial);
    formData.append('digitalArt', product.digitalArt);
    formData.append('business', product.business);
    formData.append('lippanArt', product.lippanArt);
    formData.append('geodeArt', product.geodeArt);
    formData.append('vintage', product.vintage);
    formData.append('description1', product.description1);
    formData.append('description2', product.description2);
    formData.append('description3', product.description3);

    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });
    
    // Add productOrder if it exists
    if (product.productOrder !== undefined) {
      formData.append('productOrder', product.productOrder);
    }

    const { data } = await apii.post(`/api/admin/products/`, formData);
    console.log(data)

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    dispatch(findProducts({}));
    console.log('created product ', data);
    showSuccessToast('Product created successfully');
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error.response && error.response.status === 400) {
      // Validation error
      showErrorToast('Please fill in all required fields');
    } else {
      console.log(error.response);
      console.log(error);
      showErrorToast('Failed to create product. Please try again.');
    }
  }
};

export const updateProduct = (product, productId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const formData = new FormData();
   
    // Append image only if a new file is selected
    if (product.image instanceof File) {
      formData.append('image', product.image);
    }

    // Ensure numeric fields are properly formatted
    const numericFields = ['price', 'discountedPrice', 'discount', 'quantity', 'weight'];
    
    // Append all fields to formData
    Object.keys(product).forEach(key => {
      if (key !== 'image') {
        // Convert numeric fields to numbers and ensure they're not null
        if (numericFields.includes(key)) {
          const value = product[key] === null ? 0 : Number(product[key]);
          formData.append(key, value);
        } else {
          formData.append(key, product[key]);
        }
      }
    });

    const { data } = await apii.put(`/api/admin/products/${productId}`, formData);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    console.log('updated product ', data);
    showSuccessToast('Product updated successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        'Failed to update product';
    
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload: errorMessage
    });

    if (error.response?.status === 400) {
      showErrorToast('Please fill in all required fields correctly');
    } else if (error.response?.status === 500) {
      showErrorToast('Server error: ' + errorMessage);
    } else {
      showErrorToast(errorMessage);
    }
    
    throw error; // Re-throw to handle in component
  }
};

// export const updateProduct = (product, productId) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PRODUCT_REQUEST });
//     const { data } = await api.put(`/api/admin/products/${productId}`, product);
//     console.log('update product ', data);
//     dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
//     // showSuccessToast('Product updated successfully');
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PRODUCT_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//     if (error.response && error.response.status === 400) {
//       // Validation error
//       showErrorToast('Please fill in all required fields');
//     } else {
//       console.log(error)
//     }
//   }
// };


export const deleteProduct = (productId) => async (dispatch) => {
  console.log("delete product action",productId)
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let {data}=await api.delete(`/api/admin/products/${productId}`);

    console.log("delete product ",data)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });
    showSuccessToast('Product Deleted Successfully');
    console.log("product delte ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

