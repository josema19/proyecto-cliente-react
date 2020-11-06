// Importar librerías
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Importar otros componentes
import ProductsList from './ProductsList';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import ProductItem from './ProductItem';

// Importar rutas
import * as ROUTES from '../../constants/routes';

const Products = () => (
    <>
        <Switch>
            <Route exact path={ROUTES.PRODUCTS} component={ProductsList} />
            <Route exact path={ROUTES.PRODUCT_CREATE} component={CreateProduct} />
            <Route exact path={ROUTES.PRODUCT_EDIT} component={EditProduct} />
            <Route exact path={ROUTES.PRODUCT} component={ProductItem} />
        </Switch>
    </>
)

export default Products;