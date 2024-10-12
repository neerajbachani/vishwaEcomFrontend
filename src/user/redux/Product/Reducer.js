import {
  FIND_PRODUCTS_BY_CATEGORY_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
  FIND_PRODUCTS_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_ORDER_REQUEST,
  UPDATE_PRODUCT_ORDER_SUCCESS,
  UPDATE_PRODUCT_ORDER_FAILURE,
  REORDER_PRODUCT_REQUEST,
  REORDER_PRODUCT_SUCCESS,
  REORDER_PRODUCT_FAILURE,
} from "./ActionType";

const initialState = {
  products: [],
  updateProductOrder: [],
  product: null,
  loading: false,
  error: null,
  deleteProduct:null,
};

const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
      case SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
      case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
      case SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FIND_PRODUCTS_BY_CATEGORY_SUCCESS:
      return { ...state,  products: {
        ...action.payload,
        content: action.payload.content.sort((a, b) => a.productOrder - b.productOrder)
      }, loading: false };
    case FIND_PRODUCTS_BY_CATEGORY_FAILURE:
      return { ...state, loading: false, products:[], error: action.payload };
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case UPDATE_PRODUCT_ORDER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PRODUCT_ORDER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        updateProductOrder: action.payload,
      };
    case UPDATE_PRODUCT_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case CREATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case CREATE_PRODUCT_SUCCESS:
          const products = Array.isArray(state.products) ? [...state.products, action.payload] : [action.payload];
          return {
            ...state,
            loading: false,
            products,
          };
      case CREATE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPDATE_PRODUCT_SUCCESS:
      
        return {
          ...state,
          loading: false,
          products: state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          ),
        };
      case UPDATE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case REORDER_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case REORDER_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: {
          ...state.products,
          content: state.products.content.map(product =>
            product._id === action.payload._id ? action.payload : product
          ).sort((a, b) => a.productOrder - b.productOrder)
        } 
      };
  
    case REORDER_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case DELETE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_PRODUCT_SUCCESS:
        console.log("dlete ",state.products)
        return {
          ...state,
          loading: false,
          deleteProduct:action.payload
          
          
        };
      case DELETE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
};

export default customerProductReducer;
