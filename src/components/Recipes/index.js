// Importar librerías
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Importar otros componentes
import RecipesList from './RecipesList';

// Importar rutas
import * as ROUTES from '../../constants/routes';

const Recipes = () => (
    <>
        <Switch>
            <Route exact path={ROUTES.RECIPES} component={RecipesList} />
        </Switch>
    </>
)

export default Recipes;