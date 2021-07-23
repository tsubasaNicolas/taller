import React from 'react'
import  {Upload, Button, Space, message, Form } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from '@ant-design/icons';
const {Item} = Form 
const UploadImages = () => {

  //const [fileList, setFileList] = useState([])
  //Validar Tamaño y cantidad de imagenes
    function beforeUpload(file) {
      
        const isJpgOrPngOrJpeg =  file.type === 'image/png'  || file.type === 'image/jpg' || file.type === 'image/jpeg';
       
        if (!isJpgOrPngOrJpeg) {
          message.error('Sólo puedes subir imagenes en formato JPG/PNG/JPEG');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPngOrJpeg && isLt2M;       
      }

       
function images(info) {
  // No puede seleccionar fecha anterior a hoy
  
  return info.fileList.length
}

      const  handleUpload = (info) => {
        console.log(' desde handleupload' + {images});

       let fileList = [...info.fileList];
        // the original file is located at the `originFileObj` key of each of this files
        // so `event.target.files[0]` is actually fileList[0].originFileObj       
        console.log(info.file.status);
        const cantidadImagenes = fileList.length 
        console.log(cantidadImagenes);

        if(cantidadImagenes === 3 ){
          console.log(`Falta 1 foto por cargar`);
      }else if(cantidadImagenes === 2 ){
        console.log(`Faltan 2 fotos por cargar`);
      }else if(cantidadImagenes === 1 ){
        console.log(`Faltan 3 fotos por cargar`);
      }else{
        console.log(`Todas las fotos han sido cargadas`);
      }
    }

    return (
        <Space direction="vertical" align="center" size="large">
          <Item
        name="imagenes"
          >
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
       <div style={{ marginTop: 16 }}>
   
      </div>


    <Button icon={<UploadOutlined />}
    style={{ marginBottom: 16 }}
    >Upload (4 Fotos)</Button>
    </Upload>
          </Item>
    </Space>
       
    )
}

export default UploadImages
