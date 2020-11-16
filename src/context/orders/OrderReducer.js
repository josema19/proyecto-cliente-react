// Importar types
import {
  ADD_PRODUCT_LIST,
  CLEAN_MESSAGE,
  DELETE_PRODUCT_LIST,
  FAILED_GET_ORDER,
  FAILED_GET_ORDERS,
  FAILED_GET_USER_ORDERS,
  GET_DOLAR_VALUE,
  OPEN_MODAL,
  SELECTED_ORDER,
  SUCCESSFUL_UPLOAD_FILE,
  SUCCESSFUL_CREATE_ORDER,
  SUCCESSFUL_GET_ORDER,
  SUCCESSFUL_GET_ORDERS,
  SUCCESSFUL_GET_USER_ORDERS,
  SUCCESSFUL_EDIT_ORDER,
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
    case FAILED_GET_ORDER:
    case FAILED_GET_ORDERS:
    case FAILED_GET_USER_ORDERS:
      return {
        ...state,
        messageP: action.payload,
      };
    case GET_DOLAR_VALUE:
      return {
        ...state,
        dolarValue: action.payload,
      };
    case OPEN_MODAL:
      return {
        ...state,
        order: action.payload.order,
        showModal: action.payload.bool,
      };
    case SUCCESSFUL_GET_ORDER:
    case SELECTED_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case SUCCESSFUL_CREATE_ORDER:
      return {
        ...state,
        messageO: action.payload,
        voucher: '',
        userProducts: [],
      };
    case SUCCESSFUL_EDIT_ORDER:
      return {
        ...state,
        messageO: action.payload.msg,
        orders: state.orders.map(item => item.id === action.payload.id ?
          { ...item, state: action.payload.state } : item),
      };
    case SUCCESSFUL_GET_USER_ORDERS:
    case SUCCESSFUL_GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case SUCCESSFUL_UPLOAD_FILE:
      return {
        ...state,
        voucher: action.payload,
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