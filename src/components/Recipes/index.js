// Importar librerías
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

// Importar otros componentes
import RecipesList from './RecipesList';
import CreateRecipe from './CreateRecipe';
import EditRecipe from './EditRecipe';
import RecipeItem from './RecipeItem';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const Recipes = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { authenticated } = authContext;

  // Renderizar componente
  return (
    authenticated && (
      <Switch>
        <Route exact path={ROUTES.RECIPES} component={RecipesList} />
        <Route exact path={ROUTES.RECIPE_CREATE} component={CreateRecipe} />
        <Route exact path={ROUTES.RECIPE_EDIT} component={EditRecipe} />
        <Route exact path={ROUTES.RECIPE} component={RecipeItem} />
      </Switch>
    )
  );
};

export default Recipes;