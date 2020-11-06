// Importar librerías
import React, { useContext, useEffect } from 'react';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Divider, Table, Button } from 'antd';
import { Link } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar otros componentes
import Alert from '../Alert'

// Importar context
import ProductContext from '../../context/products/ProductContext';

const ProductsList = () => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { loading, products, message, getProducts } = productContext;

  // Definir effect para obtener la información de los productos
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    },
  ];

  // Renderizar componente
  return (
    <div className="users-list">
      <div className="users-list-title">
        <h1>Productos del Local</h1>
        <Button type="primary">
          <Link to={ROUTES.PRODUCT_CREATE}>
            <PlusOutlined />
            Nuevo
          </Link>
        </Button>
      </div>
      <Divider />
      <div className="users-list-content">
        {message && <Alert />}
        <Table
          loading={loading}
          columns={columns}
          dataSource={products}
          rowKey={(r) => r.email}
        />
      </div>
    </div>
  );
}

export default ProductsList;