// Importar librerías
import React from 'react';
import { Divider, Table, Button, Space, Row, Col, Form, Select, InputNumber, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductForm = ({ formIntance, style }) => {
  const productsList = [];

  /**
   *
   * @param {*} _
   * @param {*} record
   * Rederiza un componente con las acciones a realizar en el listado de productos.
   */
  const renderActions = (_, record) => {
    return (
      <Space>
        <DeleteOutlined
          title="Eliminar"
          onClick={() => removeProduct(record)}
        />
      </Space>
    );
  };

  // Definir funciones
  const removeProduct = (record) => {
    console.log('Por definir');
  };

  const addProduct = () => {
    console.log('Agregar Productos');
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
      title: 'CANTIDAD',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => record.quantityAvailable,
      sorter: (a, b) => a.quantityAvailable - b.quantityAvailable,
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => record.total,
      sorter: (a, b) => a.total - b.total,
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
    <Form
      form={formIntance}
      name="ProductForm"
      layout="vertical"
      className="form-box"
      style={style}
    >
      <Row gutter={(0, 24)}>
        <Col span={12}>
          <h1>Listado de Productos a Adquirir</h1>
          <Table
            columns={columns}
            dataSource={[]}
            rowKey={(r) => r.code}
          />
        </Col>
        <Col span={12}>
          <h1>Selección de Productos</h1>
          <Form.Item
            label="Nombre del Producto"
            name="product"
          >
            <Select showSearch />
          </Form.Item>
          <Row gutter={(0, 24)}>
            <Col span="7">
              <Form.Item
                label="Cantidad a Adquirir"
                name="quantity"
              >
                <InputNumber
                  min="1"
                  max="3"
                  step="1"
                  precision={0}
                  style={{ width: '100%' }}
                  parser={(value) => value.replace(/([^0-9])/g, '') || 1}
                />
              </Form.Item>
            </Col>
            <Col span="7">
              <Form.Item
                label="Unidades Disponibles"
                name="quantityAvailable"
              >
                <InputNumber style={{ width: '100%' }} disabled={true} />
              </Form.Item>
            </Col>
            <Col span="10">
              <Form.Item
                label="Precio"
                name="price"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" onClick={() => addProduct()}>
            Agregar Producto
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Button type="primary" htmlType="submit" disabled={productsList.length === 0 ? false : true}>
          Siguiente
        </Button>
      </Row>
    </Form>
  );
};

export default ProductForm;