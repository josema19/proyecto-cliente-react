// Importar librerías
import React, { useContext, useEffect } from 'react';
import { message } from 'antd';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import OrderContext from '../../context/orders/OrderContext';

const OrderItem = () => {
  // Definir context
  const orderContext = useContext(OrderContext);
  const { messageO, order, cleanMessage, getOrder } = orderContext;

  // Definir nueva instancia de location
  const location = useLocation();

  // Definir effect para setear el valor del pedido en caso de que se haya recargado la página
  useEffect(() => {
    if (!order) {
      getOrder(location.pathname.split('/')[2]);
      if (messageO) {
        message.error(messageO);
        cleanMessage();
      };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderizar componente
  return (
    <h1>Por definir</h1>
  );
}

export default OrderItem;