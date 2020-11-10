// Importar librerías
import React, { useContext, useEffect } from 'react';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Space, Divider, message } from 'antd';
import { Link } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import OrderContext from '../../context/orders/OrderContext';

const OrdersList = () => {
  // Definir context
  const orderContext = useContext(OrderContext);
  const { loading, messageO, orders, cleanMessage } = orderContext;

  // Definir effect para obtener la información de los productos
  useEffect(() => {
    // getOrders();
    if (messageO) {
      message.error(messageO);
      cleanMessage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   * @param {*} _
   * @param {*} record
   * Rederiza un componente con las acciones a realizar en el listado de productos.
   */
  const renderActions = (_, record) => {
    return (
      <Space>
        <Link to={`${ROUTES.ORDERS}/${record.code}`}>
          {/* <EyeOutlined title="Ver" onClick={() => selectedOrder(record)} /> */}
        </Link>
      </Space>
    );
  };

  // Definir columnas de la tabla
  const columns = [
    {
      title: 'NOMBRE',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => record.name,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'ACCIONES',
      dataIndex: 'actions',
      key: 'actions',
      render: renderActions,
    },
  ];


  // Renderizar componente
  return (
    <div className="users-list">
      <div className="users-list-title">
        <h1>Pedidos Realizados</h1>
        <Link to={ROUTES.ORDER_CREATE}>
          <Button
            type="primary"
            icon={<PlusOutlined title="Nuevo" />}
          >
            Nuevo
          </Button>
        </Link>
      </div>
      <Divider />
      <div className="users-list-content">
        <Table
          loading={loading}
          columns={columns}
          dataSource={orders}
          rowKey={(r) => r.code}
        />
      </div>
    </div>




  );
}

export default OrdersList;