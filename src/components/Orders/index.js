// Importar librerías
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

// Importar otros componentes
import OrdersList from './OrdersList';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const Orders = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { authenticated } = authContext;

  // Renderizar componente
  return (
    authenticated && (
      <Switch>
        <Route exact path={ROUTES.ORDERS} component={OrdersList} />
        {/* <Route exact path={ROUTES.ORDER_CREATE} component={CreateOrder} />
        <Route exact path={ROUTES.ORDER_EDIT} component={EditOrder} />
        <Route exact path={ROUTES.ORDER} component={OrderItem} /> */}
      </Switch>
    )
  );
};

export default Orders;