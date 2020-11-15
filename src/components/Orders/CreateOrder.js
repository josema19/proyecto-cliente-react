// Importar librerías
import React, { useContext, useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { Divider, Form, message, Steps } from 'antd';
import { useHistory } from 'react-router-dom';

// Importar otros componentes
import ProductForm from './ProductForm';
import PaymentForm from './PaymentForm';
import UserForm from './UserForm';

// Importar context
import OrderContext from '../../context/orders/OrderContext';
import ProductContext from '../../context/products/ProductContext';
import AuthContext from '../../context/auth/AuthContext';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar subcomponente el componente Steps
const { Step } = Steps;

const CreateOrder = () => {
  // Definir context
  const orderContext = useContext(OrderContext);
  const { dolarValue, messageO, loading, voucher, userProducts, addProduct, deleteProduct,
    getDolarValue, cleanMessage, createOrder, switchLoading } = orderContext;

  const productContext = useContext(ProductContext);
  const { products, getProducts } = productContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // Definir state local
  const [currentStep, setCurrentStep] = useState(0);

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Crear instancias de useForm
  const [productFormInstance] = Form.useForm();
  const [paymentFormInstance] = Form.useForm();
  const [userFormInstance] = Form.useForm();

  // Definir effect para obtener productos de la BD y el valor del dolar
  useEffect(() => {
    getDolarValue();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Definir effect para redireccionar
  useEffect(() => {
    if (messageO && !loading) {
      message.success(messageO);
      history.push(ROUTES.ORDERS);
      cleanMessage();
    };
  }, [messageO, loading, history, cleanMessage]);

  // Definir funciones
  /**
   * Almacena la información de la orden en la BD.
   */
  const handleFormFinish = async () => {
    if (currentStep < 2) {
      // Crear animación y setear el valor del step
      animateScroll.scrollToTop();
      setCurrentStep(currentStep + 1);
    } else {
      // Habilitar spinner de carga
      switchLoading(true);

      try {
        // Obtener información de los formularios
        const { paymentType, coinType } = paymentFormInstance.getFieldValue();
        const { totalBolivares, totalDolares, totalProducts } = userFormInstance.getFieldsValue();

        // Construir objeto
        const order = {
          coinType,
          products: userProducts,
          paymentType,
          totalProducts,
          totalBolivares,
          totalDolares,
          state: 'PENDIENTE',
          UserId: user.id,
        };

        // Llamar a la función
        await createOrder(order);
      } catch (error) {
        message(error.msg);
      };

      switchLoading(false);
    }
  };

  /**
   * Permite regresar al formulario anterior.
   */
  const handlePreviousButtonClick = () => {
    setCurrentStep(currentStep - 1);
  };

  // Renderizar componente
  return (
    <Form.Provider onFormFinish={handleFormFinish} >
      <Steps current={currentStep} >
        <Step title="Selección de Productos" />
        <Step title="Método de Pago" />
        <Step title="Datos del Comprador" />
      </Steps>
      <Divider />
      <ProductForm
        formInstance={productFormInstance}
        style={{ display: currentStep === 0 ? 'block' : 'none' }}
        userProducts={userProducts}
        products={products}
        dolarValue={dolarValue}
        addProduct={addProduct}
        deleteProduct={deleteProduct}
      />
      <PaymentForm
        formInstance={paymentFormInstance}
        style={{ display: currentStep === 1 ? 'block' : 'none' }}
        handlePreviousButtonClick={handlePreviousButtonClick}
        voucher={voucher}
      />
      <UserForm
        formInstance={userFormInstance}
        style={{ display: currentStep === 2 ? 'block' : 'none' }}
        handlePreviousButtonClick={handlePreviousButtonClick}
        user={user}
        userProducts={userProducts}
        loading={loading}
      />
    </Form.Provider>
  );
}

export default CreateOrder;