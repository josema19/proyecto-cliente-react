// Importar librerías
import React, { useEffect } from 'react';
import { animateScroll, Element, scroller } from 'react-scroll';
import { useLocation } from 'react-router-dom';

// Importar otros componentes
import Landing from './Landing';
import ProductsHome from './ProductsHome';
import Us from './Us';
import RecipesHome from './RecipesHome';

const Home = () => {
  // Definir instancia de location
  const location = useLocation();

  // Definir effect para setear la animación del scroll
  useEffect(() => {
    const { scrollTo } = location;
    if (scrollTo) {
      if (scrollTo === 'landing') {
        animateScroll.scrollToTop();
      } else {
        scroller.scrollTo(scrollTo, {
          smooth: true,
          offset: -window.innerHeight * 0.11,
        })
      }
    }
  });

  // Renderizar componente
  return (
    <div className="home-container">
      <Element name="landing" className="home-landing">
        <Landing />
      </Element>
      <Element name="productshome" className="home-products">
        <ProductsHome />
      </Element>
      <Element name="us" className="home-us">
        <Us />
      </Element>
      <Element name="recipeshome" className="home-recipes">
        <RecipesHome />
      </Element>
    </div>
  );
};

export default Home;