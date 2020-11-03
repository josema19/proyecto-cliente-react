// Importar librerías
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Importar otros componentes
import UsersList from './UsersList';

// Importar rutas
import * as ROUTES from '../../constants/routes';

const Users = () => (
    <>
        <Switch>
            <Route exact path={ROUTES.USERS} component={UsersList} />
        </Switch>
    </>
)

export default Users;