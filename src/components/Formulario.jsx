
import React, {useState} from "react";
import { Button, Form, Input, Row, Col, Select,Typography } from "antd";
import "antd/dist/antd.css";
import { createRef } from "react";
import Fechas from "./Fechas";
import UploadImages from "./UploadImages";
import useInfo from "../info/useInfo";
import { useHistory } from "react-router-dom";
import useAuth from '../auth/useAuth'


const { Text, Paragraph } = Typography;

const { Item } = Form;

const { Option } = Select;

const Formulario = () => {
    const formRef = createRef();
    const auth = useAuth()
    
  const [tipoVehiculo, setTipoVehiculo] = useState(null);
  const [añoVehiculo, setAñoVehiculo] = useState(null);
  const [colorVehiculo, setColorVehiculo] = useState(window.localStorage.getItem('color'));
  const [placaVehiculo, setPlacaVehiculo] = useState(null);

  
  const onChangeTipoVehiculo = (tipoVehiculo) => {
    setTipoVehiculo(tipoVehiculo)
    console.log(tipoVehiculo);
  }
  
  const onChangeAñoVehiculo = (añoVehiculo) => {
    setAñoVehiculo(añoVehiculo)
    console.log(añoVehiculo);
  }

  const onChangeColorVehiculo = (e) => {
    const value = e.target.value;
    console.log(value);
    setColorVehiculo(value);
    info.verColor(colorVehiculo) 
  };
  
  const onChangePlacaVehiculo = (e) => {
    const value = e.target.value;
    console.log(value);
    setPlacaVehiculo(value);
  };

 
  const history = useHistory()

  const formSuccess = (datos) => {
    console.log("Formulario enviado exitosamente", datos);
    history.push({pathname:"/resumen"})
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


  const info = useInfo()

  info.color = colorVehiculo
  info.placa = placaVehiculo
  info.tipo = tipoVehiculo
  info.year = añoVehiculo
  
  info.verColor(colorVehiculo)  // modificar el context user
  info.verPlaca(placaVehiculo)
  info.verTipo(tipoVehiculo)
  info.verYear(añoVehiculo)

  
  //console.log('desde formulario color ' + info.color + 'desde formulario placa '+ info.placa);
 
 
//   const handleSubmit = (event) => {
//  event.preventDefault()
//  irResumen()

//   };
 
    return (
        <div>
              <Row>
             
        <Col xs={1} sm={2} md={6} lg={7}></Col>
      
        <Col xs={22} sm={20} md={12} lg={10}>
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
          style={{marginTop:30}}
          initialValues={{tipos : 'Tipo 1', año:"2021"}}
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
            <Item label="Tipo de vehículo" name="tipos">
              <Select autoFocus
                onChange={onChangeTipoVehiculo} 
               >
         
                <Option value="Tipo 1">Tipo 1</Option>
                <Option value="Tipo 2">Tipo 2</Option>
                <Option value="Tipo 3">Tipo 3</Option>
              </Select>
            </Item>

            <Item label="Año" name="año">
              <Select
               onChange={onChangeAñoVehiculo}
              
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
              <Input placeholder="Ingresa Color del vehículo"
    
                onChange={onChangeColorVehiculo}
                value={colorVehiculo}/>
            </Item>

            <Item
              label="Placa"
              name="placa"
              value={placaVehiculo}
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa la placa del vehículo",
                },
              ]}
            >
              <Input placeholder="Ingresa Placa del vehículo" 
              onChange={onChangePlacaVehiculo}/>
            </Item>

           

           <Fechas/> 

            <UploadImages/>
           
            <Item 
          //  name="enviarFormulario"
            style={{marginTop: 16, alignContent:"center"}}>
              <Button type="submit" htmlType="submit" style={{background:'royalblue', color:'white'}} >
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
