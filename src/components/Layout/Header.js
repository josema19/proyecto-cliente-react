// Importar librerías
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Divider } from 'antd';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const Header = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { authenticated, user } = authContext;

  // Renderizar componente
  return (
    !authenticated && !user && (
      <div className="navigation-background">
        <div className="main-container navigation-container">
          <div className="navigation">
            <Link to={{ pathname: ROUTES.HOME }}>
              <img src="logo192.png" alt="Casa Torta" className="logo" />
            </Link>
            <Menu mode="horizontal" className="menu">
              <Menu.Item key="products">
                <Link to={{ pathname: ROUTES.HOME }} className="navigation-text">
                  Productos
              </Link>
              </Menu.Item>
              <Menu.Item key="us">
                <Link to={{ pathname: ROUTES.HOME }} className="navigation-text">
                  Nosotros
              </Link>
              </Menu.Item>
              <Menu.Item key="recipes">
                <Link to={{ pathname: ROUTES.HOME }} className="navigation-text">
                  Recetas
              </Link>
              </Menu.Item>
              <Menu.Item key="contacts">
                <Link to={{ pathname: ROUTES.HOME }} className="navigation-text">
                  Contáctanos
              </Link>
              </Menu.Item>
              <Menu.Item key="line">
                <Divider type="vertical" />
              </Menu.Item>
              <Menu.Item key="login">
                <Link to={{ pathname: ROUTES.SIGN_IN }} className="navigation-text">
                  Iniciar Sesión
              </Link>
              </Menu.Item>
              <Menu.Item key="register">
                <Link to={{ pathname: ROUTES.SIGN_UP }} className="navigation-text">
                  Registrarse
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    )
  );
}

export default Header;