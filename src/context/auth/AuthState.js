// Importar librerías
import React, { useReducer } from 'react';

// Importar context
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

// Importar types
import {
  AUTHENTICATED_USER,
  CLEAN_MESSAGE,
  FAILED_AUTHENTICATED_USER,
  LOGOUT,
  SUCCESSFUL_REGISTRATION,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_FORGOT_PASSWORD,
  SWITCH_LOADING,
} from '../../types';

// Importar configuraciones
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    messageA: null,
    loading: false,
  }

  // Definir reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Definir funciones
  /**
   * Obtiene la información de un usuario autenticado.
   */
  const authenticatedUser = async () => {
    // Obtener token y llamar a la función tokenAuth según sea el caso
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    };

    // Intentar obtener usuario desde la BD
    try {
      const response = await axiosClient.get('/api/auth');
      dispatch({
        type: AUTHENTICATED_USER,
        payload: response.data.user
      });
    } catch (error) {
      dispatch({
        type: FAILED_AUTHENTICATED_USER,
        payload: error.response.data.msg
      });
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
   *
   * @param {*} values
   * Actualiza la contraseña del usuario.
   */
  const forgotPassword = async (values) => {
    // Intentar actualizar la información en BD
    try {
      // Enviar a la BD
      const response = await axiosClient.post('/api/users/forgotten-password', values);

      // Actualizar state
      dispatch({
        type: SUCCESSFUL_FORGOT_PASSWORD,
        payload: response.data.msg,
      });

      return Promise.resolve();

    } catch (error) {
      // Enviar mensaje de falla
      return Promise.reject({ msg: error.response.data.msg });
    }
  };

  /**
   *
   * @param {*} values
   * Permite a un usuario loguearse dentro de la aplicación
   */
  const login = async (values) => {
    // Intentar obtener datos de la bd
    try {
      // Enviar a la BD
      const response = await axiosClient.post('/api/auth', values);

      // Actualizar state
      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: response.data.token,
      });

      return Promise.resolve();
    } catch (error) {
      // Enviar mensaje de falla
      return Promise.reject({ msg: error.response.data.msg });
    };
  };

  /**
   * Cierra la sesión de un Usuario.
   */
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  /**
   *
   * @param {*} values
   * Permite enviar una solicitud al backend para almacenar la información de un usuario.
   */
  const registerUser = async (values) => {
    // Intentar registrar usuario
    try {
      // Enviar a la BD
      const response = await axiosClient.post('/api/users', values);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_REGISTRATION,
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
   * @param {*} bool
   * Cambia de true a false y viceversa la carga de un componente.
   */
  const switchLoading = (bool) => {
    dispatch({
      type: SWITCH_LOADING,
      payload: bool,
    });
  };

  // Renderizar componente
  return (
    <AuthContext.Provider
      value={{
        authenticated: state.authenticated,
        messageA: state.messageA,
        loading: state.loading,
        token: state.token,
        user: state.user,
        authenticatedUser,
        cleanMessage,
        forgotPassword,
        login,
        logout,
        registerUser,
        switchLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthState;