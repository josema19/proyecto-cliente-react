// Importar librerías
import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, message } from 'antd';

// Importar context
import ProductContext from '../../context/products/ProductContext';

const Dropzone = () => {
  // Definir context
  const productContext = useContext(ProductContext);
  const { uploadFile } = productContext;

  // Definir Funciones
  const onDropRejected = () => {
    message.error('No se pudo subir el archivo porque el tamaño máximo permitido es de 1MB. Obtén una cuenta para subir archivos más grandes');
  };

  const onDropAccepted = useCallback(async acceptedFiles => {
    // Definir Form-Data
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    // Llamar función del State
    uploadFile(formData, acceptedFiles[0]['path']);
  }, []);

  // Extraer contenido de dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxFiles: 1,
    maxSize: 1000000,
  });

  // Definir pieza del render
  const files = acceptedFiles.map(file => (
    <li
      key={file.lastModified}
      className="dropzone-list bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p>{file.path} {(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
    </li>
  ));

  console.log(acceptedFiles);

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
                  Selecciona archivos para subir
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