// Importar librerías
import React, { useContext, useEffect } from 'react';
import { message, Select, Form, Button, Modal } from 'antd';

// Importar context
import OrderContext from '../../context/orders/OrderContext';

// Definir información de los tipos de pago
const orderState = [
  { value: 'PENDIENTE', label: 'Pendiente' },
  { value: 'COMPLETADO', label: 'Completado' },
  { value: 'CANCELADO', label: 'Cancelado' },
];

// Importar subcomponente el componente Steps
const { Option } = Select;

const EditOrder = () => {
  // Definir context
  const orderContext = useContext(OrderContext);
  const { loading, messageO, showModal, openModal, switchLoading,
    editOrder, cleanMessage } = orderContext;

  // Crear instancias de useForm
  const [orderFormInstance] = Form.useForm();

  // Definir effect para mostrar mensaje
  useEffect(() => {
    if (messageO) {
      message.success(messageO);
      cleanMessage();
    };
  }, [messageO, cleanMessage]);

  // Definir funciones
  /**
   *
   * @param {*} errorFields
   * Muestra un mensaje de error en caso de que haya habido un problema con la información
   * del formulario.
   */
  const onFinishFailed = (errorFields) => {
    console.log(errorFields);
  }

  // Definir funciones
  const onFinish = async (values) => {
    // Habilitar componente de carga
    switchLoading(true);

    // Llamar a la función encargada de crear el producto
    try {
      await editOrder(values);

      // Limpiar formulario
      orderFormInstance.resetFields();

      // Cerrar Modal
      openModal(null, false);
    } catch (error) {
      message.error(error.msg);
    };

    // Deshabilitar componente de carga
    switchLoading(false);
  };

  // Renderizar componente
  return (
    <Modal
      onCancel={() => {
        orderFormInstance.resetFields();
        openModal(null, false);
      }}
      footer={<div id="order-modal-footer"></div>}
      confirmLoading={loading}
      visible={showModal}
    >
      <div className="order-modal-body">
        <h3>Editar Estado Pedido</h3>
        <Form
          form={orderFormInstance}
          className="order-modal-form"
          layout="vertical"
          name="order_form"
          onFinish={(values) => onFinish(values)}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Estado del Pedido"
            name="state"
            rules={[{ required: true, message: 'Por favor seleccione un estado para el pedido' }]}
          >
            <Select placeholder="Selecciona" showSearch>
              {orderState.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Actualizar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default EditOrder;