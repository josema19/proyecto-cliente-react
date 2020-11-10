// Importar librerías
import React from 'react';
import { Divider, Table, Button, Space, Row, Col, Form, Select, InputNumber, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const UserForm = ({ formInstance, style, handlePreviousButtonClick }) => {
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
            rules={[
              {
                required: true,
                message: 'Por favor coloque un nombre'
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label="Apellido"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Por favor coloque un apellido'
              }
            ]}
          >
            <Input />
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
            rules={[
              {
                required: true,
                message: 'Por favor coloque una dirección'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label="Cantidad Total de Artículos"
            name="totalProducts"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label="Total a Pagar"
            name="total"
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
          <Button type="primary" htmlType="submit">
            Generar Pedido
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default UserForm;