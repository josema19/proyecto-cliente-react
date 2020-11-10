// Importar librerías
import React from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider, Table, Button, Space, Row, Col, Form, Select, InputNumber, Input } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

// Importar otros componentes
import Dropzone from '../Dropzone';

const PaymentForm = ({ formInstance, style, handlePreviousButtonClick }) => {
  // Renderizar componente
  return (
    <Form
      form={formInstance}
      name="PaymentForm"
      layout="vertical"
      className=""
      style={style}
    >
      <Row gutter={(0, 24)}>
        <Col span="12">
          <Form.Item
            label="Tipo de Pago"
            name="paymentType"
          >
            <Select showSearch />
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label="Tipo de Moneda"
            name="coinType"
          >
            <Select showSearch />
          </Form.Item>
        </Col>
        <Col span="24">
          <Form.Item
            label="Comprobante de Pago (Si Aplica)"
          >
            <Dropzone formCall="product" />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
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
            Siguiente
            <ArrowRightOutlined />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PaymentForm;