// Importar librerías
import React, { useReducer } from 'react';
import { message } from 'antd';

// Importar context
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';

// Importar types
import {
  FAILED_GET_PRODUCTS,
  SUCCESSFUL_GET_PRODUCTS,
  SUCCESSFUL_UPLOAD_FILE,
} from '../../types';

// Importar configuraciones
import axiosClient from '../../config/axios';

const ProductState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    messageP: null,
    products: [],
    product: null,
    imageFile: null,
    loading: true,
  };

  // Definir reducer
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // Definir funciones
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
      message.error(error.response.data.msg);
    }
  };

  const uploadFile = async (formData, fileName) => {
    try {
      const response = await axiosClient.post('/api/files', formData);
      dispatch({
        type: SUCCESSFUL_UPLOAD_FILE,
        payload: response.data.file
      });
    } catch (error) {
      message.error(error.response.data.msg)
    }
  };

  // Renderizar componente
  return (
    <ProductContext.Provider
      value={{
        imageFile: state.imageFile,
        loading: state.loading,
        message: state.message,
        products: state.users,
        product: state.product,
        getProducts,
        uploadFile,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductState;
