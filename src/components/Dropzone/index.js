// Importar librerías
import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, message } from 'antd';

// Importar context
import AuthContext from '../../context/auth/AuthContext';
import RecipeContext from '../../context/recipes/RecipeContext';
import ProductContext from '../../context/products/ProductContext';
import OrderContext from '../../context/orders/OrderContext';

const Dropzone = ({ formCall }) => {
  // Definir context de usuario
  const authContext = useContext(AuthContext);
  const { uploadFileA } = authContext;

  // Definir context de recetas
  const recipeContext = useContext(RecipeContext)
  const { uploadFileR } = recipeContext;

  // Definir context de productos
  const productContext = useContext(ProductContext);
  const { uploadFileP } = productContext;

  // Definir context de pedidos
  const orderContext = useContext(OrderContext);
  const { uploadFileO } = orderContext;

  // Definir Funciones
  /**
   * Muestra un mensaje al usuario de que el archivo ha sido rechazado.
   */
  const onDropRejected = () => {
    message.error('No se pudo subir el archivo porque el tamaño máximo permitido es de 1MB');
  };

  /**
   * Sube un archivo al servidor.
   */
  const onDropAccepted = useCallback(async acceptedFiles => {
    // Definir Form-Data
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    // Llamar función del State
    try {
      if (formCall === 'profile') {
        uploadFileA(formData);
      } else if (formCall === 'recipe') {
        uploadFileR(formData);
      } else if (formCall === 'product') {
        uploadFileP(formData);
      } else {
        uploadFileO(formData);
      };
      message.success('Archivo subido correctamente');
    } catch (error) {
      message.error(error.msg);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Extraer contenido de dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxFiles: 1,
    maxSize: 1000000,
    accept: '.jpg, .jpeg, .pdf'
  });

  // Definir pieza del render
  const files = acceptedFiles.map((file, i) => (
    <li
      key={file.lastModified}
      className="dropzone-list bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p>{file.path} {(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
    </li>
  ));

  // Renderizar componente
  return (
    <div className="dropzone-container">
      {acceptedFiles.length === 1 ? (
        <div className="dropzone-body">
          <h4>Archivo</h4>
          <ul>
            {files}
          </ul>
        </div>
      ) : (
          <div {...getRootProps({ className: 'dropzone dropzone-body' })}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Suelta el archivo</p> : (
              <div>
                <p>Selecciona un archivo y arrástralo aquí</p>
                <Button>
                  Selecciona un archivo para subir
                </Button>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
};

export default Dropzone;