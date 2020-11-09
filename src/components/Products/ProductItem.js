// Importar librerías
import React, { useContext, useEffect } from 'react';
import { Card, Divider, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

// Importar context
import ProductContext from '../../context/products/ProductContext';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Extraer subcomponente Meta
const { Meta } = Card;

const ProductItem = () => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { messageP, product, cleanMessage, getProduct } = productContext;

  // Definir nueva instancia de location
  const location = useLocation();

  // Definir effect para setear el valor del producto en caso de que se haya recargado la página
  useEffect(() => {
    if (!product) {
      getProduct(location.pathname.split('/')[2]);
      if (messageP) {
        message.error(messageP);
        cleanMessage();
      };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderizar componente
  return (
    product && (
      <>
        <div>
          <Button type="link" href={ROUTES.PRODUCTS}>
            <ArrowLeftOutlined />
            Listado de Productos
          </Button>
        </div>
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
      </>
    )
  );
}

export default ProductItem;