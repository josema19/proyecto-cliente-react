// Importar librerías
import React, { useState, useEffect, useContext } from 'react';
import { Carousel, Card, Divider, Row, Col, Tooltip } from 'antd';

// Importar context
import RecipeContext from '../../context/recipes/RecipeContext.js';

// Extraer subcomponente Meta
const { Meta } = Card;

// Componente extra
const CardRecipe = ({ recipe }) => {
  return (
    <div className="container-card">
      <div className="container-card-content-external">
        <Card bordered={false} title={recipe.name}>
          <Card bordered={false} cover={<img alt={recipe.name} src={`${process.env.REACT_APP_BANCKEND_URL}/${recipe.image}`} />} >
            <Meta
              title="Ingredientes"
              description={
                <Tooltip
                  title={recipe.ingredients}
                >
                  <p className="summary2">{recipe.ingredients}</p>
                </Tooltip>
              }
            />
            <Divider />
            <Meta
              title="Preparación"
              description={
                <Tooltip
                  title={recipe.preparation}
                >
                  <p className="summary2">{recipe.preparation}</p>
                </Tooltip>
              }
            />
          </Card>
        </Card>
      </div>
    </div>
  )
};

const RecipesHome = () => {
  // Definir context
  const recipeContext = useContext(RecipeContext);
  const { recipes, getRecipes } = recipeContext;

  // Definir state
  const [recipesLeft, setRecipesLeft] = useState([]);
  const [recipesRight, setRecipesRight] = useState([]);

  // Definir effect para setear las recetas
  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Definir effect para setear las recetas en dos arreglos
  useEffect(() => {
    if (recipes) {
      // Dividir recetas
      let itemsLeft = [];
      let itemsRight = [];
      recipes.forEach(item => {
        if (itemsLeft.length !== 5 && itemsRight.length !== 5) {
          itemsLeft.length === itemsRight.length ? itemsLeft.push(item) : itemsRight.push(item);
        }
      });

      // Setear valores
      setRecipesLeft(itemsLeft);
      setRecipesRight(itemsRight);
    };
  }, [recipes]);

  // Renderizar componente
  return (
    <>
      <h1>Nuestras Recetas</h1>
      <Row>
        <Col span={12}>
          <div className="carousel-container">
            <Carousel autoplay effect="fade">
              {recipesLeft.map(recipe => (
                <CardRecipe key={recipe.id} recipe={recipe} />
              )
              )}
            </Carousel>
          </div>
        </Col>
        <Col span={12}>
          <div className="carousel-container">
            <Carousel autoplay effect="fade">
              {recipesRight.map(recipe => (
                <CardRecipe key={recipe.id} recipe={recipe} />
              )
              )}
            </Carousel>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default RecipesHome;