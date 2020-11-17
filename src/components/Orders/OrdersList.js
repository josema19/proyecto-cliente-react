// Importar librerías
import React, { useContext, useEffect } from 'react';
import { EyeOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Space, Divider, message } from 'antd';
import { Link } from 'react-router-dom';

// Importar utilidades
import putFormat from '../../utils/putFormat'

// Importar otros componentes
import EditOrder from './EditOrder';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import OrderContext from '../../context/orders/OrderContext';
import AuthContext from '../../context/auth/AuthContext';

const OrdersList = () => {
  // Definir context de pedidos
  const orderContext = useContext(OrderContext);
  const { loading, messageO, orders, showModal, cleanMessage, getOrders,
    openModal, switchLoading, selectedOrder, getUserOrders } = orderContext;

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
        {record.state === 'PENDIENTE' && (
          <EditOutlined
            title="Editar"
            onClick={() => openModal(record, true)}
          />
        )}
      </Space>
    );
  };

  // Definir columnas de la tabla
  const columns = [
    {
      title: 'CÓDIGO',
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
      title: 'RETIRAR',
      dataIndex: 'service',
      key: 'service',
      render: (_, record) => record.service,
      sorter: (a, b) => a.service.localeCompare(b.service),
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
      render: (_, record) => putFormat(record.totalBolivares, 2),
      sorter: (a, b) => putFormat(a.totalBolivares, 2) - putFormat(b.totalBolivares, 2),
      show: true,
    },
    {
      title: 'TOTAL ($)',
      dataIndex: 'totalDolares',
      key: 'totalDolares',
      render: (_, record) => putFormat(record.totalDolares, 2),
      sorter: (a, b) => putFormat(a.totalDolares, 2) - putFormat(b.totalDolares, 2),
      show: true,
    },
    {
      title: 'USUARIO',
      dataIndex: 'userId',
      key: 'userId',
      render: (_, record) => record.User ? record.User.firstName + ' ' + record.User.lastName : '-',
      sorter: (a, b) => {
        let userA = a.User ? a.User.firstName + ' ' + a.User.lastName : '-';
        let userB = b.User ? b.User.firstName + ' ' + b.User.lastName : '-';
        return userA.localeCompare(userB);
      },
      show: user.role === 'admin' ? true : false,
    },
    {
      title: 'ACCIONES',
      dataIndex: 'actions',
      key: 'actions',
      render: renderActions,
      show: true,
    },
  ];


  // Renderizar componente
  return (
    <div className="users-list">
      {showModal && <EditOrder />}
      <div className="users-list-title">
        <h1>Pedidos Realizados</h1>
        {user.role === 'user' && (
          <Link to={ROUTES.ORDER_CREATE}>
            <Button
              type="primary"
              icon={<PlusOutlined title="Nuevo" />}
            >
              Nuevo
            </Button>
          </Link>
        )}
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