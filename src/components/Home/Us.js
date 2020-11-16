// Importar librerías
import React from 'react';
import { Row, Col } from 'antd';
import GoogleMapReact from 'google-map-react';

// Definir coordenadas y zoom por defecto para el componente GoogleMapReact
const DEFAULT_CENTER = {
  lat: 10.5048301,
  lng: -66.9086053,
};
const DEFAULT_ZOOM = 18;

const Us = () => {
  /**
   *
   * @param {*} map
   * @param {*} maps
   * Agrega diversas configuraciones al mapa de google.
   */
  const handleApiLoaded = (map, maps) => {
    new maps.Marker({
      position: DEFAULT_CENTER,
      map
    })
  };

  // Renderizar componente
  return (
    <>
      <h1>Nosotros</h1>
      <Row gutter={(0, 48)} style={{ margin: '0 50px' }}>
        <Col span="12">
          <div className="container-us-text">
            <p>
              En Inversiones Casa Torta La Candelaria somos sinónimo de adaptación a los
              nuevos tiempos de Venezuela. Nuestras puertas se abren cada día para dar
              inicio a una semana de entusiasmo, lucha, trabajo y perseverancia, y con esta
              actitud ofrecerle a toda nuestra distinguida clientela los productos y utensilios
              que necesitan para elaborar sus recetas de cocina, repostería y pastelería,
              como preparar sus reuniones y celebraciones, así como satisfacer los deseos de cada pedido.
            </p>
            <p>
              Estamos ubicados en la esquina Ferrequin a Tracabordo,
              Edif. Lemmo, P.B. La Candelaria. En nuestro horario
              de lunes a viernes de 8:30am a 5:30pm y los sábados de 8:30am a 4:30pm.
            </p>
            <p>¡Te esperamos!</p>
          </div>
        </Col>
        <Col span="12">
          <div className="container-us-img">
            <img alt="Ubicación Casa Torta" src="ubication.jpg" />
            <a href="https://www.google.co.ve/maps/place/Casa+Torta+La+Candelaria/@10.5048301,-66.9086053,17z/data=!3m1!4b1!4m5!3m4!1s0x8c2a5fabd55705eb:0xe459d8b2ac24bd1d!8m2!3d10.5048301!4d-66.9064166">
              Ver Mapa
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Us;