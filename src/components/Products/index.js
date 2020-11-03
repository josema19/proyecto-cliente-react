// Importar librerías
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Importar otros componentes
import ProductsList from './ProductsList';

// Importar rutas
import * as ROUTES from '../../constants/routes';

const Products = () => (
    <>
        <Switch>
            <Route exact path={ROUTES.PRODUCTS} component={ProductsList} />
        </Switch>
    </>
)

export default Products;