// Importar librerías
import React, { useEffect, useContext } from 'react';
import { Button, Modal, message } from 'antd';

// Importar context
import RecipeContext from '../../context/recipes/RecipeContext';

const DeleteRecipeModal = ({ openModal, setOpenModal }) => {
  // Definir context
  const recipeContext = useContext(RecipeContext);
  const { loading, messageR, cleanMessage, deleteRecipe, switchLoading } = recipeContext;

  // Definir effect para redireccionar
  useEffect(() => {
    if (messageR && !loading) {
      message.success(messageR);
      cleanMessage();
    };
  }, [messageR, loading, cleanMessage])

  // Definir funciones
  const deleteConfirmedRecipe = async () => {
    // Habilitar componente de carga
    switchLoading(true);

    // Llamar a la función encargada de eliminar la receta
    try {
      await deleteRecipe();

      // Cerrar modla de eliminación
      setOpenModal(false);

    } catch (error) {
      message.error(error.msg);
    };

    // Deshabilitar componente de carga
    switchLoading(false);
  };

  // Renderizar componente
  return (
    <Modal
      onCancel={() => {
        setOpenModal(null);
      }}
      confirmLoading={loading}
      footer={
        <div className="">
          <Button onClick={() => deleteConfirmedRecipe()}>Eliminar</Button>
        </div>
      }
      visible={openModal}
    >
      <div className="">
        <h3>Eliminar Información de la Receta</h3>
        <p>
          Se eliminará la Receta seleccionada y no podrá recuperarse. Seguro que desea realizar esta acción?
        </p>
      </div>
    </Modal>
  );
}

export default DeleteRecipeModal;