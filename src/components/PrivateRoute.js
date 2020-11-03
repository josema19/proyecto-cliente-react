// Importar librerías
import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Importar context
import AuthContext from '../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    // Definir context
    const authContext = useContext(AuthContext);
    const { authenticated, loading, authenticatedUser } = authContext;

    // Definir effect para obtener la información del usuario autenticado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authenticatedUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Route {...props} render={props => !authenticated && !loading ? (
            <Redirect to="/" />
        ) : (
                <Component {...props} />
            )} />
    )
}

export default PrivateRoute;