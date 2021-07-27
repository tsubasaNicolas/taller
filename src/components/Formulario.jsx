import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, Select, Typography } from "antd";
import "antd/dist/antd.css";
import { createRef } from "react";
import Fechas from "./Fechas";
import UploadImages from "./UploadImages";
import { useHistory } from "react-router-dom";
import useAuth from "../auth/useAuth";
import useInfo from "../info/useInfo";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Text, Paragraph } = Typography;

const { Item } = Form;

const { Option } = Select;

const Formulario = () => {
  const formRef = createRef();
  const auth = useAuth();

  const [tipoVehiculo, setTipoVehiculo] = useState("Tipo 1");
  const [añoVehiculo, setAñoVehiculo] = useState("2021");
  const [colorVehiculo, setColorVehiculo] = useState(
    localStorage.getItem("color") || null
  );

  const [placaVehiculo, setPlacaVehiculo] = useState(
    localStorage.getItem("placa") || null
  );

  const info = useInfo();

  useEffect(() => {
    if (placaVehiculo) {
      setPlacaVehiculo(placaVehiculo);
    }
  }, [placaVehiculo]);

  useEffect(() => {
    if (tipoVehiculo) {
      setTipoVehiculo(tipoVehiculo);
    }
  }, [tipoVehiculo]);

  useEffect(() => {
    if (añoVehiculo) {
      setAñoVehiculo(añoVehiculo);
    }
  }, [añoVehiculo]);

  useEffect(() => {
    console.log("prueba useEffect colorVehiculo " + colorVehiculo);
    setColorVehiculo(colorVehiculo);
  }, [colorVehiculo]);

  const onChangeTipoVehiculo = (tipoVehiculo) => {
    setTipoVehiculo(tipoVehiculo);
    info.verTipo(tipoVehiculo);
  };
  const onChangeAñoVehiculo = (añoVehiculo) => {
    setAñoVehiculo(añoVehiculo);
    info.verYear(añoVehiculo);
  };

  const history = useHistory();

  const formSuccess = (datos) => {
    console.log("Formulario enviado exitosamente", datos);
    history.push({ pathname: "/resumen" });
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

  //   const handleSubmit = (event) => {
  //  event.preventDefault()
  //  irResumen()
  //   };

  return (
    <div>
      <Row>
        <Col xs={1} sm={2} md={6} lg={7}></Col>

        <Col xs={22} sm={20} md={12} lg={10} style={{ marginTop: 30 }}>
          {auth.user ? (
            <>
              Hola,
              <Text type="success"> {auth.user}</Text>
              <br></br>
              <Paragraph> Por favor completa el siguiente formulario</Paragraph>
            </>
          ) : (
            ""
          )}
          <Form
            // onSubmit={handleSubmit}
            style={{ marginTop: 30 }}
            initialValues={{ tipo: "Tipo 1", año: "2021" }}
            name="formulario"
            onFinish={formSuccess}
            onFinishFailed={formFailed}
            ref={formRef}
            {...formItemLayout}
          >
            {/*  No es necesario el campo usuario/ redundante */}
            {/* <Item
              label="Usuario"
              name="usuario" 
           
            >
              <Input 
              placeholder={nombreUsuario?nombreUsuario:'nada'} 
              defaultValue={(nombreUsuario)}
              />
            </Item>
       */}
            <Item label="Tipo de vehículo">
              <Select
                autoFocus
                name="tipo"
                onChange={onChangeTipoVehiculo}
                // defaultValue={JSON.parse(localStorage.getItem("tipo"))}
                defaultValue={JSON.parse(localStorage.getItem("tipo"))}
              >
                <Option value="Tipo 1">Tipo 1</Option>
                <Option value="Tipo 2">Tipo 2</Option>
                <Option value="Tipo 3">Tipo 3</Option>
              </Select>
            </Item>

            <Item label="Año">
              <Select
                name="año"
                onChange={onChangeAñoVehiculo}
                defaultValue={JSON.parse(localStorage.getItem("year"))}
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
              value={
                JSON.stringify(colorVehiculo) === null
                  ? localStorage.getItem("color")
                  : colorVehiculo
              }
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa la placa del vehículo",
                },
              ]}
            >
              <Input
                placeholder="Ingresa Color del vehículo"
                required
                name="color"
                defaultValue={JSON.parse(localStorage.getItem("color"))}
                onChange={(e) => {
                  setColorVehiculo(colorVehiculo);
                  info.verColor(e.target.value);
                }}
              />
            </Item>

            <Item
              label="Placa"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa la placa del vehículo",
                },
              ]}
            >
              <Input
                name="inputPlacaVehiculo"
                required
                placeholder="Ingresa Placa del vehículo"
                defaultValue={JSON.parse(localStorage.getItem("placa"))}
                onChange={(e) => {
                  setPlacaVehiculo(placaVehiculo);
                  info.verPlaca(e.target.value);
                }}
              />
            </Item>

            <Fechas />

            <UploadImages />

            <Item
              //  name="enviarFormulario"
              style={{ marginTop: 16, alignContent: "center" }}
            >
              <Button
                type="submit"
                htmlType="submit"
                icon={<ArrowRightOutlined />}
                style={{ background: "royalblue", color: "white" }}
              >
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
  );
};

export default Formulario;
