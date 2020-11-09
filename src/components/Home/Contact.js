// Importar librerías
import React, { useState } from 'react';
import { Button, Form, Input, Row, Col, message } from 'antd';

// Importar subcomponente de TextArea
const { TextArea } = Input;

const Contact = () => {
  // Definir state
  const [loading, setLoading] = useState(false);

  // Definir nueva instancia de Form
  const [contactUsFormInstance] = Form.useForm();

  /**
   *
   * @param {*} values
   * Muestra un mensaje de éxito.
   */
  const onFinish = async (values) => {
    // Habilitar componente de carga
    setLoading(true);

    // Llamar a la función encargada de enviar correo

    // Reiniciar formulario
    contactUsFormInstance.resetFields();

    // Mostrar mensaje de éxito
    message.success('Su mensaje ha sido enviado correctamente');

    // Deshabilitar componente de carga
    setLoading(false);
  };

  /**
   *
   * @param {*} errorFields
   * Muestra un mensaje de error en caso de que haya habido un problema con la información
   * del formulario.
   */
  const onFinishFailed = (errorFields) => {
    console.log(errorFields);
  };

  // Renderizar componente
  return (
    <div className="form-container">
      <h1>Contáctanos</h1>
      <Form
        form={contactUsFormInstance}
        name="ProductForm"
        layout="vertical"
        className="form-box"
        onFinish={values => onFinish(values)}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={(0, 12)}>
          <Col span="12">
            <Form.Item
              label="Nombre"
              name="name"
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Por favor coloque un email válido'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item
              label="Descripción"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Por favor coloque una descripción'
                }
              ]}
            >
              <TextArea />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item className="last-element">
              <Button type="primary" htmlType="submit" loading={loading}>
                Enviar
            </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Contact;