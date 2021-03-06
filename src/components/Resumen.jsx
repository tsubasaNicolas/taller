import React, { useState } from "react";
//import useInfo from "../info/useInfo";
import useAuth from "../auth/useAuth";
import { Typography, Button, Modal, Space } from "antd";
import { useHistory } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import useInfo from "../info/useInfo";
import FilePdf from "./FilePdf";

const { Text, Paragraph } = Typography;
const Resumen = () => {
  const [confirm, setConfirm] = useState(false);

  const abrirConfirm = () => {
    setConfirm(true);
  };

  const cerrarConfirm = () => {
    setConfirm(false);
  };
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
          {!info.fileList.length > 0 ? "" : "Fotos Cargadas:"}
        </Text>
        {info.fileList
          ? info.fileList.map((list, index) => (
              <p key={index}>
                Imagen: {index + 1}.- <Text type="warning">{list.name}</Text>
              </p>
            ))
          : "algo"}
        <Button
          // type="success"
          size="large"
          style={{ background: "lightseagreen", color: "white" }}
          icon={<CheckOutlined />}
          onClick={() => {
            abrirConfirm();
          }}
        >
          Confirmar datos ingresados
        </Button>
        <div style={{ marginTop: 10 }}>
          <Space direction="vertical" align="center">
            <Link to="/formulario"> Volver </Link>
          </Space>
        </div>
        <Modal
          title="Confirmar Datos"
          visible={confirm}
          onCancel={cerrarConfirm}
          onOk={() => {
            history.push({ pathname: "/final" });
            <FilePdf />;
          }}
        >
          ¿ Estás seguro que deseas confirmar los datos? ... una vez confirmado,
          no podrá volver a modificarlos. trabajaré esto luego como pila o con
          Estado
        </Modal>
      </>
    </div>
  );
};

export default Resumen;
