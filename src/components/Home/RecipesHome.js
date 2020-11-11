// Importar librerías
import React, { useEffect, useContext } from 'react';
import { Carousel, Card, Divider } from 'antd';

// Importar context
import RecipeContext from '../../context/recipes/RecipeContext.js';

// Extraer subcomponente Meta
const { Meta } = Card;

// Componente extra
const CardRecipe = ({ recipe }) => {
  return (
    <div className="container-card">
      <Card title={recipe.name}>
        <Card cover={<img alt={recipe.name} src={`${process.env.REACT_APP_BANCKEND_URL}/${recipe.image}`} />} >
          <Meta title="Ingredientes" description={recipe.ingredients} />
          <Divider />
          <Meta title="Preparación" description={recipe.preparation} />
        </Card>
      </Card>
    </div>
  )
};

const RecipesHome = () => {
  // Definir context
  const recipeContext = useContext(RecipeContext);
  const { recipes, getRecipes } = recipeContext;

  // Definir effect para setear los productos y las recetas
  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderizar componente
  return (
    <>
      <h1>Nuestras Recetas</h1>
      <div className="carousel-container">
        <Carousel autoplay className="carousel-content" effect="fade">
          {recipes.map(recipe => (
            <CardRecipe key={recipe.id} recipe={recipe} />
          )
          )}
        </Carousel>
      </div>
    </>
  );
}

export default RecipesHome;