// Importar types
import {
  ADD_PRODUCT_LIST,
  CLEAN_MESSAGE,
  DELETE_PRODUCT_LIST,
  GET_DOLAR_VALUE,
  SUCCESSFUL_UPLOAD_FILE,
  SWITCH_LOADING
} from '../../types';

// Definir reducer
export default (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT_LIST:
      return {
        ...state,
        userProducts: [...state.userProducts, action.payload],
      }
    case CLEAN_MESSAGE:
      return {
        ...state,
        messageO: null,
      };
    case DELETE_PRODUCT_LIST:
      return {
        ...state,
        userProducts: state.userProducts.filter(item => item.code !== action.payload),
      };
    case GET_DOLAR_VALUE:
      return {
        ...state,
        dolarValue: action.payload,
      }
    case SUCCESSFUL_UPLOAD_FILE:
      return {
        ...state,
        pdf: action.payload,
      };
    case SWITCH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}