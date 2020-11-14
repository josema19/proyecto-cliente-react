// Importar librerías
import React, { useReducer } from 'react';
import axios from 'axios';

// Importar context
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

// Importar types
import {
  ADD_PRODUCT_LIST,
  CLEAN_MESSAGE,
  DELETE_PRODUCT_LIST,
  GET_DOLAR_VALUE,
  SUCCESSFUL_UPLOAD_FILE,
  SWITCH_LOADING,
} from '../../types';

// Importar configuraciones
import axiosClient from '../../config/axios';

const OrderState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    dolarValue: 0,
    loading: false,
    messageO: null,
    pdf: '',
    userProducts: [],
  };

  // Definir reducer
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Definir funciones
  /**
   *
   * @param {*} product
   * Agrega la información de un producto a la lista de productos del pedido.
   */
  const addProduct = (product) => {
    dispatch({
      type: ADD_PRODUCT_LIST,
      payload: product,
    });
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
   *
   * @param {*} values
   */
  const createOrder = (values) => {
    console.log('Creando pedido...');
  }

  /**
   *
   * @param {*} productId
   * Elimina un producto de la lista de productos.
   */
  const deleteProduct = (productId) => {
    dispatch({
      type: DELETE_PRODUCT_LIST,
      payload: productId,
    });
  };

  /**
   * Setea la información del dolar.
   */
  const getDolarValue = async () => {
    try {
      const response = await axios.get('https://s3.amazonaws.com/dolartoday/data.json');
      dispatch({
        type: GET_DOLAR_VALUE,
        payload: response.data.USD.promedio,
      });
    } catch (error) {
      console.log(error);
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
        dolarValue: state.dolarValue,
        loading: state.loading,
        messageO: state.messageO,
        orders: state.orders,
        userProducts: state.userProducts,
        step: state.step,
        addProduct,
        cleanMessage,
        createOrder,
        deleteProduct,
        getDolarValue,
        switchLoading,
        uploadFileO,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;