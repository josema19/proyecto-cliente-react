// Importar librerías
import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';


const OrderItem = () => {
  const [formInstance] = Form.useForm();

  // Renderizar componente
  return (
    <div className="form-container">
      <Form
        form={formInstance}
        name="StatusForm"
        layout="vertical"
        className="form-box"
      >
      </Form>
    </div>
  );
}

export default OrderItem;