// Importar librerías
import React, { useContext, useEffect } from 'react';
import { Card, Divider, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

// Importar utilidades
import putFormat from '../../utils/putFormat'

// Importar context de auth y product
import AuthContext from '../../context/auth/AuthContext';
import ProductContext from '../../context/products/ProductContext';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Extraer subcomponente Meta
const { Meta } = Card;

const ProductItem = () => {
  // Definir context de usuario autenticado
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // Definir context de products
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
      <div className="container-card">
        <div>
          <Button type="primary" href={ROUTES.PRODUCTS}>
            <ArrowLeftOutlined />
            Listado de Productos
          </Button>
        </div>
        <Card bordered={false} title={product.name}>
          <Card bordered={false} cover={<img alt={product.name} src={`${process.env.REACT_APP_BANCKEND_URL}/${product.image}`} />} >
            {user.role === 'admin' && (
              <>
                <Meta title="Código" description={product.code} />
                <Divider />
              </>
            )}
            <Meta title="Descripción" description={product.description} />
            <Divider />
            <Meta title="Unidades Disponibles" description={putFormat(product.quantityAvailable)} />
            <Divider />
            <Meta title="Precio Actual" description={putFormat(product.price, 2)} />
          </Card>
        </Card>
      </div>
    )
  );
};

export default ProductItem;