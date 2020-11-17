// Importar librerías
import React, { useContext, useEffect } from 'react';
import { message, Select, Form, Button, Modal } from 'antd';

// Importar context
import AuthContext from '../../context/auth/AuthContext';
import OrderContext from '../../context/orders/OrderContext';

// Definir información de los tipos de estado para el admin
const orderStateAdmin = [
  { value: 'COMPLETADO', label: 'Completado' },
  { value: 'CANCELADO', label: 'Cancelado' },
];

const orderStateUser = [
  { value: 'CANCELADO', label: 'Cancelado' },
]

// Importar subcomponente el componente Steps
const { Option } = Select;

const EditOrder = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { user } = authContext;

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
      className="modal-container"
      footer={false}
      confirmLoading={loading}
      visible={showModal}
    >
      <div className="form-container form-edit-order">
        <h2>Editar Estado Pedido</h2>
        <Form
          form={orderFormInstance}
          className="form-box"
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
              {user.role === 'user' ? (
                orderStateUser.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))
              ) : (
                  orderStateAdmin.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))
                )}
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