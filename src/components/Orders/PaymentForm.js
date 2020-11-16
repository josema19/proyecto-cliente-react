// Importar librerías
import React, { useState } from 'react';
import { Divider, Button, Row, Col, Form, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

// Importar otros componentes
import Dropzone from '../Dropzone';

// Definir información de los tipos de pago
const paymentType = [
  { value: 'Efectivo', label: 'Efectivo' },
  { value: 'Transferencia', label: 'Transferencia' },
];

// Definir información de la moneda
const coinType = [
  { value: 'Bolivar', label: 'Bolívar' },
  { value: 'Dolar', label: 'Dólar' }
];

// Definir subcomponente Option
const { Option } = Select;

const PaymentForm = ({ formInstance, style, voucher, handlePreviousButtonClick }) => {
  // Definir State
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');

  const TransferInformation = () => (
    <div className="container-transfer-info">
      {selectedCoin === 'Bolivar' ? (
        <>
          <div className="container-bank-header">
            <h2>Datos para Transferencias Bancarias</h2>
            <p>Inversiones Casa Torta Candelaria.C.A</p>
            <p>Correo: tortacandelaria@gmail.com</p>
            <p>Rif: J-40748734-5</p>
          </div>
          <Divider />

          <Row>
            <Col span={12}>
              <p>Banco Fondo Común</p>
              <p>Cuenta: <span>0151-0049-4510-0049-5814</span></p>
              <p>Banco Activo</p>
              <p>Cuenta: <span>0171-0005-0760-0205-7351</span></p>
              <p>Banco Banesco</p>
              <p>Cuenta: <span>0134-0440-2644-0103-9059</span></p>
            </Col>
            <Col span={12}>
              <p>Banco Fondo Común(Pago Móvil)</p>
              <p>Código: <span>0151</span></p>
              <p>Celular: <span>0424-200-91-19 / 0412-295-71-43</span></p>
            </Col>
          </Row>
        </>
      ) : (
          <div className="container-zelle">
            <h2>Datos para Transferencias vía ZELLE</h2>
            <Divider />
            <p>Correo: <span>gabrielgoncalves33@gmail.com</span></p>
            <p>Nombre: <span>Juan Goncalves</span></p>
          </div>
        )}
    </div>
  );







  // Renderizar componente
  return (
    <div className="form-container form-content">
      <Form
        form={formInstance}
        name="PaymentForm"
        layout="vertical"
        className="form-box"
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
              <Select onSelect={(key) => setSelectedCoin(key)}>
                {coinType.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span="24">
            {selectedPayment === 'Transferencia' && selectedCoin !== '' && <TransferInformation />}
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
              disabled={(selectedPayment === 'Transferencia') && !voucher ? true : false}
            >
              Siguiente
            <ArrowRightOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PaymentForm;