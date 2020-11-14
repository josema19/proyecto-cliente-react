// Importar librerías
import React from 'react';
import { Divider, Button, Row, Col, Form, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

// Importar otros componentes
import Dropzone from '../Dropzone';

// Definir información de los tipos de pago
const paymentType = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'transferencia', label: 'Transferencia' },
];

// Definir información de la moneda
const coinType = [
  { value: 'bolivar', label: 'Bolívar' },
  { value: 'dolar', label: 'Dólar' }
];

// Definir subcomponente Option
const { Option } = Select;

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
            rules={[
              {
                required: true,
                message: 'Por favor seleccione el tipo de pago'
              }
            ]}
          >
            <Select>
              {paymentType.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="12">
          <Form.Item
            label="Tipo de Moneda"
            name="typeCoin"
            rules={[
              {
                required: true,
                message: 'Seleccione el tipo de moneda'
              }
            ]}
          >
            <Select>
              {coinType.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="24">
          <Form.Item
            label="Comprobante de Pago (Si Aplica)"
          >
            <Dropzone />
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