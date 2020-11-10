// Importar librerías
import React, { useContext, useEffect } from 'react';
import { Card, Divider, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

// Importar context
import RecipeContext from '../../context/recipes/RecipeContext';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Extraer subcomponente Meta
const { Meta } = Card;

const RecipeItem = () => {
  // Definir context
  const recipeContext = useContext(RecipeContext);
  const { messageR, recipe, cleanMessage, getRecipe } = recipeContext;

  // Definir nueva instancia de location
  const location = useLocation();

  // Definir effect para setear el valor de la receta en caso de que se haya recargado la página
  useEffect(() => {
    if (!recipe) {
      getRecipe(location.pathname.split('/')[2]);
      if (messageR) {
        message.error(messageR);
        cleanMessage();
      };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderizar componente
  return (
    recipe && (
      <div className="container-card">
        <div>
          <Button type="primary" href={ROUTES.RECIPES}>
            <ArrowLeftOutlined />
            Listado de Recetas
          </Button>
        </div>
        <Card title={recipe.name}>
          <Card cover={<img alt={recipe.name} src={`${process.env.REACT_APP_BANCKEND_URL}/${recipe.image}`} />} >
            <Meta title="Ingredientes" description={recipe.ingredients} />
            <Divider />
            <Meta title="Preparación" description={recipe.preparation} />
          </Card>
        </Card>
      </div>
    )
  );
}

export default RecipeItem;