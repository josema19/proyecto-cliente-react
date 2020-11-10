// Importar librerías
import React, { useEffect, useContext } from 'react';
import { Divider, Table, message } from 'antd';

// Importar context
import UserContext from '../../context/users/UserContext';

// Definir objeto con los roles
const showRoles = {
  'admin': 'Administrador',
  'user': 'Usuario',
};

const UsersList = () => {
  // Definir context
  const userContext = useContext(UserContext);
  const { loading, users, messageU, cleanMessage, getUsers } = userContext;

  // Definir effect para obtener la información de los usuarios
  useEffect(() => {
    getUsers();
    if (messageU) {
      message.error(messageU);
      cleanMessage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Definir columnas de la tabla
  const columns = [
    {
      title: 'NOMBRE',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_, record) => record.firstName,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'APELLIDO',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (_, record) => record.lastName,
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => record.email,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'CÉDULA',
      dataIndex: 'card',
      key: 'card',
      render: (_, record) => record.cardType + '-' + record.cardId,
      sorter: (a, b) => (a.cardType + '-' + a.cardId).localeCompare(b.cardType + '-' + b.cardId),
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => showRoles[record.role],
      sorter: (a, b) => (showRoles[a.role]).localeCompare(showRoles[b.role]),
    },
  ];

  // Renderizar componente
  return (
    <div className="users-list">
      <div className="users-list-title">
        <h1>Usuarios de la Plataforma</h1>
      </div>
      <Divider />
      <div className="users-list-content">
        <Table
          loading={loading}
          columns={columns}
          dataSource={users}
          rowKey={(r) => r.email}
        />
      </div>
    </div>
  );
}

export default UsersList;