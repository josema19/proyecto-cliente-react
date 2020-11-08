// Importar librerías
import React, { useEffect, useContext } from 'react';

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
        <h1>Dashboard Por definir</h1>
    );
}

export default Dashboard;