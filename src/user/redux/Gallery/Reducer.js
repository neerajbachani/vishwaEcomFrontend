import { CREATE_GALLERY_FAILURE, CREATE_GALLERY_REQUEST, CREATE_GALLERY_SUCCESS, DELETE_GALLERY_FAILURE, DELETE_GALLERY_REQUEST, DELETE_GALLERY_SUCCESS, GET_GALLERY_FAILURE, GET_GALLERY_REQUEST, GET_GALLERY_SUCCESS } from "./ActionType";


const initialState = {
    galleryPhotos: [],
    loading: false,
    error: null
};

const galleryPhotoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GALLERY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_GALLERY_SUCCESS:
            return {
                ...state,
                galleryPhotos: action.payload,
                loading: false,
                error: null
            };
        case GET_GALLERY_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case CREATE_GALLERY_REQUEST:
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case CREATE_GALLERY_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  
                };
              case CREATE_GALLERY_FAILURE:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
                case DELETE_GALLERY_REQUEST:
                    return {
                      ...state,
                      loading: true,
                      error: null,
                    };
                  case DELETE_GALLERY_SUCCESS:
                    console.log("delete ",state.galleryPhotos)
                    return {
                      ...state,
                      loading: false,
                      deleteGalleryPhoto:action.payload
                      
                      
                    };
                  case DELETE_GALLERY_FAILURE:
                    return {
                      ...state,
                      loading: false,
                      error: action.payload,
                    };
                default:
            return state;
    }
};

export default galleryPhotoReducer;
