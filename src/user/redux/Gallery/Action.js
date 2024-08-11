

import axios from "axios";
import { api , API_BASE_URL } from "../../../Config/ApiConfig";
import { CREATE_GALLERY_FAILURE, CREATE_GALLERY_REQUEST, CREATE_GALLERY_SUCCESS, DELETE_GALLERY_FAILURE, DELETE_GALLERY_REQUEST, DELETE_GALLERY_SUCCESS, GET_GALLERY_FAILURE, GET_GALLERY_REQUEST, GET_GALLERY_SUCCESS } from "./ActionType";
import { showErrorToast, showSuccessToast } from "../../components/toast";

export const getGalleryPhotos = () => {
 
    return async (dispatch) => {
      dispatch({type: GET_GALLERY_REQUEST });
      try {
       
        const response = await api.get(`/api/admin/getGallery`);
        console.log("GET GALLERY PHOTOS ", response.data);
        dispatch({type: GET_GALLERY_SUCCESS , payload: response.data});
      } catch (error) {
        console.log("catch error ", error);
        dispatch({type: GET_GALLERY_FAILURE, payload: error.message });
      }
    };
};

// export const createGalleryPhoto = (galleryPhoto) => async (dispatch) => {
//   console.log(galleryPhoto)
//   try {
//     dispatch({ type: CREATE_GALLERY_REQUEST });

//     const { data } = await api.post(`/api/admin/manageGallery/`, galleryPhoto);
//     console.log(data)

//     dispatch({
//       type: CREATE_GALLERY_SUCCESS,
//       payload: data,
//     });

//     console.log("Created Gallery ", data);
//   } catch (error) {
//     dispatch({
//       type: CREATE_GALLERY_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
const jwt = localStorage.getItem("jwt")

export const createGalleryPhoto = (galleryPhoto) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    dispatch({ type: CREATE_GALLERY_FAILURE });

    const formData = new FormData();
    galleryPhoto.forEach(photo => {
      formData.append('images', photo);
    });

    const { data } = await axios.post(`${API_BASE_URL}/api/admin/manageGallery/`, formData, config);

    dispatch({ type: CREATE_GALLERY_SUCCESS, payload: data });
    console.log('Created gallery image:', data);
    showSuccessToast('Image created in Gallery successfully');
  } catch (error) {
    dispatch({
      type: CREATE_GALLERY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    if (error.response && error.response.status === 400) {
      // Validation error
      showErrorToast('Please fill in all required fields');
    } else {
      console.log(error.response);
      console.log(error);
      showErrorToast('Failed to create Image in gallery. Please try again.');
    }
  }
};

export const deleteGalleryPhoto = (galleryPhotoId) => async (dispatch) => {
  console.log("delete gallery photo with Id", galleryPhotoId)
  try {
    dispatch({ type: DELETE_GALLERY_REQUEST });

    let {data}=await api.delete(`/api/admin/deleteGallery/${galleryPhotoId}`);

    console.log("delete gallery photo ",data)

    dispatch({
      type: DELETE_GALLERY_SUCCESS,
      payload: galleryPhotoId,
    });

    console.log("Gallery delete ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_GALLERY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};