// Importar librerías
import React, { useContext } from 'react';
import { Row, Col, Descriptions, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar context
import AuthContext from '../../context/auth/AuthContext';

const ViewProfile = () => {
  // Definir context de usuario autenticado
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // Renderizar componente
  return (
    <Row>
      <Col span={12} style={{ border: '1px solid yellow' }}>
        <div className="">
          <h1>Imagen de Perfil</h1>
          {user.image ? null : (
            <p>No tiene Imagen de Perfil</p>
          )}
        </div>
      </Col>
      <Col span={12}>
        <Descriptions
          layout="vertical"
          className=""
          column={2}
          colon={false}
        >
          <Descriptions.Item label="Nombre">{user.firstName}</Descriptions.Item>
          <Descriptions.Item label="Apellido">{user.lastName}</Descriptions.Item>
          <Descriptions.Item label="Cédula">{user.card}</Descriptions.Item>
          <Descriptions.Item label="Teléfono">
            {user.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Dirección">
            {user.address}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          icon={<EditOutlined title="Editar" />}
        >
          <Link to={ROUTES.PROFILE_EDIT}>
            Editar Información
          </Link>
        </Button>
      </Col>
    </Row>
  );
};

export default ViewProfile;;