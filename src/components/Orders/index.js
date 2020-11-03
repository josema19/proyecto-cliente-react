// Importar librerías
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Importar otros componentes
import OrdersList from './OrdersList';

// Importar rutas
import * as ROUTES from '../../constants/routes';

const Orders = () => (
    <>
        <Switch>
            <Route exact path={ROUTES.ORDERS} component={OrdersList} />
        </Switch>
    </>
)

export default Orders;