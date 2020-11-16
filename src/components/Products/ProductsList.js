// Importar librerías
import React, { useState, useContext, useEffect } from 'react';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Divider, Table, Button, Space, message } from 'antd';
import { Link } from 'react-router-dom';

// Importar utilidades
import putFormat from '../../utils/putFormat'

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar otros componentes
import DeleteProductModal from './DeleteProductModal';

// Importar context de auth y product
import AuthContext from '../../context/auth/AuthContext';
import ProductContext from '../../context/products/ProductContext';

const ProductsList = () => {
  // Definir context de usuario autenticado
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // Definir context de products
  const productContext = useContext(ProductContext);
  const { loading, products, messageP, cleanMessage, getProducts, selectedProduct, switchLoading } = productContext;

  // Definir state
  const [openDeleteModal, setOpenDeleteModal] = useState(null);

  // Definir effect para obtener la información de los productos
  useEffect(() => {
    switchLoading(true);
    getProducts();
    if (messageP) {
      message.error(messageP);
      cleanMessage();
    };
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
        <Link to={`${ROUTES.PRODUCTS}/${record.code}`}>
          <EyeOutlined title="Ver" onClick={() => selectedProduct(record)} />
        </Link>
        {user.role === 'admin' && (
          <>
            <Link to={ROUTES.PRODUCT_EDIT}>
              <EditOutlined title="Editar" onClick={() => selectedProduct(record)} />
            </Link>
            <DeleteOutlined
              title="Eliminar"
              onClick={() => setFields(record)}
            />
          </>
        )}
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
      show: true,
    },
    {
      title: 'CÓDIGO',
      dataIndex: 'code',
      key: 'code',
      render: (_, record) => record.code,
      sorter: (a, b) => a.code.localeCompare(b.code),
      show: user.role === 'admin' ? true : false,
    },
    {
      title: 'IMAGEN',
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      render: (_, record) => {
        return <Avatar src={`${process.env.REACT_APP_BANCKEND_URL}/${record.image}`} size="default" shape="square" />;
      },
      show: true,
    },
    {
      title: 'PRECIO',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => putFormat(record.price),
      sorter: (a, b) => putFormat(a.price) - putFormat(b.price),
      show: true,
    },
    {
      title: 'UNIDADES',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => putFormat(record.quantityAvailable),
      sorter: (a, b) => putFormat(a.quantityAvailable) - putFormat(b.quantityAvailable),
      show: true,
    },
    {
      title: 'ACCIONES',
      dataIndex: 'actions',
      key: 'actions',
      render: renderActions,
      show: true,
    },
  ];

  /**
   *
   * @param {*} record
   * Actualiza la información del estado openDeleteModal y almacena el producto
   * seleccionado en el state global.
   */
  const setFields = (record) => {
    selectedProduct(record);
    setOpenDeleteModal(true);
  };

  // Renderizar componente
  return (
    <div className="users-list">
      <div className="users-list-title">
        <h1>Productos de Casa Torta</h1>
        <Link to={ROUTES.PRODUCT_CREATE}>
          <Button
            type="primary"
            icon={<PlusOutlined title="Nuevo" />}
          >
            Nuevo
          </Button>
        </Link>
      </div>
      <Divider />
      <DeleteProductModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <div className="users-list-content">
        <Table
          loading={loading}
          columns={columns.filter((item) => item.show)}
          dataSource={products}
          rowKey={(r) => r.code}
        />
      </div>
    </div>
  );
}

export default ProductsList;