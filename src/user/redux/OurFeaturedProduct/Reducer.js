import {
    CREATE_OURFEATUREDPRODUCT_FAILURE,
    CREATE_OURFEATUREDPRODUCT_REQUEST,
    CREATE_OURFEATUREDPRODUCT_SUCCESS,
    DELETE_OURFEATUREDPRODUCT_FAILURE,
    DELETE_OURFEATUREDPRODUCT_REQUEST,
    DELETE_OURFEATUREDPRODUCT_SUCCESS,
    GET_OURFEATUREDPRODUCT_FAILURE,
    GET_OURFEATUREDPRODUCT_REQUEST,
    GET_OURFEATUREDPRODUCT_SUCCESS
} from "./ActionType";

const initialState = {
    ourFeaturedProducts: [],
    loading: false,
    error: null
};

const ourFeaturedProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_OURFEATUREDPRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_OURFEATUREDPRODUCT_SUCCESS:
            return {
                ...state,
                ourFeaturedProducts: action.payload,
                loading: false,
                error: null
            };
        case GET_OURFEATUREDPRODUCT_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case CREATE_OURFEATUREDPRODUCT_REQUEST:
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case CREATE_OURFEATUREDPRODUCT_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  
                };
              case CREATE_OURFEATUREDPRODUCT_FAILURE:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
                case DELETE_OURFEATUREDPRODUCT_REQUEST:
                    return {
                      ...state,
                      loading: true,
                      error: null,
                    };
                  case DELETE_OURFEATUREDPRODUCT_SUCCESS:
                    console.log("delete ", state.ourFeaturedProducts)
                    return {
                      ...state,
                      loading: false,
                      deleteOurFeaturedProduct:action.payload
                      
                      
                    };
                  case DELETE_OURFEATUREDPRODUCT_FAILURE:
                    return {
                      ...state,
                      loading: false,
                      error: action.payload,
                    };
                default:
            return state;
    }
};

export default ourFeaturedProductReducer;