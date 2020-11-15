// Importar librerías
import React, { useContext, useEffect } from 'react';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Space, Divider, message } from 'antd';
import { Link } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import OrderContext from '../../context/orders/OrderContext';
import AuthContext from '../../context/auth/AuthContext';

const OrdersList = () => {
  // Definir context de pedidos
  const orderContext = useContext(OrderContext);
  const { loading, messageO, orders, cleanMessage, getOrders,
    switchLoading, selectedOrder, getUserOrders } = orderContext;

  // Definir context de usuario
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // Definir effect para obtener la información de los productos según
  // el rol del usuario
  useEffect(() => {
    // Habilitar spinner de carga
    switchLoading(true);

    // Llamar a una función u otra según el rol del usuario
    if (user.role === 'user') {
      getUserOrders(user.id);
    } else {
      getOrders();
    };

    // Mostrar mensaje en caso de error
    if (messageO) {
      message.error(messageO);
      cleanMessage();
    };

    //  Inhabilitar spinner de carga
    switchLoading(false);
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
        <Link to={`${ROUTES.ORDERS}/${record.id}`}>
          <EyeOutlined title="Ver" onClick={() => selectedOrder(record)} />
        </Link>
      </Space>
    );
  };

  // Definir columnas de la tabla
  const columns = [
    {
      title: 'CÓDIGO PEDIDO',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => record.id,
      sorter: (a, b) => a.id - b.id,
      show: true,
    },
    {
      title: 'ESTADO',
      dataIndex: 'state',
      key: 'state',
      render: (_, record) => record.state,
      sorter: (a, b) => a.state.localeCompare(b.state),
      show: true,
    },
    {
      title: 'MONEDA UTILIZADA',
      dataIndex: 'coin',
      key: 'coin',
      render: (_, record) => record.coinType,
      sorter: (a, b) => a.coinType.localeCompare(b.coinType),
      show: true,
    },
    {
      title: 'PRODUCTOS ADQUIRIDOS',
      dataIndex: 'products',
      key: 'products',
      render: (_, record) => record.totalProducts,
      sorter: (a, b) => a.totalProducts - b.totalProducts,
      show: true,
    },
    {
      title: 'TOTAL (BS)',
      dataIndex: 'totalBolivares',
      key: 'totalBolivares',
      render: (_, record) => record.totalBolivares,
      sorter: (a, b) => a.totalBolivares - b.totalBolivares,
      show: true,
    },
    {
      title: 'TOTAL ($)',
      dataIndex: 'totalDolares',
      key: 'totalDolares',
      render: (_, record) => record.totalDolares,
      sorter: (a, b) => a.totalDolares - b.totalDolares,
      show: true,
    },
    {
      title: 'USUARIO',
      dataIndex: 'userId',
      key: 'userId',
      render: (_, record) => record.User.firstName + ' ' + record.User.lastName,
      sorter: (a, b) => (a.User.firstName + ' ' + a.User.lastName).localeCompare(b.User.firstName + ' ' + b.User.lastName),
      show: user.role === 'admin' ? true : false,
    },
    {
      title: 'ACCIONES',
      dataIndex: 'actions',
      key: 'actions',
      render: renderActions,
      show: user.role === 'user' ? true : false,
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
          columns={columns.filter((item) => item.show)}
          dataSource={orders}
          rowKey={(r) => r.id}
        />
      </div>
    </div>
  );
}

export default OrdersList;