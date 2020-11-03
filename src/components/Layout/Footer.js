// Importar librerías
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout } from 'antd';

// Obtener imagen del logo
import { ReactComponent as CasaTortaLogo } from './icons/casatorta-logo.svg';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

// Importar Subcomponente Footer
const { Footer } = Layout;

// Definir elementos del footer
const footerData = [
  {
    title: 'Navegación',
    items: [
      <NavLink exact to={{ pathname: ROUTES.HOME }}>
        Productos
        </NavLink>,
      <NavLink exact to={{ pathname: ROUTES.HOME }}>
        Nosotros
        </NavLink>,
      <NavLink exact to={{ pathname: ROUTES.HOME }}>
        Recetas
      </NavLink>,
      <NavLink exact to={{ pathname: ROUTES.HOME }}>
        Contáctanos
      </NavLink>
    ]
  },
  {
    title: '¡Síguenos!',
    items: [
      <a
        href="https://www.instagram.com/casatortalacandelaria/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>,
    ]
  },
  {
    title: 'WhatsApp',
    items: [
      <p className="whatsapp-phone">(+58) 412-5824702</p>
    ]
  }
];

const FooterLayout = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { authenticated, user } = authContext;

  // Renderizar componente
  return (
    !authenticated && !user && (
      <Footer className="footer">
        <CasaTortaLogo className="footer-logo" />
        <div className="footer-container">
          {footerData.map((data, index) => (
            <div className="footer-content" key={index}>
              <p className="footer-title">{data.title}</p>
              {data.items.map((item, index) => (
                <div className="footer-link" key={index}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Footer>
    )
  );
}

export default FooterLayout;