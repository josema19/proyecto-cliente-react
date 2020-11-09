// Importar librerías
import React, { useReducer } from 'react';

// Importar context
import UserContext from './UserContext';
import UserReducer from './UserReducer';

// Importar types
import {
  CLEAN_MESSAGE,
  FAILED_GET_USERS,
  SUCCESSFUL_GET_USERS
} from '../../types';

// Importar configuraciones
import axiosClient from '../../config/axios';

const UserState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    messageU: null,
    users: [],
    loading: true,
  };

  // Definir reducer
  const [state, dispatch] = useReducer(UserReducer, initialState);

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
   * Obtiene la información de todos los usuarios de la aplicación.
   */
  const getUsers = async () => {
    try {
      // Obtener respuesta
      const response = await axiosClient.get('/api/users');

      // Actualizar información del state
      dispatch({
        type: SUCCESSFUL_GET_USERS,
        payload: response.data.users
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_USERS,
        payload: error.response.data.msg,
      })
    }
  };

  // Renderizar componente
  return (
    <UserContext.Provider
      value={{
        messageU: state.messageU,
        loading: state.loading,
        users: state.users,
        cleanMessage,
        getUsers
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserState;