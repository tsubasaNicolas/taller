
import React from "react";
import { Button, Form, Input, Row, Col, Select } from "antd";
import "antd/dist/antd.css";
import { createRef } from "react";
import Prueba1 from "./Prueba1";
import UploadImages from "./UploadImages";

const { Item } = Form;

const { Option } = Select;

const Formulario = () => {
    const formRef = createRef();

  const formSuccess = (datos) => {
    console.log("Formulario enviado exitosamente", datos);
  };

  const formFailed = (error) => {
    console.log("Error", error);
  };

//   const borrarCampos = () => {
//     formRef.current.resetFields();
//   };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 4,
      },
      sm: {
        span: 20,
      },
    },
  };

    return (
        <div>
              <Row>
        <Col xs={1} sm={2} md={6} lg={7}></Col>

        <Col xs={22} sm={20} md={12} lg={10}>
          <Form
            name="formulario"
           
            onFinish={formSuccess}
            onFinishFailed={formFailed}
            ref={formRef}
            {...formItemLayout}
          >
            <Item
              label="Usuario"
              name="usuario"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu usuario",
                },
              ]}
            >
              <Input />
            </Item>

            <Item label="Tipo de vehículo" name="tipos">
              <Select
                defaultValue="Tipo 1"
                // onChange={handleChange}
              >
                <Option value="Tipo 1">Tipo 1</Option>
                <Option value="Tipo 2">Tipo 2</Option>
                <Option value="Tipo 3">Tipo 3</Option>
              </Select>
            </Item>

            <Item label="Año" name="año">
              <Select
                defaultValue="2021"
                // onChange={handleChange}
              >
                <Option value="2021">2021</Option>
                <Option value="2020">2020</Option>
                <Option value="2019">2019</Option>
                <Option value="2018">2018</Option>
                <Option value="2017">2017</Option>
                <Option value="2016">2016</Option>
                <Option value="2015">2015</Option>
                <Option value="2014">2014</Option>
              </Select>
            </Item>

            <Item
              label="Color"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el color del vehículo",
                },
              ]}
            >
              <Input />
            </Item>

            <Item
              label="Placa"
              name="placa"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa la placa del vehículo",
                },
              ]}
            >
              <Input />
            </Item>
            <Prueba1/>
            <UploadImages/>

            <Item style={{marginTop: 16, alignContent:"center"}}>
              <Button type="primary" htmlType="submit">
               Enviar
              </Button>
              {/* &nbsp;&nbsp;&nbsp;
              <Button htmlType="button" onClick={borrarCampos}>
                {" "}
                Borrar Campos
              </Button> */}
            </Item>

          

          </Form>
        </Col>

        <Col xs={1} sm={2} md={6} lg={7}></Col>
      </Row>
        </div>
    )
}

export default Formulario
