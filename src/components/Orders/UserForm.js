// Importar librerías
import React, { useEffect } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const UserForm = ({ formInstance, loading, style, handlePreviousButtonClick, user, userProducts }) => {
  // Setear valores en formulario
  useEffect(() => {
    // Total a pagar en Bolívares
    let totalBolivares = 0;
    let totalDolares = 0;
    userProducts.forEach(item => {
      totalBolivares += item.totalBolivares;
      totalDolares += item.totalDolares
    });

    // Setear valores
    formInstance.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phone,
      card: user.card,
      address: user.address,
      totalProducts: userProducts.length,
      totalBolivares: totalBolivares,
      totalDolares: Math.round(totalDolares),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProducts]);

  // Renderizar componente
  return (
    <Form
      form={formInstance}
      name="UserForm"
      layout="vertical"
      className=""
      style={style}
    >
      <Row gutter={(0, 24)}>
        <Col span="12">
          <Form.Item
            label="Nombre"
            name="firstName"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label="Apellido"
            name="lastName"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label="Teléfono"
            name="phoneNumber"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label="Cédula"
            name="card"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span="24">
          <Form.Item
            label="Dirección"
            name="address"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item
            label="Número de Productos"
            name="totalProducts"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span="10">
          <Form.Item
            label="Total en Bolívares"
            name="totalBolivares"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span="10">
          <Form.Item
            label="Total en Dólares"
            name="totalDolares"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col>
          <Button
            type="primary"
            onClick={handlePreviousButtonClick}
          >
            <ArrowLeftOutlined />
              Anterior
            </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" loading={loading}>
            Generar Pedido
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default UserForm;