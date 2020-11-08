// Importar types
import {
  CLEAN_MESSAGE,
  FAILED_GET_PRODUCT,
  FAILED_GET_PRODUCTS,
  SELECTED_PRODUCT,
  SUCCESSFUL_UPLOAD_FILE,
  SUCCESSFUL_GET_PRODUCT,
  SUCCESSFUL_GET_PRODUCTS,
  SUCCESSFUL_CREATE_PRODUCT,
  SUCCESSFUL_EDIT_PRODUCT,
  SUCCESSFUL_DELETE_PRODUCT,
  SWITCH_LOADING
} from '../../types';

// Definir reducer
export default (state, action) => {
  switch (action.type) {
    case CLEAN_MESSAGE:
      return {
        ...state,
        messageP: null,
      };
    case FAILED_GET_PRODUCT:
    case FAILED_GET_PRODUCTS:
      return {
        ...state,
        messageP: action.payload,
      };
    case SUCCESSFUL_EDIT_PRODUCT:
    case SUCCESSFUL_CREATE_PRODUCT:
      return {
        ...state,
        messageP: action.payload,
        image: '',
        product: null,
      };
    case SUCCESSFUL_GET_PRODUCT:
    case SELECTED_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case SUCCESSFUL_GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case SUCCESSFUL_UPLOAD_FILE:
      return {
        ...state,
        image: action.payload,
      };
    case SUCCESSFUL_DELETE_PRODUCT:
      return {
        ...state,
        product: null,
        messageP: action.payload.message,
        products: state.products.filter(product => product.id !== action.payload.id),
      }
    case SWITCH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}