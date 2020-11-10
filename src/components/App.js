// Importar librerías
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

// Importar rutas
import * as ROUTES from '../constants/routes';

// Importar otros componentes
import Sidebar from './Layout/Sidebar';
import CustomHeader from './Layout/CustomHeader';
import Header from '../components/Layout/Header';
import Home from '../components/Home';
import Signin from '../components/Session/Signin';
import Signup from '../components/Session/Signup';
import ForgotPassword from '../components/Session/ForgotPassword';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Profile from './Profile';
import Recipes from './Recipes';
import Products from './Products';
import Users from './Users';
import Footer from '../components/Layout/Footer';

// Importar context
import OrderState from '../context/orders/OrderState';
import AuthState from '../context/auth/AuthState';
import UserState from '../context/users/UserState';
import ProductState from '../context/products/ProductState';
import RecipeState from '../context/recipes/RecipeState';

// Importar context
import AuthContext from '../context/auth/AuthContext';

// Importar subcomponente
const { Content } = Layout;

// Definir componentes generales
const GeneralComponents = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { authenticated, authenticatedUser } = authContext;

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
    <>
      <Sidebar />
      <Header />
      <Layout>
        <CustomHeader />
        <Content className={authenticated ? "main-internal-container" : ""}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.SIGN_IN} component={Signin} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route path={ROUTES.ORDERS} component={Orders} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.RECIPES} component={Recipes} />
            <Route path={ROUTES.PRODUCTS} component={Products} />
            <Route path={ROUTES.USERS} component={Users} />
          </Switch>
        </Content>
      </Layout>
      <Footer />
    </>
  )
};

const App = () => (
  <AuthState>
    <OrderState>
      <RecipeState>
        <ProductState>
          <UserState>
            <Router>
              <Layout>
                <Switch>
                  <Route path="/" component={GeneralComponents} />
                </Switch>
              </Layout>
            </Router>
          </UserState>
        </ProductState>
      </RecipeState>
    </OrderState>
  </AuthState>
)

export default App;
