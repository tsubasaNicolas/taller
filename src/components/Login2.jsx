import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useAuth from '../auth/useAuth'
import "../App.css";
import { createContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const contextValue = {
    user,
    login() {
      setUser({ id: 1, username: "nico" });
    },
    logout() {
      setUser(null);
    },
    isLogged() {
      return !!user;
    },
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};


const { Item } = Form;

const Login2 = () => {

  

  const [user, setUser] = useState();
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

  const guardarUsuario = () => {
   if(user && password){
    console.log({user}, {password});
    setTimeout(function () {
      info();
    }, 1000); // modal tienes 15 minutos des sessión
    setTimeout(function () {
 localStorage.removeItem(auth.user);
    }, 3000); //900000 ms = 15 minutos

   }
  setUser( auth.login())
   ;
   history.push({pathname:"/formulario"})
  };

  function info() {
  
    const modal = Modal.info({
        title: "Tiempo de sesión",
        okText: "Entendido",
      content: `Tienes 15 minutos para enviar el formulario`,
    }); 
    setTimeout(() => {
      modal.destroy();
    }, 4000);
  }

  return (
    
    <div className="App">
      <Row>
        <Col xs={2} sm={6} md={8}>login 2</Col>

        <Col xs={20} sm={12} md={8}>
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
                Login
              </Button>
            </Item>
          </Form>
        </Col>

        <Col xs={2} sm={6} md={6}></Col>
      </Row>
    </div>
  );
};


export default Login2;


