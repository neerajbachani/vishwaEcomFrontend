import { api } from "../../../Config/ApiConfig";
import { CREATE_OURFEATUREDPRODUCT_FAILURE,  CREATE_OURFEATUREDPRODUCT_REQUEST,  CREATE_OURFEATUREDPRODUCT_SUCCESS,  DELETE_OURFEATUREDPRODUCT_FAILURE,  DELETE_OURFEATUREDPRODUCT_REQUEST,  DELETE_OURFEATUREDPRODUCT_SUCCESS,  GET_OURFEATUREDPRODUCT_FAILURE, GET_OURFEATUREDPRODUCT_REQUEST, GET_OURFEATUREDPRODUCT_SUCCESS } from "./ActionType";

export const getOurFeaturedProduct = () => {
 
    return async (dispatch) => {
      dispatch({type: GET_OURFEATUREDPRODUCT_REQUEST });
      try {
       
        const response = await api.get(`/api/ourFeaturedProduct/getOurFeaturedProduct`);
        console.log("Get Our Featured Products", response.data);
        dispatch({type: GET_OURFEATUREDPRODUCT_SUCCESS , payload: response.data});
      } catch (error) {
        console.log("catch error ", error);
        dispatch({type: GET_OURFEATUREDPRODUCT_FAILURE, payload: error.message });
      }
    };
};

export const createOurFeaturedProduct = (ourFeaturedProduct) => async (dispatch) => {
  console.log(ourFeaturedProduct)
  try {
    dispatch({ type: CREATE_OURFEATUREDPRODUCT_REQUEST });

    const { data } = await api.post(`/api/ourFeaturedProduct/admin/createOurFeaturedProduct`, ourFeaturedProduct);
    console.log(data)

    dispatch({
      type: CREATE_OURFEATUREDPRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created our Featured product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_OURFEATUREDPRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOurFeaturedProduct = (ourFeaturedProductId) => async (dispatch) => {
  console.log("delete our featured product", ourFeaturedProductId)
  try {
    dispatch({ type: DELETE_OURFEATUREDPRODUCT_REQUEST });

    let {data}=await api.delete(`/api/ourFeaturedProduct/deleteOurFeaturedProduct/${ourFeaturedProductId}`);

    console.log("delete our featured product ",data)

    dispatch({
      type: DELETE_OURFEATUREDPRODUCT_SUCCESS,
      payload: ourFeaturedProductId,
    });

    console.log("our featured product deleted ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_OURFEATUREDPRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};