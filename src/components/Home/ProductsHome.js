// Importar librerías
import React, { useEffect, useContext } from 'react';
import { Carousel, Card, Divider } from 'antd';

// Importar context
import ProductContext from '../../context/products/ProductContext';

// Extraer subcomponente Meta
const { Meta } = Card;

// Componente extra
const CardProduct = ({ product }) => {
  return (
    <div className="container-card">
      <Card title={product.name}>
        <Card cover={<img alt={product.name} src={`${process.env.REACT_APP_BANCKEND_URL}/${product.image}`} />} >
          <Meta title="Código" description={product.code} />
          <Divider />
          <Meta title="Descripción" description={product.description} />
          <Divider />
          <Meta title="Unidades Disponibles" description={product.quantityAvailable} />
          <Divider />
          <Meta title="Precio Actual" description={product.price} />
        </Card>
      </Card>
    </div>
  )
};

const ProductsHome = () => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { products, getProducts } = productContext;

  // Definir effect para setear los productos y las recetas
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderizar componente
  return (
    <>
      <h1>Nuestros Productos</h1>
      <div className="carousel-container">
        <Carousel autoplay className="carousel-content">
          {products.map(product => (
            <CardProduct key={product.id} product={product} />
          )
          )}
        </Carousel>
      </div>
    </>
  );
}

export default ProductsHome;