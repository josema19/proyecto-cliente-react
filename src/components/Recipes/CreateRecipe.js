// Importar librerías
import React, { useContext, useEffect } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

// Importar context
import RecipeContext from '../../context/recipes/RecipeContext';

// Importar rutas
import * as ROUTES from '../../constants/routes';

// Importar otros componentes
import Dropzone from '../Dropzone';

// Importar subcomponente de TextArea
const { TextArea } = Input;

const CreateRecipe = () => {
  // Definir context
  const recipeContext = useContext(RecipeContext);
  const { image, loading, messageR, createRecipe, cleanMessage, switchLoading } = recipeContext;

  // Definir nueva instancia de useHistory
  const history = useHistory();

  // Definir nueva instancia de useForm
  const [RecipeFormInstance] = Form.useForm();

  // Definir effect para redireccionar
  useEffect(() => {
    if (messageR && !loading) {
      message.success(messageR);
      history.push(ROUTES.RECIPES);
      cleanMessage();
    };
  }, [messageR, loading, history, cleanMessage]);

  // Definir effect para setear valor de loading
  useEffect(() => {
    switchLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   * @param {*} errorFields
   * Muestra un mensaje de error en caso de que haya habido un problema con la información
   * del formulario.
   */
  const onFinishFailed = (errorFields) => {
    console.log(errorFields);
  }

  // Definir funciones
  const onFinish = async (values) => {
    // Habilitar componente de carga
    switchLoading(true);

    // Llamar a la función encargada de crear la receta
    try {
      await createRecipe(values);

      // Limpiar formulario
      RecipeFormInstance.resetFields();
    } catch (error) {
      message.error(error.msg);
    };

    // Deshabilitar componente de carga
    switchLoading(false);
  };

  // Renderizar componente
  return (
    <div className="form-container">
      <h1>Crear Nueva Receta</h1>
      <Form
        form={RecipeFormInstance}
        name="RecipeForm"
        layout="vertical"
        className="form-box"
        onFinish={values => onFinish(values)}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={(0, 12)}>
          <Col span="24">
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Por favor coloque un nombre'
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item
              label="Ingredientes"
              name="ingredients"
              rules={[
                {
                  required: true,
                  message: 'Por favor coloque la información de los ingradientes'
                },
              ]}
            >
              <TextArea />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item
              label="Preparación"
              name="preparation"
              rules={[
                {
                  required: true,
                  message: 'Por favor coloque una descripción de la preparación'
                }
              ]}
            >
              <TextArea />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item
              label="Imagen (La receta debe tener una imagen asociada)"
            >
              <Dropzone formCall="recipe" />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item className="last-element">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={image === '' ? true : false}>
                Crear Receta
            </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CreateRecipe;