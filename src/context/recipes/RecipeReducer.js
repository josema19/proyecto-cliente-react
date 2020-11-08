// Importar types
import {
  CLEAN_MESSAGE,
  FAILED_GET_RECIPE,
  FAILED_GET_RECIPES,
  SELECTED_RECIPE,
  SUCCESSFUL_UPLOAD_FILE,
  SUCCESSFUL_GET_RECIPE,
  SUCCESSFUL_GET_RECIPES,
  SUCCESSFUL_CREATE_RECIPE,
  SUCCESSFUL_EDIT_RECIPE,
  SUCCESSFUL_DELETE_RECIPE,
  SWITCH_LOADING
} from '../../types';

// Definir reducer
export default (state, action) => {
  switch (action.type) {
    case CLEAN_MESSAGE:
      return {
        ...state,
        messageR: null,
      };
    case FAILED_GET_RECIPE:
    case FAILED_GET_RECIPES:
      return {
        ...state,
        messageR: action.payload,
      };
    case SUCCESSFUL_EDIT_RECIPE:
    case SUCCESSFUL_CREATE_RECIPE:
      return {
        ...state,
        messageR: action.payload,
        image: '',
        recipe: null,
      };
    case SUCCESSFUL_GET_RECIPE:
    case SELECTED_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case SUCCESSFUL_GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case SUCCESSFUL_UPLOAD_FILE:
      return {
        ...state,
        image: action.payload,
      };
    case SUCCESSFUL_DELETE_RECIPE:
      return {
        ...state,
        recipe: null,
        messageR: action.payload.message,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload.id),
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