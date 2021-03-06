// Importar librerías
import React, { useContext } from 'react';
import { Row, Col, Descriptions, Button, Avatar } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

// Obtener información del usuario en local storage
const userStorage = JSON.parse(localStorage.getItem('user'));

const ViewProfile = () => {
  // Definir context de usuario autenticado
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // Renderizar componente
  return (
    <>
      <Row>
        <Col span={12}>
          <div className="container-image-profile">
            <h1>Imagen de Perfil</h1>
            {userStorage && userStorage.image ? (
              <Avatar src={`${process.env.REACT_APP_BANCKEND_URL}/${userStorage.image}`} size={256} />
            ) : user.image ? (
              <Avatar src={`${process.env.REACT_APP_BANCKEND_URL}/${user.image}`} size={256} />
            ) : (
                  <p>No tiene Imagen de Perfil</p>
                )}
          </div>
        </Col>
        <Col span={12}>
          <Descriptions
            layout="vertical"
            className="container-info-profile"
            column={2}
            colon={false}
          >
            <Descriptions.Item label="Nombre">{(userStorage && userStorage.firstName) || user.firstName}</Descriptions.Item>
            <Descriptions.Item label="Apellido">{(userStorage && userStorage.lastName) || user.lastName}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Cédula">{user.card}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">
              {(userStorage && (userStorage.phoneType + '-' + userStorage.phoneNumber)) || user.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Dirección">
              {(userStorage && userStorage.address) || user.address}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Link to={ROUTES.PROFILE_EDIT}>

            <Button
              type="primary"
              icon={<EditOutlined title="Editar" />}
            >
              Editar Información
          </Button>
          </Link>

        </Col>
      </Row>
    </>
  );
};

export default ViewProfile;;