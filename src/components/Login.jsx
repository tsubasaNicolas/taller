import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, Modal, Typography, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useAuth from '../auth/useAuth'
import "../App.css";
const { Title } = Typography;

const { Item } = Form;

const Login = () => {

  

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);


  const formSuccess = (datos) => {
    console.log("Formulario enviado exitosamente", datos);
  };

  const formFailed = (error) => {
    console.log("Error", error);
  };

  const onChangeUser = (e) => {
    const value = e.target.value;
    console.log(value);
    setUser(value);
  };
  const onChangePassword = (e) => {
    const value = e.target.value;
    console.log(value);
    setPassword(value);
  };

  const history = useHistory()

  const auth = useAuth()

  // función botón login
  const guardarUsuario = () => {
   if(user && password){
    console.log({user}, {password});
    setTimeout(function () {
      info();
    }, 1000); // modal Inicial info:  tienes 15 minutos des sessión
    setTimeout(function () {
      window.localStorage.removeItem('user');
    }, 900000); // Termino de Sesión : 900000 ms = 15 minutos

auth.user = user
console.log('desde login ' + auth.user);
auth.login(user)  // modificar el context user

 history.push({pathname:"/formulario"})
   }
  
  };

  function info() {
  
    const modal = Modal.info({
        title: "Tiempo de sesión",
        okText: "Entendido",
      content: `Tienes 15 minutos para enviar el formulario`,
    }); 
    setTimeout(() => {
      modal.destroy();
    }, 4000); // Duración modal info: tienes 15 minutos para enviar el formulario
  }

  return (
    
    <div className="App">
      <Row>
        <Col xs={2} sm={6} md={8}></Col>

        <Col xs={20} sm={12} md={8}>
         <Title style={{color:"goldenrod"}} level={2}> Login </Title> 
         <Divider/>
          <Form
            name="login"
            onFinish={formSuccess}
            onFinishFailed={formFailed}
          >
            <Item
              name="usuario"
              value={user}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa tu nombre de usuario",
                  
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Usuario"
                autoFocus
                onChange={onChangeUser}
              />
            </Item>
            <Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa tu contraseña",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                value={password}
                placeholder="Contraseña"
                onChange={onChangePassword}
              />
            </Item>

            <Item>
              <Button
                type="primary"
                className="login-form-button"
                htmlType="submit"
                onClick={() => {
                  guardarUsuario();
                }}
              >
                Entrar
              </Button>
            </Item>
          </Form>
        </Col>

        <Col xs={2} sm={6} md={6}></Col>
      </Row>
    </div>
  );
};


export default Login;
