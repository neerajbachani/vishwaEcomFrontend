import {
    CREATE_HEROSECTION_FAILURE,
    CREATE_HEROSECTION_REQUEST,
    CREATE_HEROSECTION_SUCCESS,
    DELETE_HEROSECTION_FAILURE,
    DELETE_HEROSECTION_REQUEST,
    DELETE_HEROSECTION_SUCCESS,
    GET_HEROSECTION_FAILURE,
    GET_HEROSECTION_REQUEST,
    GET_HEROSECTION_SUCCESS
} from "./ActionType";

const initialState = {
    heroSections: [],
    loading: false,
    error: null
};

const heroSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HEROSECTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_HEROSECTION_SUCCESS:
            return {
                ...state,
                heroSections: action.payload,
                loading: false,
                error: null
            };
        case GET_HEROSECTION_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case CREATE_HEROSECTION_REQUEST:
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case CREATE_HEROSECTION_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  
                };
              case CREATE_HEROSECTION_FAILURE:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
                case DELETE_HEROSECTION_REQUEST:
                    return {
                      ...state,
                      loading: true,
                      error: null,
                    };
                  case DELETE_HEROSECTION_SUCCESS:
                    console.log("delete ",state.heroSections)
                    return {
                      ...state,
                      loading: false,
                      deleteHeroSection:action.payload
                      
                      
                    };
                  case DELETE_HEROSECTION_FAILURE:
                    return {
                      ...state,
                      loading: false,
                      error: action.payload,
                    };
                default:
            return state;
    }
};

export default heroSectionReducer;
