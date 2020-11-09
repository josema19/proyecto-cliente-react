// Importar types
import {
  CLEAN_MESSAGE,
  FAILED_GET_USERS,
  SUCCESSFUL_GET_USERS
} from '../../types';

// Definir reducer
export default (state, action) => {
  switch (action.type) {
    case CLEAN_MESSAGE:
      return {
        ...state,
        messageU: null,
      };
    case FAILED_GET_USERS:
      return {
        ...state,
        messageU: action.payload,
        loading: false,
      };
    case SUCCESSFUL_GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}