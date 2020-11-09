// Importar librerías
import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const ForgotPassword = () => {
  // Definir context
  const authContext = useContext(AuthContext);
  const { loading, messageA, cleanMessage, forgotPassword, switchLoading } = authContext;

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Definir nueva instancia de useForm
  const [FormInstance] = Form.useForm();

  // Definir effect para redireccionar
  useEffect(() => {
    if (messageA && !loading) {
      message.success(messageA);
      history.push(ROUTES.SIGN_IN);
      cleanMessage();
    }
  }, [messageA, history, loading, cleanMessage])

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
      await forgotPassword(values);

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
      <h1>Recuperar Contraseña</h1>
      <Form
        className="form-box"
        form={FormInstance}
        name="ForgotPasswordForm"
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
              message: 'Por favor coloque su email'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nuevo Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor coloque su nuevo password'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="last-element">
          <Button type="primary" htmlType="submit" loading={loading}>
            Recuperar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;