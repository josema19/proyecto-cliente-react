// Importar types
import { FAILED_GET_PRODUCTS, SUCCESSFUL_GET_PRODUCTS } from '../../types';

// Definir reducer
export default (state, action) => {
  switch (action.type) {
    case FAILED_GET_PRODUCTS:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case SUCCESSFUL_GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}