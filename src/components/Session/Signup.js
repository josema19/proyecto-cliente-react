// Importar librerías
import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Select, Upload } from 'antd';
import { useHistory } from 'react-router-dom';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

// Importar otros componentes
import Alert from '../Alert'

// Importar subcomponente Option
const { Option } = Select;

const Signup = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { message, registerUser } = authContext;

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Definir state local
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Definir nueva instancia de useForm
  const [FormInstance] = Form.useForm();

  // Definir effect para redireccionar
  useEffect(() => {
    if (redirect) {
      history.push('/signin');
    };
  }, [redirect, history])

  // Definir funciones
  const onFinish = async (values) => {
    // Habilitar componente de carga
    setLoading(true);

    // Llamar a la función encargada de hacer el registro del usuario
    try {
      await registerUser(values);

      // Limpiar formulario
      FormInstance.resetFields();

      setRedirect(true);

    } catch (error) {
      console.log(error);
    }

    // Deshabilitar componente de carga
    setLoading(false);
  };

  /**
   *
   * @param {*} errorFields
   * Muestra un mensaje de error en caso de que haya habido un problema con la información
   * del formulario
   */
  const onFinishFailed = (errorFields) => {
    console.log(errorFields);
  }

  // Renderizar componente
  return (
    <div className="form-container">
      <h1>Registrarse</h1>
      {message && <Alert />}
      <Form
        form={FormInstance}
        name="LoginForm"
        layout="vertical"
        className="form-box"
        initialValues={{
          cardType: 'V',
          phoneType: '212',
        }
        }
        onFinish={values => onFinish(values)}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nombre"
          name="firstName"
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
          label="Apellido"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Por favor coloque un apellido'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Cédula">
          <Form.Item
            name="cardType"
            style={{ display: 'inline-block', width: 'calc(15%)' }}
          >
            <Select>
              <Option value="V">V</Option>
              <Option value="E">E</Option>
              <Option value="G">G</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="cardId"
            style={{ display: 'inline-block', width: 'calc(85%)' }}
            rules={[
              {
                required: true,
                message: 'Por favor coloque una cédula'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Item>
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
        <Form.Item
          label="Dirección"
          name="address"
          rules={[
            {
              required: true,
              message: 'Por favor coloque una dirección'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Teléfono">
          <Form.Item
            name="phoneType"
            style={{ display: 'inline-block', width: 'calc(15%)' }}
          >
            <Select>
              <Option value="212">212</Option>
              <Option value="412">412</Option>
              <Option value="414">414</Option>
              <Option value="424">424</Option>
              <Option value="416">416</Option>
              <Option value="426">426</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            style={{ display: 'inline-block', width: 'calc(85%)' }}
            rules={[
              {
                required: true,
                message: 'Por favor coloque un número de teléfono'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor coloque un password válido'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="last-element">
          <Button type="primary" htmlType="submit" loading={loading}>
            Crear Cuenta
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;