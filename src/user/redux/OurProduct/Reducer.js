import {
    CREATE_OURPRODUCT_FAILURE,
    CREATE_OURPRODUCT_REQUEST,
    CREATE_OURPRODUCT_SUCCESS,
    DELETE_OURPRODUCT_FAILURE,
    DELETE_OURPRODUCT_REQUEST,
    DELETE_OURPRODUCT_SUCCESS,
    GET_OURPRODUCT_FAILURE,
    GET_OURPRODUCT_REQUEST,
    GET_OURPRODUCT_SUCCESS
} from "./ActionType";

const initialState = {
    ourProducts: [],
    loading: false,
    error: null
};

const ourProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_OURPRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_OURPRODUCT_SUCCESS:
            return {
                ...state,
                ourProducts: action.payload,
                loading: false,
                error: null
            };
        case GET_OURPRODUCT_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case CREATE_OURPRODUCT_REQUEST:
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case CREATE_OURPRODUCT_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  
                };
              case CREATE_OURPRODUCT_FAILURE:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
                case DELETE_OURPRODUCT_REQUEST:
                    return {
                      ...state,
                      loading: true,
                      error: null,
                    };
                  case DELETE_OURPRODUCT_SUCCESS:
                    console.log("delete ", state.ourProducts)
                    return {
                      ...state,
                      loading: false,
                      deleteOurProduct:action.payload
                      
                      
                    };
                  case DELETE_OURPRODUCT_FAILURE:
                    return {
                      ...state,
                      loading: false,
                      error: action.payload,
                    };
                default:
            return state;
    }
};

export default ourProductReducer;