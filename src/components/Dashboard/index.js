// Importar librerías
import React, { useEffect, useContext } from 'react';

// Importar otros componentes
import Landing from '../Home/Landing';
import ProductsHome from '../Home/ProductsHome';
import RecipesHome from '../Home/RecipesHome';
import Us from '../Home/Us';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const Dashboard = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { authenticatedUser } = authContext;

  // Definir effect para obtener la información del usuario autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authenticatedUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Renderizar componente
  return (
    <div className="home-container-dashboard">
      <Landing />
      <div className="home-dashboard-recipes">
        <RecipesHome />
      </div>
      <div className="home-dashboard-us">
        <Us />
      </div>
      <div className="home-dashboard-products">
        <ProductsHome />
      </div>
    </div>
  );
}

export default Dashboard;