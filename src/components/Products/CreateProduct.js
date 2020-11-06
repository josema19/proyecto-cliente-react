import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

// Importar context
import ProductContext from '../../context/products/ProductContext';

// Importar configuraciones
import axiosClient from '../../config/axios';

// Importar otros componentes
import Alert from '../Alert';
import Dropzone from '../Dropzone';

const CreateProduct = () => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { messageP } = productContext;

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Definir state local
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Definir nueva instancia de useForm
  const [ProductFormInstance] = Form.useForm();

  // Definir effect para redireccionar
  useEffect(() => {
    if (redirect) {
      history.push('/products');
    };
  }, [redirect, history])


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
    setLoading(true);
    console.log(values);

    // // Llamar a la función encargada de hacer el registro del usuario
    // try {
    //   await registerUser(values);

    //   // Limpiar formulario
    //   FormInstance.resetFields();

    //   setRedirect(true);

    // } catch (error) {
    //   console.log(error);
    // }

    // Deshabilitar componente de carga
    setLoading(false);
  };

  // Renderizar componente
  return (
    <div className="form-internal-container">
      <h1>Crear Nuevo Producto</h1>
      {messageP && <Alert />}
      <Form
        form={ProductFormInstance}
        name="LoginForm"
        layout="vertical"
        className="form-box"
        onFinish={values => onFinish(values)}
        onFinishFailed={onFinishFailed}
      >
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
        <Form.Item
          label="Imagen"
        >
          <Dropzone />
        </Form.Item>
        <Form.Item className="last-element">
          <Button type="primary" htmlType="submit" loading={loading}>
            Crear Producto
            </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateProduct;