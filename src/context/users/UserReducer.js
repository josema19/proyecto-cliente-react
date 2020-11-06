// Importar types
import { FAILED_GET_USERS, SUCCESSFUL_GET_USERS } from '../../types';

// Definir reducer
export default (state, action) => {
  switch (action.type) {
    case FAILED_GET_USERS:
      return {
        ...state,
        message: action.payload,
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