// Importar librerías
import React, { useReducer } from 'react';

// Importar context
import RecipeContext from './RecipeContext';
import RecipeReducer from './RecipeReducer';

// Importar types
import {
  CLEAN_MESSAGE,
  FAILED_GET_RECIPE,
  FAILED_GET_RECIPES,
  SELECTED_RECIPE,
  SUCCESSFUL_GET_RECIPE,
  SUCCESSFUL_GET_RECIPES,
  SUCCESSFUL_UPLOAD_FILE,
  SUCCESSFUL_CREATE_RECIPE,
  SUCCESSFUL_EDIT_RECIPE,
  SUCCESSFUL_DELETE_RECIPE,
  SWITCH_LOADING,
} from '../../types';

// Importar configuraciones
import axiosClient from '../../config/axios';

const RecipeState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    image: '',
    loading: true,
    messageR: null,
    recipes: [],
    recipe: null,
  };

  // Definir reducer
  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  // Definir funciones
  /**
   *
   * @param {*} values
   * Crea una nueva receta en la BD.
   */
  const createRecipe = async (values) => {
    // Intentar almacenar la información en la BD
    try {
      // Agregar información de la imagen
      values = { ...values, image: state.image }

      const response = await axiosClient.post('/api/recipes', values);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_CREATE_RECIPE,
        payload: response.data.msg,
      });

      return Promise.resolve();
    } catch (error) {
      // Enviar mensaje de falla
      return Promise.reject({ msg: error.response.data.msg });
    };
  };

  /**
   * Cambia el estado de message a null.
   */
  const cleanMessage = () => {
    dispatch({
      type: CLEAN_MESSAGE,
    });
  };

  /**
   * Elimina la información de una receta de la BD.
   */
  const deleteRecipe = async () => {
    try {
      const response = await axiosClient.delete(`/api/recipes/${state.recipe.id}`);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_DELETE_RECIPE,
        payload: {
          message: response.data.msg,
          id: state.recipe.id,
        },
      });

      return Promise.resolve();
    } catch (error) {
      // Enviar mensaje de falla
      return Promise.reject({ msg: error.response.data.msg });
    };
  };

  /**
   *
   * @param {*} values
   * Edita la información de una receta.
   */
  const editRecipe = async (values) => {
    try {
      // Agregar información de la imagen
      values = { ...values, image: state.image }

      const response = await axiosClient.put(`/api/recipes/${state.recipe.id}`, values);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_EDIT_RECIPE,
        payload: response.data.msg,
      });

      return Promise.resolve();
    } catch (error) {
      // Enviar mensaje de falla
      return Promise.reject({ msg: error.response.data.msg });
    };
  };

  /**
   *
   * @param {*} id
   * Obtiene la información de una receta.
   */
  const getRecipe = async (id) => {
    try {
      // Obtener respuesta
      const response = await axiosClient.get(`/api/recipes/${id}`);

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_GET_RECIPE,
        payload: response.data.recipe
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_RECIPE,
        payload: error.response.data.msg
      });
    };
  };

  /**
   * Obtiene la información de todos las recetas de la aplicación.
   */
  const getRecipes = async () => {
    try {
      // Obtener respuesta
      const response = await axiosClient.get('/api/recipes');

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_GET_RECIPES,
        payload: response.data.recipes
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_RECIPES,
        payload: error.response.data.msg
      });
    };
  };

  /**
   *
   * @param {*} bool
   * Cambia de true a false y viceversa la carga de un componente.
   */
  const switchLoading = (bool) => {
    dispatch({
      type: SWITCH_LOADING,
      payload: bool,
    });
  };

  /**
   *
   * @param {*} item
   * Actualiza el state con la receta seleccionada seleccionado.
   */
  const selectedRecipe = (item) => {
    dispatch({
      type: SELECTED_RECIPE,
      payload: item,
    });
  };

  /**
   *
   * @param {*} formData
   * @param {*} fileName
   * Sube una imagen de la receta al servidor.
   */
  const uploadFileR = async (formData) => {
    try {
      const response = await axiosClient.post('/api/files', formData);
      dispatch({
        type: SUCCESSFUL_UPLOAD_FILE,
        payload: response.data.file,
      });
      return Promise.resolve();
    } catch (error) {
      // Enviar mensaje de falla
      return Promise.reject({ msg: error.response.data.msg });
    };
  };

  // Renderizar componente
  return (
    <RecipeContext.Provider
      value={{
        image: state.image,
        loading: state.loading,
        messageR: state.messageR,
        recipes: state.recipes,
        recipe: state.recipe,
        createRecipe,
        cleanMessage,
        deleteRecipe,
        editRecipe,
        getRecipe,
        getRecipes,
        switchLoading,
        selectedRecipe,
        uploadFileR,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeState;