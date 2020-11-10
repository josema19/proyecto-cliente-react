// Importar types
import {
  AUTHENTICATED_USER,
  CLEAN_MESSAGE,
  FAILED_AUTHENTICATED_USER,
  LOGOUT,
  SUCCESSFUL_EDIT_PROFILE,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_REGISTRATION,
  SUCCESSFUL_FORGOT_PASSWORD,
  SUCCESSFUL_UPLOAD_FILE,
  SWITCH_LOADING,
} from '../../types';

// Definir Reducer
export default (state, action) => {
  switch (action.type) {
    case FAILED_AUTHENTICATED_USER:
    case SUCCESSFUL_EDIT_PROFILE:
    case SUCCESSFUL_REGISTRATION:
      return {
        ...state,
        messageA: action.payload,
      };
    case SUCCESSFUL_LOGIN:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
      };
    case SUCCESSFUL_FORGOT_PASSWORD:
      return {
        ...state,
        messageA: action.payload,
      };
    case SUCCESSFUL_UPLOAD_FILE:
      return {
        ...state,
        user: { ...state.user, image: action.payload },
      };
    case CLEAN_MESSAGE:
      return {
        ...state,
        messageA: null,
      };
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        authenticated: null,
        loading: false,
      };
    case SWITCH_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state;
  }
}