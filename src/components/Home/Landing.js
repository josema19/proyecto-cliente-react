// Importar librerías
import React from 'react';
import { Carousel, Image } from 'antd';

const Landing = () => {
  // Renderizar componente
  return (
    <>
      <div className="carousel-container2">
        <Carousel autoplay effect="fade">
          <div>
            <Image alt="Producto 1" src="proyecto.png" height="580px" width="100%" />
          </div>
          <div>
            <Image alt="Producto 2" src="proyecto2.png" height="580px" width="100%" />
          </div>
          <div>
            <Image alt="Producto 3" src="proyecto3.png" height="580px" width="100%" />
          </div>
          <div>
            <Image alt="Producto 4" src="proyecto4.png" height="580px" width="100%" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default Landing;