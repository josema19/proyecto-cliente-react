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
  FAILED_GET_ORDER,
  FAILED_GET_ORDERS,
  FAILED_GET_USER_ORDERS,
  GET_DOLAR_VALUE,
  OPEN_MODAL,
  SELECTED_ORDER,
  SUCCESSFUL_UPLOAD_FILE,
  SUCCESSFUL_CREATE_ORDER,
  SUCCESSFUL_GET_ORDER,
  SUCCESSFUL_GET_ORDERS,
  SUCCESSFUL_GET_USER_ORDERS,
  SUCCESSFUL_EDIT_ORDER,
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
    order: null,
    orders: [],
    showModal: false,
    userProducts: [],
    voucher: '',
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
  const createOrder = async (values) => {
    // Intentar almacenar la información en la BD
    try {
      // Agregar información del voucher
      values = { ...values, voucher: state.voucher }

      await axiosClient.post('/api/orders', values);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_CREATE_ORDER,
        payload: 'Gracias por su compra.' + (values.service === 'Tienda' ? ' Lo esperamos!' : ' Nos estaremos comunicando con usted!'),
      });

      return Promise.resolve();
    } catch (error) {
      // Enviar mensaje de falla
      return Promise.reject({ msg: error.response.data.msg });
    };
  };

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
   *
   * @param {*} values
   * Edita por el momento el estado de una solicitud.
   */
  const editOrder = async (values) => {
    try {
      // Obtener respuesta
      const response = await axiosClient.put(`/api/orders/${state.order.id}`, values);

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_EDIT_ORDER,
        payload: {
          state: values.state,
          id: state.order.id,
          msg: response.data.msg,
        },
      });

      // Devolver Promesa
      return Promise.resolve();
    } catch (error) {
      // Enviar mensaje de falla
      return Promise.reject({ msg: error.response.data.msg });
    };
  };

  /**
   *
   * @param {*} id
   * Obtiene la información de un producto.
   */
  const getOrder = async (id) => {
    try {
      // Obtener respuesta
      const response = await axiosClient.get(`/api/orders/${id}`);

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_GET_ORDER,
        payload: response.data.order,
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_ORDER,
        payload: error.response.data.msg,
      });
    };
  };

  /**
   * Obtiene la información de todos los pedidos de la aplicación.
   */
  const getOrders = async () => {
    try {
      // Obtener respuesta
      const response = await axiosClient.get('/api/orders');

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_GET_ORDERS,
        payload: response.data.orders,
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_ORDERS,
        payload: error.response.data.msg
      });
    };
  };

  /**
   * Obtiene la información de los pedidos asociados al usuario cuyo rol es user.
   */
  const getUserOrders = async (userId) => {
    try {
      // Obtener respuesta
      const response = await axiosClient.get(`/api/orders/user/${userId}`);

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_GET_USER_ORDERS,
        payload: response.data.orders,
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_USER_ORDERS,
        payload: error.response.data.msg
      });
    };
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
   * Habilita el modal para editar el estado de una solicitud.
   */
  const openModal = (item, bool) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        order: item,
        bool,
      },
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
   * @param {*} item
   * Actualiza el state con el pedido seleccionado.
   */
  const selectedOrder = (item) => {
    dispatch({
      type: SELECTED_ORDER,
      payload: item,
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
        order: state.order,
        orders: state.orders,
        showModal: state.showModal,
        userProducts: state.userProducts,
        voucher: state.voucher,
        addProduct,
        cleanMessage,
        createOrder,
        deleteProduct,
        editOrder,
        getOrder,
        getOrders,
        getUserOrders,
        getDolarValue,
        openModal,
        switchLoading,
        selectedOrder,
        uploadFileO,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;