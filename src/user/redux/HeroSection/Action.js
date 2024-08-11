import { api } from "../../../Config/ApiConfig";
import { CREATE_HEROSECTION_FAILURE, CREATE_HEROSECTION_REQUEST, CREATE_HEROSECTION_SUCCESS, DELETE_HEROSECTION_FAILURE, DELETE_HEROSECTION_REQUEST, GET_HEROSECTION_FAILURE, GET_HEROSECTION_REQUEST, GET_HEROSECTION_SUCCESS } from "./ActionType";

export const getHeroSection = () => {
 
    return async (dispatch) => {
      dispatch({type: GET_HEROSECTION_REQUEST });
      try {
       
        const response = await api.get(`/api/`);
        console.log("GET HEROSECTION ", response.data);
        dispatch({type: GET_HEROSECTION_SUCCESS , payload: response.data});
      } catch (error) {
        console.log("catch error ", error);
        dispatch({type: GET_HEROSECTION_FAILURE, payload: error.message });
      }
    };
};

export const createHeroSection = (heroSection) => async (dispatch) => {
  console.log(heroSection)
  try {
    dispatch({ type: CREATE_HEROSECTION_REQUEST });

    const { data } = await api.post(`/api/admin/manageHeroSection/`, heroSection);
    console.log(data)

    dispatch({
      type: CREATE_HEROSECTION_SUCCESS,
      payload: data,
    });

    console.log("created Herosection ", data);
  } catch (error) {
    dispatch({
      type: CREATE_HEROSECTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteHeroSection = (heroSectionId) => async (dispatch) => {
  console.log("delete product action",heroSectionId)
  try {
    dispatch({ type: DELETE_HEROSECTION_REQUEST });

    let {data}=await api.delete(`/api/${heroSectionId}`);

    console.log("delete product ",data)

    dispatch({
      type: DELETE_HEROSECTION_REQUEST,
      payload: heroSectionId,
    });

    console.log("Herosection delte ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_HEROSECTION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};