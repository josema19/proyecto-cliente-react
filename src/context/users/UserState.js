// Importar librerías
import React, { useReducer } from 'react';

// Importar context
import UserContext from './UserContext';
import UserReducer from './UserReducer';

// Importar types
import { FAILED_GET_USERS, SUCCESSFUL_GET_USERS } from '../../types';

// Importar configuraciones
import axiosClient from '../../config/axios';

const UserState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    message: null,
    users: [],
    loading: true,
  };

  // Definir reducer
  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Definir funciones
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
        users: state.users,
        loading: state.loading,
        getUsers
      }}
    >
      {children}
    </UserContext.Provider>
  )

}

export default UserState;