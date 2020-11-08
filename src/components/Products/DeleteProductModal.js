// Importar librerías
import React, { useEffect, useContext } from 'react';
import { Button, Modal, message } from 'antd';

// Importar context
import ProductContext from '../../context/products/ProductContext';

const DeleteProductModal = ({ openModal, setOpenModal }) => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { loading, messageP, cleanMessage, deleteProduct, switchLoading } = productContext;

  // Definir effect para redireccionar
  useEffect(() => {
    if (messageP && !loading) {
      message.success(messageP);
      cleanMessage();
    };
  }, [messageP, loading, cleanMessage])

  // Definir funciones
  const deleteConfirmedProduct = async () => {
    // Habilitar componente de carga
    switchLoading(true);

    // Llamar a la función encargada de hacer el registro del usuario
    try {
      await deleteProduct();

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
          <Button onClick={() => deleteConfirmedProduct()}>Eliminar</Button>
        </div>
      }
      visible={openModal}
    >
      <div className="">
        <h3>Eliminar Información del Producto</h3>
        <p>
          Se eliminará el Producto seleccionado y no podrá recuperarse. Seguro que desea realizar esta acción?
        </p>
      </div>
    </Modal>
  );
}

export default DeleteProductModal;