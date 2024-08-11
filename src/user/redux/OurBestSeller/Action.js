import { api } from "../../../Config/ApiConfig";
import { CREATE_OURBESTSELLER_FAILURE, CREATE_OURBESTSELLER_REQUEST, CREATE_OURBESTSELLER_SUCCESS,  DELETE_OURBESTSELLER_FAILURE, DELETE_OURBESTSELLER_REQUEST, DELETE_OURBESTSELLER_SUCCESS,  GET_OURBESTSELLER_FAILURE, GET_OURBESTSELLER_REQUEST, GET_OURBESTSELLER_SUCCESS } from "./ActionType";

export const getOurBestSellerProduct = () => {
 
    return async (dispatch) => {
      dispatch({type: GET_OURBESTSELLER_REQUEST });
      try {
       
        const response = await api.get(`/api/ourBestSellerProduct/getOurBestSellerProduct`);
        console.log("Get Our Best Seller Products ", response.data);
        dispatch({type: GET_OURBESTSELLER_SUCCESS , payload: response.data});
      } catch (error) {
        console.log("catch error ", error);
        dispatch({type: GET_OURBESTSELLER_FAILURE, payload: error.message });
      }
    };
};

export const createOurBestSellerProduct = (ourBestSellerProduct) => async (dispatch) => {
  console.log(ourBestSellerProduct)
  try {
    dispatch({ type: CREATE_OURBESTSELLER_REQUEST });

    const { data } = await api.post(`/api/ourBestSellerProduct/admin/createOurBestSellerProduct`, ourBestSellerProduct);
    console.log(data)

    dispatch({
      type: CREATE_OURBESTSELLER_SUCCESS,
      payload: data,
    });

    console.log("created our best selller product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_OURBESTSELLER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOurBestSellerProduct = (ourBestSellerProductId) => async (dispatch) => {
  console.log("delete our best seller product", ourBestSellerProductId)
  try {
    dispatch({ type: DELETE_OURBESTSELLER_REQUEST });

    let {data}=await api.delete(`/api/ourBestSellerProduct/deleteOurBestSellerProduct/${ourBestSellerProductId}`);

    console.log("delete product ",data)

    dispatch({
      type: DELETE_OURBESTSELLER_SUCCESS,
      payload: ourBestSellerProductId,
    });

    console.log("our best seller product deleted ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_OURBESTSELLER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};