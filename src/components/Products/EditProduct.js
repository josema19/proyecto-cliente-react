// Importar librerías
import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Input, Button, message, InputNumber } from 'antd';
import { useHistory } from 'react-router-dom';

// Importar utilidades
import putFormat from '../../utils/putFormat'

// Importar context
import ProductContext from '../../context/products/ProductContext';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar otros componentes
import Dropzone from '../Dropzone';

// Importar subcomponente de TextArea
const { TextArea } = Input;

const EditProduct = () => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { loading, messageP, product, editProduct, cleanMessage, switchLoading } = productContext;

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Definir state
  const [priceFocus, setPriceFocus] = useState(false);

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

  // Definir effect para setear los valores del formulario
  useEffect(() => {
    if (product) {
      ProductFormInstance.setFieldsValue({
        name: product.name,
        code: product.code,
        price: product.price,
        quantityAvailable: product.quantityAvailable,
        description: product.description,
      });
    };
  }, [product, ProductFormInstance]);

  // Definir effect para setear valor de loading
  useEffect(() => {
    switchLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // Llamar a la función encargada de hacer el registro del usuario
    try {
      await editProduct(values);

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
    <div className="form-container">
      <h1>Editar Producto</h1>
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
              <Input disabled={true} />
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
              <InputNumber
                min="1"
                precision={2}
                type={priceFocus ? 'number' : 'string'}
                formatter={(value) =>
                  priceFocus ? value : value ? putFormat(value, 2) : 0
                }
                parser={(value) =>
                  value.replace(',', '.').replace(/^(0.)|([^0-9.])/, '')
                }
                onFocus={() => setPriceFocus(true)}
                onBlur={() => setPriceFocus(false)}
                onClick={(e) => e.target.select()}
              />
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
              <InputNumber
                min="1"
                step="100"
                precision={0}
                formatter={(value) => putFormat(value)}
                style={{ width: '100%' }}
                parser={(value) => value.replace(/([^0-9])/g, '') || 1}
              />
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
            <Form.Item
              label="Imagen"
            >
              <Dropzone formCall="product" />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item className="last-element">
              <Button type="primary" htmlType="submit" loading={loading}>
                Editar Producto
            </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditProduct;