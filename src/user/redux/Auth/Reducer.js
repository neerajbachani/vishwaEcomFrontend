import { GET_ALL_RATINGS_SUCCESS } from '../RateAndReview/ActionType';
import { GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './ActionType';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    isAuthenticated: null,
    role: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state,
                isLoading: false,
                error: null,
                jwt: action.payload,
                isAuthenticated: true,
                user: action.payload.user,
                role: action.payload.role,
            }
        case GET_USER_SUCCESS:
            return { ...state,
                isLoading: false,                   
                error: null,
                user: action.payload,
                role: action.payload.role,
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state,
                isLoading: false,                   
                error: action.payload,
            }
            case GET_ALL_USER_REQUEST:
                return {
                  ...state,
                  loading: true,
                };
              case GET_ALL_USER_SUCCESS:
                return {
                  loading: false,
                  orders: action.payload,
                  error: "",
                };
              case GET_ALL_USER_FAILURE:
                return {
                  loading: false,
                  users: [],
                  error: action.payload,
                };
        case LOGOUT:
            return {...initialState}
        default:
            return state;
    }
}