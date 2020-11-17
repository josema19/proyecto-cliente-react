// Importar librerías
import React, { useEffect, useContext } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { useHistory } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

// Importar otros componentes
import Dropzone from '../Dropzone';

// Importar subcomponente Option
const { Option } = Select;

// Obtener información del usuario en local storage
const userStorage = JSON.parse(localStorage.getItem('user'));

const EditProfile = () => {
  // Definir context de usuario autenticado
  const authContext = useContext(AuthContext);
  const { loading, messageA, user, cleanMessage, editProfile, switchLoading } = authContext;

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Definir nueva instancia de useForm
  const [userFormInstance] = Form.useForm();

  // Definir effect para redireccionar
  useEffect(() => {
    if (messageA && !loading) {
      message.success(messageA);
      history.push(ROUTES.PROFILE);
      cleanMessage();
    };
  }, [messageA, loading, history, cleanMessage]);

  // Definir effect para setear los valores del formulario
  useEffect(() => {
    if (user) {
      userFormInstance.setFieldsValue({
        firstName: (userStorage && userStorage.firstName) || user.firstName,
        lastName: (userStorage && userStorage.lastName) || user.lastName,
        phoneType: (userStorage && userStorage.phoneType) || user.phone.split('-')[0],
        phoneNumber: (userStorage && userStorage.phoneNumber) || user.phone.split('-')[1],
        address: (userStorage && userStorage.address) || user.address,
      });
    };
  }, [user, userFormInstance]);

  // Definir funciones
  /**
   *
   * @param {*} values
   * Almacena la información del usuario en la BD.
   */
  const onFinish = async (values) => {
    // Habilitar componente de carga
    switchLoading(true);

    // Llamar a la función encargada de hacer la actualización de la información
    try {
      await editProfile(values);

      // Limpiar formulario
      userFormInstance.resetFields();
    } catch (error) {
      message.error(error.msg)
    };

    // Deshabilitar componente de carga
    switchLoading(false);
  };

  /**
   *
   * @param {*} errorFields
   * Muestra un mensaje de error en caso de que haya habido un problema con la información
   * del formulario
   */
  const onFinishFailed = (errorFields) => {
    console.log(errorFields);
  };

  // Renderizar componente
  return (
    <div className="form-container">
      <h1>Editar Perfil</h1>
      <Form
        form={userFormInstance}
        name="LoginForm"
        layout="vertical"
        className="form-box"
        onFinish={values => onFinish(values)}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={(0, 12)}>
          <Col span="12">
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
          </Col>
          <Col span="12">
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
          </Col>
          <Col span="24">
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
          </Col>
          <Col span="24">
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
          </Col>
          <Col span="24">
            <Form.Item
              label="Imagen"
            >
              <Dropzone formCall="profile" />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item className="last-element">
              <Button type="primary" htmlType="submit" loading={loading}>
                Editar Información
          </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditProfile;