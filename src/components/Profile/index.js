// Importar librerías
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

// Importar otros componentes
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const Profile = () => {
    // Definir context
    const authContext = useContext(AuthContext);
    const { authenticated } = authContext;

    // Renderizar componente
    return (
        authenticated && (
            <Switch>
                <Route exact path={ROUTES.PROFILE} component={ViewProfile} />
                <Route exact path={ROUTES.PROFILE_EDIT} component={EditProfile} />
            </Switch>
        )
    )
};

export default Profile;