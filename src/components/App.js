// Importar librerías
import React, { useContext } from 'react';
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
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Recipes from './Recipes';
import Products from './Products';
import Users from './Users';
import Footer from '../components/Layout/Footer';

// Importar state
import AuthState from '../context/auth/AuthState';
import UserState from '../context/users/UserState';
import ProductState from '../context/products/ProductState';

// Importar context
import AuthContext from '../context/auth/AuthContext';

// Importar subcomponente
const { Content } = Layout;

// Definir componentes generales
const GeneralComponents = () => {
    // Definir context
    const authContext = useContext(AuthContext);
    const { authenticated } = authContext;

    // Renderizar componente
    return (
        <>
            <Sidebar />
            <Header />
            <Layout>
                <CustomHeader />
                <Content className={authenticated ? "main-internal-container" : "main-container"}>
                    <Switch>
                        <Route exact path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.SIGN_IN} component={Signin} />
                        <Route path={ROUTES.SIGN_UP} component={Signup} />
                        <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
                        <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} />
                        <PrivateRoute path={ROUTES.ORDERS} component={Orders} />
                        <PrivateRoute path={ROUTES.RECIPES} component={Recipes} />
                        <PrivateRoute path={ROUTES.PRODUCTS} component={Products} />
                        <PrivateRoute path={ROUTES.USERS} component={Users} />
                    </Switch>
                </Content>
            </Layout>
            <Footer />
        </>
    )
};

const App = () => (
    <AuthState>
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
    </AuthState>
)

export default App;
