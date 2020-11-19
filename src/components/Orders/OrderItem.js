// Importar librerías
import React, { useContext, useEffect } from 'react';
import { message, List, Button, Avatar, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';

// Importar utilidades
import putFormat from '../../utils/putFormat'

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

  // Definir Header Component para renderizar
  const Header = () => (
    <div className="container-list-header">
      <p>Orden # {order.id}</p>
    </div>
  );

  // Definir Footer Component para renderizar
  const Footer = () => (
    <div className="container-list-footer">
      <h3>Comprobante de Pago</h3>
      <span onClick={() => window.open(`${process.env.REACT_APP_BANCKEND_URL}/${order.voucher}`)}>
        <Space>
          {order.voucher}
          <DownloadOutlined />
        </Space>
      </span>
    </div>
  );

  // Renderizar componente
  return (
    order && (
      <div className="container-list">
        <Button type="primary" href={ROUTES.ORDERS}>
          <ArrowLeftOutlined />
          Listado de Pedidos
        </Button>
        <List
          size="large"
          header={<Header />}
          footer={order.voucher !== '' ? <Footer /> : null}
          bordered
          dataSource={order.products}
          renderItem={item => {
            return (
              <List.Item>
                <div className="container-list-body">
                  <div>
                    <h1>Producto</h1>
                    <p> {item.name}</p>
                  </div>
                  <div>
                    <h1>Cantidad Adquirida</h1>
                    <p>{putFormat(item.quantity)}</p>
                  </div>
                  <div>
                    <h1>Imagen</h1>
                    <Avatar src={`${process.env.REACT_APP_BANCKEND_URL}/${item.image}`} size="large" shape="square" />
                  </div>
                </div>
              </List.Item>
            )
          }}
        />
      </div>
    )
  );
}

export default OrderItem;