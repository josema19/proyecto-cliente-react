// Importar librerías
import React, { useState } from 'react';
import { Divider, Table, Button, Space, Row, Col, Form, Select, InputNumber } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

// Importar utilidades
import putFormat from '../../utils/putFormat'

// Definir subcomponente Option
const { Option } = Select;

const ProductForm = ({ formInstance, dolarValue, style,
  products, userProducts, addProduct, deleteProduct }) => {
  // Definir state
  const [maxQuantity, setMaxQuantiy] = useState(0);
  const [selectedProduct, setSelectProduct] = useState(null);

  // Definir funciones
  /**
   * Construye la información de un producto para ser enviada al state global.
   */
  const buildProduct = () => {
    // Obtener valores del formulario
    const formValues = formInstance.getFieldsValue();

    // Definir información del producto
    const newProduct = {
      code: selectedProduct.code,
      name: selectedProduct.name,
      quantity: formValues.quantity,
      image: selectedProduct.image,
      totalBolivares: selectedProduct.price * formValues.quantity,
      totalDolares: selectedProduct.price * formValues.quantity / dolarValue,
    };

    console.log(newProduct);

    // Agregar producto
    addProduct(newProduct);

    // Limpiar formulario
    formInstance.resetFields();

    // Reinicialziar estados
    setSelectProduct(null);
    setMaxQuantiy(0);
  };

  /**
   *
   * @param {*} changedValue
   * @param {*} allValues
   * Escucha y modifica los valores asociados al valor numérico del formulario.
   */
  const onChangeValue = (changedValue, allValues) => {
    // Obtener campo seleccionado
    const field = Object.keys(changedValue)[0];

    // Setear campos según sea el caso
    if (field === 'product') {
      // Obtener id del product
      const { product } = allValues;

      // Obtener información del producto seleccionado
      const selectedPro = products.find(pro => pro.name === product);

      // Setear valores en el formulario
      formInstance.setFieldsValue({
        quantity: 1,
        quantityAvailable: selectedPro.quantityAvailable,
        price: selectedPro.price,
      });

      // Setear valores del producto seleccionado y habilitar campo de cantidad
      setSelectProduct(selectedPro);
      setMaxQuantiy(selectedPro.quantityAvailable);
    };
  };

  /**
   *
   * @param {*} _
   * @param {*} record
   * Renderiza un componente con las acciones a realizar en el listado de productos.
   */
  const renderActions = (_, record) => {
    return (
      <Space>
        <DeleteOutlined
          title="Eliminar"
          onClick={() => deleteProduct(record.code)}
        />
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
      title: 'CANTIDAD',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => putFormat(record.quantity),
      sorter: (a, b) => putFormat(a.quantity) - putFormat(b.quantity),
    },
    {
      title: 'TOTAL',
      dataIndex: 'totalBolivares',
      key: 'total',
      render: (_, record) => putFormat(record.totalBolivares, 2),
      sorter: (a, b) => putFormat(a.totalBolivares, 2) - putFormat(b.totalBolivares, 2),
    },
    {
      title: 'ELIMINAR',
      dataIndex: 'actions',
      key: 'actions',
      render: renderActions,
    },
  ];

  // Renderizar componente
  return (
    <div className="form-container form-content">
      <Form
        form={formInstance}
        name="ProductForm"
        layout="vertical"
        onValuesChange={onChangeValue}
        className="form-box"
        style={style}
      >
        <Row gutter={(0, 24)}>
          <Col span={24}>
            <h1>Selección de Productos</h1>
            <Form.Item
              label="Nombre del Producto"
              name="product"
            >
              <Select placeholder="Selecciona" showSearch>
                {products && products.map((option) => {
                  const findProduct = userProducts.find(item => item.code === option.code);
                  if (parseInt(option.quantityAvailable) === 0 || findProduct) {
                    return null
                  };
                  return (
                    <Option key={option.id} value={option.name}>
                      {option.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Row gutter={(0, 24)}>
              <Col span="6">
                <Form.Item
                  label="Cantidad a Adquirir"
                  name="quantity"
                >
                  <InputNumber
                    min="1"
                    max={maxQuantity}
                    step="1"
                    precision={0}
                    formatter={(value) => putFormat(value)}
                    style={{ width: '100%' }}
                    parser={(value) => value.replace(/([^0-9])/g, '') || 1}
                    disabled={maxQuantity === 0 ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col span="6">
                <Form.Item
                  label="Unidades Disponibles"
                  name="quantityAvailable"
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    disabled={true}
                    formatter={(value) => putFormat(value)}
                  />
                </Form.Item>
              </Col>
              <Col span="12">
                <Form.Item
                  label="Precio"
                  name="price"
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    disabled={true}
                    formatter={(value) => putFormat(value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              disabled={!selectedProduct ? true : false}
              onClick={() => buildProduct()}
            >
              Agregar Producto
          </Button>
          </Col>
          <Divider />
          <Col span={24}>
            <h1>Productos a Adquirir</h1>
            <Table
              columns={columns}
              dataSource={userProducts}
              rowKey={(r) => r.code}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Button type="primary" htmlType="submit" disabled={userProducts.length === 0 ? true : false}>
            Siguiente
        </Button>
        </Row>
      </Form>
    </div>
  );
};

export default ProductForm;