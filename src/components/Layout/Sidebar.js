// Importar librerías
import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Obtener imagen del logo
import { ReactComponent as CasaTortaLogo } from './icons/casatorta-logo.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as OrderIcon } from './icons/orders.svg';
import { ReactComponent as ProfileIcon } from './icons/profile.svg';
import { ReactComponent as RecipeIcon } from './icons/recipes.svg';
import { ReactComponent as ProductIcon } from './icons/products.svg';
import { ReactComponent as UserIcon } from './icons/users.svg';
import { ReactComponent as SignOutIcon } from './icons/signOut.svg';


// Importar context
import AuthContext from '../../context/auth/AuthContext';

// Importar subcomponente Sider
const { Sider } = Layout;

const Sidebar = () => {
    // Definir context
    const authContext = useContext(AuthContext);
    const { authenticated, user, logout } = authContext;

    // Definir state
    const [siderExpanded, setSiderExpanded] = useState(true);
    const [userRole, setUserRole] = useState(null)

    // Definir effect para obtener la información del usuario autenticado
    useEffect(() => {
        if (user) {
            setUserRole(user.role)
        }
    }, [user]);

    // Definir nueva instancia de useLocation
    const location = useLocation();

    // Renderizar componente
    return (
        authenticated && (
            <Sider
                className="side-menu"
                breakpoint={'md'}
                onCollapse={(collapsed) => setSiderExpanded(!collapsed)}
            >
                {siderExpanded ? (
                    <div className="side-logo">
                        <CasaTortaLogo />
                    </div>
                ) : (
                        <div className="side-logo side-small-logo">
                            <CasaTortaLogo />
                        </div>
                    )}
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    activeKey={[location.pathname]}
                    selectedKeys={['/' + location.pathname.split('/')[1]]}
                >
                    <Menu.Item key={ROUTES.DASHBOARD} className="side-item">
                        <Link to={ROUTES.DASHBOARD}>
                            <HomeIcon />
                            {siderExpanded && <p>Dashboard</p>}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={ROUTES.ORDERS} className="side-item">
                        <Link to={ROUTES.ORDERS}>
                            <OrderIcon />
                            {siderExpanded && <p>Pedidos</p>}
                        </Link>
                    </Menu.Item>
                    {userRole && userRole === 'user' && (
                        <Menu.Item key={ROUTES.PROFILE} className="side-item">
                            <Link to={ROUTES.PROFILE}>
                                <ProfileIcon />
                                {siderExpanded && <p>Perfil</p>}
                            </Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key={ROUTES.RECIPES} className="side-item">
                        <Link to={ROUTES.RECIPES}>
                            <RecipeIcon />
                            {siderExpanded && <p>Recetas</p>}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={ROUTES.PRODUCTS} className="side-item">
                        <Link to={ROUTES.PRODUCTS}>
                            <ProductIcon />
                            {siderExpanded && <p>Productos</p>}
                        </Link>
                    </Menu.Item>
                    {userRole && userRole === 'admin' && (
                        <Menu.Item key={ROUTES.USERS} className="side-item">
                            <Link to={ROUTES.USERS}>
                                <UserIcon />
                                {siderExpanded && <p>Usuarios</p>}
                            </Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key={ROUTES.SIGN_OUT} className="side-item sign-out-item" onClick={() => logout()}>
                        <Link to={ROUTES.HOME}>
                            <SignOutIcon />
                            {siderExpanded && <p>Cerrar Sesión</p>}
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    );
}

export default Sidebar;