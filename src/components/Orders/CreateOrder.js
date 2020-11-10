// Importar librerías
import React, { useState } from 'react';
import { animateScroll } from 'react-scroll';
import { Divider, Form, Steps } from 'antd';

// Importar otros componentes
import ProductForm from './ProductForm';
import PaymentForm from './PaymentForm';
import UserForm from './UserForm';

// Importar subcomponente el componente Steps
const { Step } = Steps;

// Obtener información de la sesión
const { sessionStorage } = window;

const CreateOrder = () => {
  // Definir state local
  const [currentStep, setCurrentStep] = useState(0);

  // Crear instancias de useForm
  const [productFormInstance] = Form.useForm();
  const [paymentFormInstance] = Form.useForm();
  const [userFormInstance] = Form.useForm();

  // Definir funciones
  /**
   * Almacena la información de la orden en la BD.
   */
  const handleFormFinish = async () => {
    if (currentStep < 2) {
      animateScroll.scrollToTop();
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Logrado');
    }
  };

  /**
   * Permite regresar al formulario anterior.
   */
  const handlePreviousButtonClick = () => {
    setCurrentStep(currentStep - 1);
  };

  /**
   *
   * @param {*} formName
   * @param {*} info
   * Escucha por los cambios hechos en los formularios y los almacena en la sessionStorage.
   */
  const handleFormChange = (_, info) => {
    Object.values(info.forms).forEach((f) => {
      Object.entries(f.getFieldsValue()).forEach(([k, v]) => {
        if (v || v === 0) sessionStorage.setItem(k, v);
      });
    });
  };

  // Renderizar componente
  return (
    <Form.Provider onFormFinish={handleFormFinish} onFormChange={handleFormChange}>
      <Steps current={currentStep} >
        <Step title="Selección de Productos" />
        <Step title="Método de Pago" />
        <Step title="Datos del Comprador" />
      </Steps>
      <Divider />
      <ProductForm
        formInstance={productFormInstance}
        style={{ display: currentStep === 0 ? 'block' : 'none' }}
      />
      <PaymentForm
        formInstance={paymentFormInstance}
        style={{ display: currentStep === 1 ? 'block' : 'none' }}
        handlePreviousButtonClick={handlePreviousButtonClick}
      />
      <UserForm
        formInstance={userFormInstance}
        style={{ display: currentStep === 2 ? 'block' : 'none' }}
        handlePreviousButtonClick={handlePreviousButtonClick}
      />
    </Form.Provider>
  );
}

export default CreateOrder;