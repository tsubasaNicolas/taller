import React from "react";
import { jsPDF } from "jspdf";
import { Button } from "antd";
import useAuth from "../auth/useAuth";
import useInfo from "../info/useInfo";
import { sello } from "../imagenes/sello";
import { FilePdfOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/es";

//obtengo img sello jpeg base64
const imgData = sello;

//genero el archivo pdf pasando los datos desde el contexto
const FilePdf = () => {
  //obtengo datos desde el contexto
  const auth = useAuth();
  const info = useInfo();

  const usuario = auth.user;
  const color = info.color;
  const tipo = info.tipo;
  const year = info.year;
  const placa = info.placa;
  const ingreso = info.ingreso;
  const retiro = info.retiro;
  const imagenes = info.fileList;
  const emision = moment().format("DD-MM-YYYY");

  //const imagen1 = fileList[0];
  ///problemas al cargar las fotos  -- verificar cuando cargan
  //pospongo la renderización de la imagen  sólo informaré del nombre de la imagen  en el comprobante
  // console.log("desde FilePdf " + localStorage.getItem("fileList").name);

  const imagen1 = imagenes[0].name;
  const imagen2 = imagenes[1].name;
  const imagen3 = imagenes[2].name;
  const imagen4 = imagenes[3].name;

  const jsPdfGenerator = () => {
    if (imagenes.length > 0) {
      Array.from(imagenes).forEach((file) => {
        console.log("array desde file pdf " + file.name);
      });
      // console.log(fileList.thumbUrl);
    }

    const doc = new jsPDF();
    // pinto los datos  desde el contexto

    doc.setTextColor(128, 128, 128);
    doc.text(`Hola ,`, 50, 20);
    doc.setFont("helvetica", "bold");
    <></>;
    doc.text(`${usuario}.`, 66, 20);

    doc.setFont("normal");
    doc.setTextColor(128, 128, 128);
    doc.text("Estos son los datos ingresados para acceder al seguro: ", 20, 30);

    doc.setDrawColor(205, 92, 92); // lines
    doc.setLineWidth(0.5);
    doc.line(20, 40, 180, 40);

    doc.setTextColor(128, 128, 128);
    doc.text(`Color:`, 40, 50);
    doc.setTextColor(32, 178, 170);
    doc.text(`${color} `, 60, 50);

    doc.setTextColor(128, 128, 128);
    doc.text(`Placa:`, 100, 50);
    doc.setTextColor(32, 178, 170);
    doc.text(`${placa} `, 120, 50);

    doc.setTextColor(128, 128, 128);
    doc.text(`Tipo:`, 40, 70);
    doc.setTextColor(32, 178, 170);
    doc.text(`${tipo} `, 60, 70);

    doc.setTextColor(128, 128, 128);
    doc.text(`Año:`, 100, 70);
    doc.setTextColor(32, 178, 170);
    doc.text(`${year}`, 120, 70);

    doc.setDrawColor(205, 92, 92); // lines
    doc.setLineWidth(0.5);
    doc.line(20, 80, 180, 80);

    doc.setTextColor(128, 128, 128);
    doc.text(`Ingreso Vehículo:`, 20, 90);
    doc.setTextColor(32, 178, 170);
    doc.text(`${ingreso}`, 70, 90);

    doc.setTextColor(128, 128, 128);
    doc.text(`Retiro Vehículo:`, 20, 110);
    doc.setTextColor(32, 178, 170);
    doc.text(`${retiro} `, 70, 110);

    doc.setTextColor(128, 128, 128);
    doc.text(`Estas son las imagenes seleccionadas: `, 20, 130);

    doc.setFontSize(20);
    doc.addImage(imgData, "JPEG", 50, 140, 120, 160);

    doc.setTextColor(128, 128, 128);
    doc.text("Imagen 1:", 20, 140);
    doc.setTextColor(32, 178, 170);
    doc.text(`${imagen1} `, 54, 140);

    doc.setTextColor(128, 128, 128);
    doc.text("Imagen 2:", 20, 150);
    doc.setTextColor(32, 178, 170);
    doc.text(`${imagen2} `, 54, 150);

    doc.setTextColor(128, 128, 128);
    doc.text("Imagen 3:", 20, 160);
    doc.setTextColor(32, 178, 170);
    doc.text(`${imagen3}`, 54, 160);

    doc.setTextColor(128, 128, 128);
    doc.text("Imagen 4:", 20, 170);
    doc.setTextColor(32, 178, 170);
    doc.text(`${imagen4} `, 54, 170);

    doc.text(`Fecha de emisión: ${emision} `, 60, 280);

    doc.save("SeguroAutomotriz.pdf");
  };
  return (
    <div>
      <Button
        onClick={() => jsPdfGenerator()}
        icon={<FilePdfOutlined />}
        style={{ marginTop: 20, background: "lightseagreen", color: "white" }}
      >
        Descargar Comprobante PDF
      </Button>
    </div>
  );
};

export default FilePdf;
