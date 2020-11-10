// Importar librerías
import React, { useReducer } from 'react';

// Importar context
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

// Importar types
import {
  CLEAN_MESSAGE,
  SUCCESSFUL_UPLOAD_FILE,
  SWITCH_LOADING,
} from '../../types';

// Importar configuraciones
import axiosClient from '../../config/axios';

const OrderState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    loading: false,
    messageO: null,
    orders: [],
    pdf: '',
  };

  // Definir reducer
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Definir funciones


  /**
   * Cambia el estado de message a null.
   */
  const cleanMessage = () => {
    dispatch({
      type: CLEAN_MESSAGE,
    });
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
   * @param {*} formData
   * Sube una imagen del producto al servidor.
   */
  const uploadFileO = async (formData) => {
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
    <OrderContext.Provider
      value={{
        loading: state.loading,
        messageO: state.messageO,
        orders: state.orders,
        cleanMessage,
        switchLoading,
        uploadFileO,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;