// Importar librerías
import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useHistory, } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const Signin = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { authenticated, loading, login, switchLoading } = authContext;

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Definir nueva instancia de useForm
  const [FormInstance] = Form.useForm();

  // Definir effect para redireccionar
  useEffect(() => {
    if (authenticated && !loading) {
      history.push(ROUTES.DASHBOARD);
    }
  }, [authenticated, history, loading])

  /**
   *
   * @param {*} values
   * Procesa los valores entrada provenientes del formulario para ser almacenados
   * en la BD.
   */
  const onFinish = async (values) => {
    // Habilitar componente de carga
    switchLoading(true);

    // Llamar a la función encargada de hacer el registro del usuario
    try {
      await login(values);

      // Limpiar formulario
      FormInstance.resetFields();

    } catch (error) {
      message.error(error.msg);
    }

    // Deshabilitar componente de carga
    switchLoading(false);
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
    <div className="form-container margin-header-footer">
      <h1>Iniciar Sesión</h1>
      <Form
        className="form-box"
        form={FormInstance}
        name="LoginForm"
        layout="vertical"
        onFinish={values => onFinish(values)}
        onFinishFailed={onFinishFailed}
      >
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
        <Form.Item >
          <div className="container-links">
            <Link to={ROUTES.SIGN_UP}>Aún no tienes cuenta? Crea una gratis</Link>
            <Link to={ROUTES.FORGOT_PASSWORD}>Olvidaste tu Contraseña?</Link>
          </div>
        </Form.Item>
        <Form.Item className="last-element">
          <Button type="primary" htmlType="submit" loading={loading}>
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signin;