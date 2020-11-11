// Importar librerías
import React from 'react';
import { Carousel, Image } from 'antd';

const Landing = () => {
  // Renderizar componente
  return (
    <>
      <h1>Landing</h1>
      <div className="carousel-container">
        <Carousel autoplay className="carousel-content" effect="fade">
          <div className="carousel-container">
            <Image alt="Producto 1" src="proyecto.png" height="350px" />
          </div>
          <div className="carousel-container">
            <Image alt="Producto 2" src="proyecto2.png" height="350px" />
          </div>
          <div className="carousel-container">
            <Image alt="Producto 3" src="proyecto3.png" height="350px" />
          </div>
          <div className="carousel-container">
            <Image alt="Producto 4" src="proyecto4.png" height="350px" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default Landing;