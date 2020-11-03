// Importar librerías
import React, { useContext } from 'react';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const Alert = () => {
    // Definir context
    const authContext = useContext(AuthContext);
    const { message } = authContext;

    // Renderizar componente
    return (
        <div className="alert-container">
            {message}
        </div>
    );
}

export default Alert;