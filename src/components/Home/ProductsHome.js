// Importar librerías
import React, { useState, useEffect, useContext } from 'react';
import { Carousel, Card, Divider, Row, Col, Tooltip } from 'antd';

// Importar utilidades
import putFormat from '../../utils/putFormat'

// Importar context
import ProductContext from '../../context/products/ProductContext';

// Extraer subcomponente Meta
const { Meta } = Card;

// Componente extra
const CardProduct = ({ product }) => {
  return (
    <div className="container-card">
      <div className="container-card-content-external">
        <Card bordered={false} title={product.name}>
          <Card bordered={false} cover={<img alt={product.name} src={`${process.env.REACT_APP_BANCKEND_URL}/${product.image}`} />} >
            <Meta
              title="Descripción"
              description={
                <Tooltip
                  title='Ingresa a nuestra página para ver el resto de la descripción de este producto'
                >
                  <p className="summary2">{product.description}</p>
                </Tooltip>
              }
            />
            <Divider />
            <Meta title="Precio Actual" description={putFormat(product.price, 2)} />
          </Card>
        </Card>
      </div>
    </div>
  )
};

const ProductsHome = () => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { products, getProducts } = productContext;

  // Definir state
  const [productsLeft, setProductsLeft] = useState([]);
  const [productsRight, setProductsRight] = useState([]);

  // Definir effect para setear los productos
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Definir effect para setear los productos en dos arreglos
  useEffect(() => {
    if (products) {
      // Dividir recetas
      let itemsLeft = [];
      let itemsRight = [];
      products.forEach(item => {
        if (itemsLeft.length !== 5 && itemsRight.length !== 5) {
          itemsLeft.length === itemsRight.length ? itemsLeft.push(item) : itemsRight.push(item);
        }
      });

      // Setear valores
      setProductsLeft(itemsLeft);
      setProductsRight(itemsRight);
    };
  }, [products]);

  // Renderizar componente
  return (
    <>
      <h1>Nuestros Productos</h1>
      <Row>
        <Col span={12}>
          <div className="carousel-container">
            <Carousel autoplay effect="fade">
              {productsLeft.map(product => (
                <CardProduct key={product.id} product={product} />
              )
              )}
            </Carousel>
          </div>
        </Col>
        <Col span={12}>
          <div className="carousel-container">
            <Carousel autoplay effect="fade">
              {productsRight.map(product => (
                <CardProduct key={product.id} product={product} />
              )
              )}
            </Carousel>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProductsHome;