// Importar types
import {
  CLEAN_MESSAGE,
  SUCCESSFUL_UPLOAD_FILE,
  SWITCH_LOADING
} from '../../types';

// Definir reducer
export default (state, action) => {
  switch (action.type) {
    case CLEAN_MESSAGE:
      return {
        ...state,
        messageO: null,
      };
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