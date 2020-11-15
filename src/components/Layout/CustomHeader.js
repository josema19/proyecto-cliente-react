// Importar librerías
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Divider } from 'antd';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

// Importar Subcomponente Header
const { Header } = Layout;

// Definir títulos para las rutas
const locationNames = {}

locationNames[ROUTES.DASHBOARD] = (name) => `¡Hola ${name}!`;
locationNames[ROUTES.ORDERS] = () => 'Manejo de Pedidos';
locationNames[ROUTES.RECIPES] = () => 'Manejo de Recetas';
locationNames[ROUTES.PRODUCTS] = () => 'Manejo de Productos';
locationNames[ROUTES.USERS] = () => 'Usuarios Casa Torta';
locationNames[ROUTES.PROFILE] = () => 'Mi Perfil';

const CustomHeader = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { authenticated, user } = authContext;

  // Definir nueva instancia de useLocation
  const location = useLocation();

  // Renderizar componente
  return (
    authenticated && (
      <Header className="custom-header-container">
        {user && (
          <div>
            <p className="item-left-title">
              {locationNames['/' + location.pathname.split('/')[1]]
                ? locationNames['/' + location.pathname.split('/')[1]](
                  user.firstName
                )
                : ''}
            </p>
          </div>
        )}
        <div>
          <Divider className="item-right-line" type="vertical" />
          {user && (
            <>
              <span className="item-right-role">{user.role === 'admin' ? 'Administrador: ' : 'Usuario: '}</span>
              <span className="item-right-name">{user.firstName + ' ' + user.lastName}</span>
            </>
          )}
        </div>
      </Header>
    )
  );
}

export default CustomHeader;