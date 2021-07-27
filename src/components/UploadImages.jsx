import React, { useState, useEffect } from "react";
import { Upload, Button, Space, message, Form, Typography } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import useInfo from "../info/useInfo";
const { Text } = Typography;

const { Item } = Form;
const UploadImages = () => {
  const info = useInfo();

  const [fileList, setFileList] = useState(
    JSON.parse(localStorage.getItem("fileList")) || []
  );

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
    //info.verFileList(fileList);
    console.log(infoFotos.file.status);

    if (infoFotos.file.status === "done") {
      console.log(fileList.thumbUrl);
      setFileList(fileList);
      console.log(info.fileList);
    }

    if (fileList.length > 0) {
      Array.from(fileList).forEach((file) => {
        console.log("prueba desde upload images " + file.name);
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

  // const fileListKeep = [
  //   {
  //     uid: '-1',
  //     name: 'xxx.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-2',
  //     name: 'yyy.png',
  //     status: 'error',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  // ];

  const cantidadFotos = (rule, value, callback) => {
    const lista = info.fileList;

    if (lista.length < 4) {
      callback("Todas las fotografías requeridas");
    }
    callback();
    // Always return a callback, otherwise validateFields cannot respond
  };

  return (
    <>
      <div style={{ marginTop: 20 }}>
        (Derecha, Izquierda, Delantera, Trasera)
      </div>
      <Space direction="vertical" align="center" size="large">
        <Item
          name="imagenes"
          style={{ marginTop: 10 }}
          rules={[{ validator: cantidadFotos }]}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            showUploadList={true}
            // showUploadList: false,
            //Whether to display the list after successful file upload
            onChange={handleUpload}
            listType="picture"
            maxCount={4}
            multiple
            beforeUpload={beforeUpload}
            defaultFileList={fileList}
          >
            <Button icon={<UploadOutlined />} style={{ marginBottom: 16 }}>
              Subir (4 Fotos)
            </Button>
          </Upload>
        </Item>
      </Space>

      <div>
        {cantidadImagenes < 4 ? (
          <Text type="danger">
            Faltan {4 - cantidadImagenes} fotos por cargar
          </Text>
        ) : (
          <Text type="success">* Todas las fotos han sido cargadas * </Text>
        )}
      </div>

      <Text type="success">
        ( Pendiente de programar -funciona con fotos cargadas con error luego de
        una cargada con éxito)
      </Text>
    </>
  );
};

export default UploadImages;
