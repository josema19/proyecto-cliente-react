// Importar librerías
import React, { useContext, useEffect } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

// Importar context
import ProductContext from '../../context/products/ProductContext';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar otros componentes
import Dropzone from '../Dropzone';

const CreateProduct = () => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { loading, messageP, createProduct, cleanMessage, switchLoading } = productContext;

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Definir nueva instancia de useForm
  const [ProductFormInstance] = Form.useForm();

  // Definir effect para redireccionar
  useEffect(() => {
    if (messageP && !loading) {
      message.success(messageP);
      history.push(ROUTES.PRODUCTS);
      cleanMessage();
    };
  }, [messageP, loading, history, cleanMessage]);

  /**
   *
   * @param {*} errorFields
   * Muestra un mensaje de error en caso de que haya habido un problema con la información
   * del formulario
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
      await createProduct(values);

      // Limpiar formulario
      ProductFormInstance.resetFields();
    } catch (error) {
      message.error(error.msg);
    };

    // Deshabilitar componente de carga
    switchLoading(false);
  };

  // Renderizar componente
  return (
    <div className="form-internal-container">
      <h1>Crear Nuevo Producto</h1>
      <Form
        form={ProductFormInstance}
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
              label="Código"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Por favor coloque un código'
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              label="Precio"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Por favor coloque un precio'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item
              label="Cantidad Disponible"
              name="quantityAvailable"
              rules={[
                {
                  required: true,
                  message: 'Por favor coloque una cantidad disponible en inventario'
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
              <Input />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item
              label="Imagen"
            >
              <Dropzone formCall="product" />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item className="last-element">
              <Button type="primary" htmlType="submit" loading={loading}>
                Crear Producto
            </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CreateProduct;