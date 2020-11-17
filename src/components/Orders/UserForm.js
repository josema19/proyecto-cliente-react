// Importar librerías
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input, Checkbox, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

// Importar utilidades
import putFormat from '../../utils/putFormat'

// Definir opciones del checkbox
const serviceOptions = [
  { value: 'Tienda', label: 'Retirar en Tienda' },
  { value: 'Delivery', label: 'Solicitar Delivery' },
];

// Obtener información del usuario en local storage
const userStorage = JSON.parse(localStorage.getItem('user'));

const UserForm = ({ formInstance, loading, style, handlePreviousButtonClick,
  user, userProducts }) => {
  // Definir state
  const [options, setOptions] = useState([]);

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
      firstName: userStorage.firstName || user.firstName,
      lastName: userStorage.lastName || user.lastName,
      phoneNumber: (userStorage.phoneType + '-' + userStorage.phoneNumber) || user.phone,
      card: user.card,
      address: userStorage.address || user.address,
      totalProducts: userProducts.length,
      totalBolivares: totalBolivares,
      totalDolares: totalDolares,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProducts]);

  // Definir funciones
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
    if (field === 'service') {
      // Obtener id del product
      const { service } = allValues;

      // Setear valor
      setOptions(service);
    };
  };

  // Renderizar componente
  return (
    <div className="form-container form-content">
      <Form
        form={formInstance}
        name="UserForm"
        layout="vertical"
        onValuesChange={onChangeValue}
        className="form-box"
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
          <Col span="6">
            <Form.Item
              label="Número Productos"
              name="totalProducts"
            >
              <InputNumber
                formatter={(value) => putFormat(value)}
                style={{ width: '100%' }}
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span="9">
            <Form.Item
              label="Total Bolívares"
              name="totalBolivares"
            >
              <InputNumber
                formatter={(value) => putFormat(value, 2)}
                style={{ width: '100%' }}
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span="9">
            <Form.Item
              label="Total Dólares"
              name="totalDolares"
            >
              <InputNumber
                formatter={(value) => putFormat(value, 2)}
                style={{ width: '100%' }}
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="* Envío de Pedido (Es necesario seleccionar una opción)"
              name="service"
              initialValue={options}
            >
              <Checkbox.Group options={serviceOptions} />
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
            <Button type="primary" htmlType="submit" loading={loading} disabled={options.length !== 1 ? true : false}>
              Generar Pedido
          </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default UserForm;