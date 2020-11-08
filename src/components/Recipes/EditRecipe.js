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

const EditeRecipe = () => {
  // Definir context
  const recipeContext = useContext(RecipeContext);
  const { loading, messageR, recipe, editRecipe, cleanMessage, switchLoading } = recipeContext;

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

  // Definir effect para setear los valores del formulario
  useEffect(() => {
    if (recipe) {
      RecipeFormInstance.setFieldsValue({
        name: recipe.name,
        ingredients: recipe.ingredients,
        preparation: recipe.preparation,
      });
    };
  }, [recipe, RecipeFormInstance]);

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
      await editRecipe(values);

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
    <div className="form-internal-container">
      <h1>Editar Receta</h1>
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
          <Col span="12">
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
              <Input />
            </Form.Item>
          </Col>
          <Col span="12">
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
              <Input />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item
              label="Imagen"
            >
              <Dropzone formCall="recipe" />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item className="last-element">
              <Button type="primary" htmlType="submit" loading={loading}>
                Editar Receta
            </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditeRecipe;