// Importar librerías
import React, { useReducer } from 'react';

// Importar context
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

// Importar types
import {
  AUTHENTICATED_USER,
  CLEAN_ALERTS,
  FAILED_AUTHENTICATED_USER,
  FAILED_LOGIN,
  FAILED_REGISTRATION,
  LOGOUT,
  SUCCESSFUL_REGISTRATION,
  SUCCESSFUL_LOGIN,
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
    message: null,
    loading: true,
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

      // Remover alerta
      setTimeout(() => {
        dispatch({
          type: CLEAN_ALERTS
        });
      }, 2000);
    };
  };

  /**
   *
   * @param {*} values
   * Permite a un usuario loguearse dentro de la aplicación
   */
  const login = async (values) => {
    // Intentar obtener datos de la bd
    let response = null
    try {
      // Enviar a la BD
      response = await axiosClient.post('/api/auth', values);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: response.data.token,
      });
    } catch (error) {
      // Actualizar state del mensaje
      dispatch({
        type: FAILED_LOGIN,
        payload: error.response.data.msg,
      });
    };

    // Borrar mensaje
    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERTS,
      });
    }, 2000);

    // Devolver promesa según sea el caso
    if (response) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Error 404. Ver mensaje en interfaz'));
    }
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
    let response = null;
    try {
      // Enviar a la BD
      response = await axiosClient.post('/api/users', values);

      // Actualizar state del mensaje
      dispatch({
        type: SUCCESSFUL_REGISTRATION,
        payload: response.data.msg,
      });
    } catch (error) {
      // Actualizar state del mensaje
      dispatch({
        type: FAILED_REGISTRATION,
        payload: error.response.data.msg,
      });
    };

    // Borrar mensaje
    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERTS,
      });
    }, 2000);

    // Devolver promesa según sea el caso
    if (response) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Error 404. Ver mensaje en interfaz'));
    }
  };

  // Renderizar componente
  return (
    <AuthContext.Provider
      value={{
        authenticated: state.authenticated,
        message: state.message,
        loading: state.loading,
        token: state.token,
        user: state.user,
        authenticatedUser,
        login,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthState;