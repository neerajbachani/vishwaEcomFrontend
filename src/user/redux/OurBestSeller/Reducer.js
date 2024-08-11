import {
    CREATE_OURBESTSELLER_FAILURE,
    CREATE_OURBESTSELLER_REQUEST,
    CREATE_OURBESTSELLER_SUCCESS,
    DELETE_OURBESTSELLER_FAILURE,
    DELETE_OURBESTSELLER_REQUEST,
    DELETE_OURBESTSELLER_SUCCESS,
    GET_OURBESTSELLER_FAILURE,
    GET_OURBESTSELLER_REQUEST,
    GET_OURBESTSELLER_SUCCESS
} from "./ActionType";

const initialState = {
    ourBestSellerProducts: [],
    loading: false,
    error: null
};

const ourBestSellerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_OURBESTSELLER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_OURBESTSELLER_SUCCESS:
            return {
                ...state,
                ourBestSellerProducts: action.payload,
                loading: false,
                error: null
            };
        case GET_OURBESTSELLER_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case CREATE_OURBESTSELLER_REQUEST:
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case CREATE_OURBESTSELLER_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  
                };
              case CREATE_OURBESTSELLER_FAILURE:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
                case DELETE_OURBESTSELLER_REQUEST:
                    return {
                      ...state,
                      loading: true,
                      error: null,
                    };
                  case DELETE_OURBESTSELLER_SUCCESS:
                    console.log("delete ", state.ourBestSellerProducts)
                    return {
                      ...state,
                      loading: false,
                      deleteOurBestSellerProduct:action.payload
                      
                      
                    };
                  case DELETE_OURBESTSELLER_FAILURE:
                    return {
                      ...state,
                      loading: false,
                      error: action.payload,
                    };
                default:
            return state;
    }
};

export default ourBestSellerProductReducer;