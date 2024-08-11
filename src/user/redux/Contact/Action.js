import { api } from "../../../Config/ApiConfig";
import { CREATE_CONTACT_FAILURE, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS,  DELETE_CONTACT_FAILURE, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, GET_CONTACT_FAILURE, GET_CONTACT_REQUEST, GET_CONTACT_SUCCESS} from "./ActionType";

export const getContact = () => {
 
    return async (dispatch) => {
      dispatch({type: GET_CONTACT_REQUEST });
      try {
       
        const response = await api.get(`/api/admin/getContact`);
        console.log("GET CONTACT ", response.data);
        dispatch({type: GET_CONTACT_SUCCESS , payload: response.data});
      } catch (error) {
        console.log("catch error ", error);
        dispatch({type: GET_CONTACT_FAILURE, payload: error.message });
      }
    };
};

export const createContact = (contact) => async (dispatch) => {
  console.log(contact)
  try {
    dispatch({ type: CREATE_CONTACT_REQUEST });

    const { data } = await api.post(`/api/admin/manageContact`, contact);
    console.log(data)

    dispatch({
      type: CREATE_CONTACT_SUCCESS,
      payload: data,
    });

    console.log("created contact ", data);
  } catch (error) {
    dispatch({
      type: CREATE_CONTACT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteContact = (contactId) => async (dispatch) => {
  console.log("delete contact ", contactId)
  try {
    dispatch({ type: DELETE_CONTACT_REQUEST });

    let {data}=await api.delete(`/api/admin/deleteContact/${contactId}`);

    console.log("deleted Contact ",data)

    dispatch({
      type: DELETE_CONTACT_SUCCESS,
      payload: contactId,
    });

    console.log("Contact deleted ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_CONTACT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};