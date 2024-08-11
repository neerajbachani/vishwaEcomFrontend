import { api } from "../../../Config/ApiConfig";
import { CREATE_OURPRODUCT_FAILURE,  CREATE_OURPRODUCT_REQUEST,  CREATE_OURPRODUCT_SUCCESS,  DELETE_OURPRODUCT_FAILURE,  DELETE_OURPRODUCT_REQUEST,  DELETE_OURPRODUCT_SUCCESS, GET_OURPRODUCT_FAILURE, GET_OURPRODUCT_REQUEST, GET_OURPRODUCT_SUCCESS } from "./ActionType";

export const getOurProduct = () => {
 
    return async (dispatch) => {
      dispatch({type: GET_OURPRODUCT_REQUEST });
      try {
       
        const response = await api.get(`/api/ourProduct/getOurProduct`);
        console.log("Get Our Products", response.data);
        dispatch({type: GET_OURPRODUCT_SUCCESS , payload: response.data});
      } catch (error) {
        console.log("catch error ", error);
        dispatch({type: GET_OURPRODUCT_FAILURE, payload: error.message });
      }
    };
};

export const createOurProduct = (ourProduct) => async (dispatch) => {
  console.log(ourProduct)
  try {
    dispatch({ type: CREATE_OURPRODUCT_REQUEST });

    const { data } = await api.post(`/api/ourProduct/admin/createOurProduct`, ourProduct);
    console.log(data)

    dispatch({
      type: CREATE_OURPRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created our product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_OURPRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOurProduct = (ourProductId) => async (dispatch) => {
  console.log("delete our product", ourProductId)
  try {
    dispatch({ type: DELETE_OURPRODUCT_REQUEST });

    let {data}=await api.delete(`/api/ourProduct/deleteOurProduct/${ourProductId}`);

    console.log("delete our product ",data)

    dispatch({
      type: DELETE_OURPRODUCT_SUCCESS,
      payload: ourProductId,
    });

    console.log("our product deleted ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_OURPRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};