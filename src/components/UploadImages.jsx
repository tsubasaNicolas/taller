import React, { useState, useEffect } from "react";
import { Upload, Button, Space, message, Form } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import useInfo from "../info/useInfo";

const { Item } = Form;
const UploadImages = () => {
  const info = useInfo();

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (fileList) {
      setFileList(fileList);
      info.verFileList(fileList);
    }
    //trabajar con Reducer en el futuro
    // eslint-disable-next-line
  }, [fileList]);

  //Validar Tamaño y cantidad de imagenes
  function beforeUpload(file) {
    const isJpgOrPngOrJpeg =
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg";

    if (!isJpgOrPngOrJpeg) {
      message.error("Sólo puedes subir imagenes en formato JPG/PNG/JPEG");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPngOrJpeg && isLt2M;
  }
  const cantidadImagenes = fileList.length;
  const handleUpload = (infoFotos) => {
    let fileList = [...infoFotos.fileList];
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    console.log(infoFotos.file.status);
    if (infoFotos.file.status === "done") {
      console.log(fileList.tumbUrl);
      setFileList(fileList);
      console.log(info.fileList);
    }

    if (fileList.length > 0) {
      Array.from(fileList).forEach((file) => {
        console.log(file.name);
      });
      // console.log(fileList.thumbUrl);
    }

    console.log(cantidadImagenes);

    if (cantidadImagenes === 4) {
      console.log(`Falta 1 foto por cargar`);
      setFileList(fileList);
      //    info.verFileList(fileList);
      console.log(fileList.thumbUrl);
    } else if (cantidadImagenes === 3) {
      console.log(`Falta 1 foto por cargar`);
      setFileList(fileList);
      //  info.verFileList(fileList);
      console.log(fileList.thumbUrl);
    } else if (cantidadImagenes === 2) {
      console.log(`Faltan 2 fotos por cargar`);
      setFileList(fileList);
      //   info.verFileList(fileList);
      console.log(fileList.thumbUrl);
    } else if (cantidadImagenes === 1) {
      console.log(`Faltan 3 fotos por cargar`);
      setFileList(fileList);
      //  info.verFileList(fileList);
      console.log(fileList.thumbUrl);
    } else {
      console.log(`Todas las fotos han sido cargadas`);
      info.verFileList([]);
    }
  };

  return (
    <>
      <div style={{ marginTop: 20 }}>
        (Derecha, Izquierda, Delantera, Trasera)
      </div>
      <Space direction="vertical" align="center" size="large">
        <Item name="imagenes" style={{ marginTop: 10 }}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // handleChange={handleChange}
            // fileList={fileList}
            onChange={handleUpload}
            listType="picture"
            maxCount={4}
            multiple
            beforeUpload={beforeUpload}
          >
            <Button icon={<UploadOutlined />} style={{ marginBottom: 16 }}>
              Subir (4 Fotos)
            </Button>
          </Upload>
        </Item>
      </Space>

      <div>
        {cantidadImagenes < 4
          ? `Faltan ${4 - cantidadImagenes} fotos por cargar`
          : "Todas las fotos han sido cargadas"}
      </div>
    </>
  );
};

export default UploadImages;
