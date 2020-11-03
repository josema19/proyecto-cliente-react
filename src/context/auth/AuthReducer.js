// Importar types
import {
  AUTHENTICATED_USER,
  CLEAN_ALERTS,
  FAILED_AUTHENTICATED_USER,
  FAILED_LOGIN,
  FAILED_REGISTRATION,
  LOGOUT,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_REGISTRATION,
} from '../../types';

// Definir Reducer
export default (state, action) => {
  switch (action.type) {
    case FAILED_AUTHENTICATED_USER:
    case FAILED_REGISTRATION:
    case FAILED_LOGIN:
    case SUCCESSFUL_REGISTRATION:
      return {
        ...state,
        message: action.payload,
      }
    case SUCCESSFUL_LOGIN:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
        loading: false,
      }
    case CLEAN_ALERTS:
      return {
        ...state,
        message: null,
      }
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        loading: false,
      }
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        authenticated: null,
        loading: false,
      }
    default:
      return state;
  }
}