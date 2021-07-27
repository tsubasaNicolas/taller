import React from "react";
//import useInfo from "../info/useInfo";
import useAuth from "../auth/useAuth";
import { Typography, Button } from "antd";
import { useHistory } from "react-router-dom";
import "../App.css";
import { CheckOutlined } from "@ant-design/icons";
import useInfo from "../info/useInfo";

const { Text, Paragraph } = Typography;
const Resumen = () => {
  //obtengo los datos del contexto
  const info = useInfo();
  const auth = useAuth();
  const usuario = auth.user;
  const color = JSON.parse(localStorage.getItem("color"));
  const tipo = JSON.parse(localStorage.getItem("tipo"));
  const year = JSON.parse(localStorage.getItem("year"));
  const placa = JSON.parse(localStorage.getItem("placa"));
  const ingreso = JSON.parse(localStorage.getItem("ingreso"));
  const retiro = JSON.parse(localStorage.getItem("retiro"));

  const history = useHistory();

  return (
    <div style={{ marginTop: 30 }}>
      <>
        Estimad@
        <Text type="success" style={{ marginTop: 20 }}>
          {" "}
          {usuario}
        </Text>
        <br></br>
        <Paragraph
          style={{ marginTop: 20 }}
        >{`Los datos ingresados son los siguientes:`}</Paragraph>
        <Paragraph>{`Color: ${color}`}</Paragraph>
        <Paragraph>{`Año: ${year}`}</Paragraph>
        <Paragraph>{`Placa: ${placa}`}</Paragraph>
        <Paragraph>{`Tipo: ${tipo}`}</Paragraph>
        <Paragraph>{`Ingreso de vehículo al taller: ${ingreso}`}</Paragraph>
        <Paragraph>{`Retiro del vehículo: ${retiro}`}</Paragraph>
        {/* JSX recorro la lista de imagenes */}
        <Text type="success" style={{ marginTop: 20 }}>
          {!info.fileList === [] ? "Imágenes cargadas :" : ""}
        </Text>
        {info.fileList
          ? info.fileList.map((list, index) => (
              <p key={index}>
                Imagen: {index + 1}.- {list.name}
              </p>
            ))
          : "algo"}
        <Button
          // type="success"
          size="large"
          style={{ background: "lightseagreen", color: "white" }}
          icon={<CheckOutlined />}
          onClick={() => {
            history.push({ pathname: "/final" });
          }}
        >
          Confirmar datos ingresados
        </Button>
      </>
    </div>
  );
};

export default Resumen;
