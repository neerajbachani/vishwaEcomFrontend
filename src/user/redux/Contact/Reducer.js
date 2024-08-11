import {
    CREATE_CONTACT_FAILURE,
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAILURE,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    GET_CONTACT_FAILURE,
    GET_CONTACT_REQUEST,
    GET_CONTACT_SUCCESS,
} from "./ActionType";

const initialState = {
    contacts: [],
    loading: false,
    error: null
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: action.payload,
                loading: false,
                error: null
            };
        case GET_CONTACT_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case CREATE_CONTACT_REQUEST:
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
              case CREATE_CONTACT_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  
                };
              case CREATE_CONTACT_FAILURE:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
                case DELETE_CONTACT_REQUEST:
                    return {
                      ...state,
                      loading: true,
                      error: null,
                    };
                  case DELETE_CONTACT_SUCCESS:
                    console.log("delete ",state.contacts)
                    return {
                      ...state,
                      loading: false,
                      deleteContact:action.payload
                      
                      
                    };
                  case DELETE_CONTACT_FAILURE:
                    return {
                      ...state,
                      loading: false,
                      error: action.payload,
                    };
                default:
            return state;
    }
};

export default contactReducer;