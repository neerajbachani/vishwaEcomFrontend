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
      sort: sort || 'order,asc',
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

    const apiUrl = `/api/products?${params.toString()}`;

    const { data } = await api.get(apiUrl);

    console.log("Fetched data from API:", data);
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductOrder = (orderData) => async (dispatch) => {

  console.log(orderData)
  try {
    dispatch({ type: UPDATE_PRODUCT_ORDER_REQUEST });

    const { data } = await api.put('/api/admin/products/productOrder/', orderData);
    console.log(data)

    dispatch({ type: UPDATE_PRODUCT_ORDER_SUCCESS, payload: data });
    showSuccessToast('Product order updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_ORDER_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    showErrorToast('Failed to update product order. Please try again.');
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

    const { data } = await apii.post(`/api/admin/products/`, formData);
    console.log(data)

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
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
    formData.append('image', product.image);
    formData.append('name', product.name);
    formData.append('details', product.details);
    formData.append('color', product.color);
    formData.append('discount', product.discount);
    formData.append('price', product.price);
    formData.append('discountPercent', product.discountPercent);
    formData.append('discountedPrice', product.discountedPrice);
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

    const { data } = await apii.put(`/api/admin/products/${productId}`, formData);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
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

