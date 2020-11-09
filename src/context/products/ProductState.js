// Importar librerías
import React, { useReducer } from 'react';

// Importar context
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';

// Importar types
import {
  CLEAN_MESSAGE,
  FAILED_GET_PRODUCT,
  FAILED_GET_PRODUCTS,
  SELECTED_PRODUCT,
  SUCCESSFUL_GET_PRODUCT,
  SUCCESSFUL_GET_PRODUCTS,
  SUCCESSFUL_UPLOAD_FILE,
  SUCCESSFUL_CREATE_PRODUCT,
  SUCCESSFUL_EDIT_PRODUCT,
  SUCCESSFUL_DELETE_PRODUCT,
  SWITCH_LOADING,
} from '../../types';

// Importar configuraciones
import axiosClient from '../../config/axios';

const ProductState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    image: '',
    loading: false,
    messageP: null,
    products: [],
    product: null,
  };

  // Definir reducer
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // Definir funciones
  /**
   *
   * @param {*} values
   * Crea un nuevo producto en la BD.
   */
  const createProduct = async (values) => {
    // Intentar almacenar la información en la BD
    try {
      // Agregar información de la imagen
      values = { ...values, image: state.image }

      const response = await axiosClient.post('/api/products', values);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_CREATE_PRODUCT,
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
   * Elimina la información de un producto de la BD.
   */
  const deleteProduct = async () => {
    try {
      const response = await axiosClient.delete(`/api/products/${state.product.code}`);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_DELETE_PRODUCT,
        payload: {
          message: response.data.msg,
          id: state.product.id,
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
   * Edita la información de un producto.
   */
  const editProduct = async (values) => {
    try {
      // Agregar información de la imagen
      values = { ...values, image: state.image }

      const response = await axiosClient.put(`/api/products/${state.product.code}`, values);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_EDIT_PRODUCT,
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
   * @param {*} code
   * Obtiene la información de un producto.
   */
  const getProduct = async (code) => {
    try {
      // Obtener respuesta
      const response = await axiosClient.get(`/api/products/${code}`);

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_GET_PRODUCT,
        payload: response.data.product,
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_PRODUCT,
        payload: error.response.data.msg,
      });
    };
  };

  /**
   * Obtiene la información de todos los productos de la aplicación.
   */
  const getProducts = async () => {
    try {
      // Obtener respuesta
      const response = await axiosClient.get('/api/products');

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_GET_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_PRODUCTS,
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
   * Actualiza el state con el producto seleccionado.
   */
  const selectedProduct = (item) => {
    dispatch({
      type: SELECTED_PRODUCT,
      payload: item,
    });
  };

  /**
   *
   * @param {*} formData
   * @param {*} fileName
   * Sube una imagen del producto al servidor.
   */
  const uploadFileP = async (formData) => {
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
    }
  };

  // Renderizar componente
  return (
    <ProductContext.Provider
      value={{
        image: state.image,
        loading: state.loading,
        messageP: state.messageP,
        products: state.products,
        product: state.product,
        createProduct,
        cleanMessage,
        deleteProduct,
        editProduct,
        getProduct,
        getProducts,
        switchLoading,
        selectedProduct,
        uploadFileP,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductState;
