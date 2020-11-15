// Importar librerías
import React, { useState } from 'react';
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

const PaymentForm = ({ formInstance, style, voucher, handlePreviousButtonClick }) => {
  // Definir State
  const [selectedPayment, setSelectedPayment] = useState('');

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
            <Select onSelect={(key) => setSelectedPayment(key)}>
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
            name="coinType"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione el tipo de moneda'
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
            label="Comprobante de Pago (Aplica sólo para transferencias)"
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
          <Button
            type="primary"
            htmlType="submit"
            disabled={(selectedPayment === 'transferencia') && !voucher ? true : false}
          >
            Siguiente
            <ArrowRightOutlined />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PaymentForm;