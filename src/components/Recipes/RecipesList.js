import React, { useState, useContext, useEffect } from 'react';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Divider, Table, Button, Space, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar otros componentes
import DeleteRecipeModal from './DeleteRecipeModal';

// Importar context de auth y recipe
import AuthContext from '../../context/auth/AuthContext';
import RecipeContext from '../../context/recipes/RecipeContext';

const RecipesList = () => {
  // Definir context de usuario autenticado
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // Definir context de recetas
  const recipeContext = useContext(RecipeContext);
  const { loading, recipes, messageR, cleanMessage, getRecipes,
    selectedRecipe, switchLoading } = recipeContext;

  // Definir state
  const [openDeleteModal, setOpenDeleteModal] = useState(null);

  // Definir effect para obtener la información de las recetas
  useEffect(() => {
    switchLoading(true);
    getRecipes();
    if (messageR) {
      message.error(messageR);
      cleanMessage();
    };
    switchLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   * @param {*} _
   * @param {*} record
   * Rederiza un componente con las acciones a realizar en el listado de productos.
   */
  const renderActions = (_, record) => {
    return (
      <Space>
        <Link to={`${ROUTES.RECIPES}/${record.id}`}>
          <EyeOutlined title="Ver" onClick={() => selectedRecipe(record)} />
        </Link>
        {user.role === 'admin' && (
          <>
            <Link to={ROUTES.RECIPE_EDIT}>
              <EditOutlined title="Editar" onClick={() => selectedRecipe(record)} />
            </Link>
            <DeleteOutlined
              title="Eliminar"
              onClick={() => setFields(record)}
            />
          </>
        )}
      </Space>
    );
  };

  // Definir columnas de la tabla
  const columns = [
    {
      title: 'NOMBRE',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => record.name,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'INGREDIENTES',
      dataIndex: 'ingredients',
      key: 'ingredients',
      render: (_, record) => {
        return (
          <Tooltip title={record.ingredients}>
            <p className="summary">{record.ingredients}</p>
          </Tooltip>
        );
      },
      sorter: (a, b) => a.ingredients.localeCompare(b.ingredients),
    },
    {
      title: 'PREPARACIÓN',
      dataIndex: 'preparation',
      key: 'preparation',
      render: (_, record) => {
        return (
          <Tooltip title={record.preparation}>
            <p className="summary">{record.preparation}</p>
          </Tooltip>
        );
      },
      sorter: (a, b) => a.ingredients.localeCompare(b.ingredients),
    },
    {
      title: 'IMAGEN',
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      render: (_, record) => {
        return <Avatar src={`${process.env.REACT_APP_BANCKEND_URL}/${record.image}`} size="default" shape="square" />;
      },
    },
    {
      title: 'ACCIONES',
      dataIndex: 'actions',
      key: 'actions',
      render: renderActions,
    },
  ];

  /**
   *
   * @param {*} record
   * Actualiza la información del estado openDeleteModal y almacena el producto
   * seleccionado en el state global.
   */
  const setFields = (record) => {
    selectedRecipe(record);
    setOpenDeleteModal(true);
  };

  // Renderizar componente
  return (
    <div className="users-list">
      <div className="users-list-title">
        <h1>Recetas de Casa Torta</h1>
        {user.role === 'admin' && (
          <Link to={ROUTES.RECIPE_CREATE}>
            <Button
              type="primary"
              icon={<PlusOutlined title="Nuevo" />}
            >
              Nuevo
            </Button>
          </Link>
        )}
      </div>
      <Divider />
      <DeleteRecipeModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <div className="users-list-content">
        <Table
          loading={loading}
          columns={columns}
          dataSource={recipes}
          rowKey={(r) => r.id}
        />
      </div>
    </div>
  );
}

export default RecipesList;