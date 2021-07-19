import React from 'react'
import  {Upload, Button, Space, message } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from '@ant-design/icons';

const UploadImages = () => {

    function beforeUpload(file) {
        const isJpgOrPngOrJpeg =  file.type === 'image/jpg' || file.type === 'image/png'  || file.type === 'image/jpeg';
        if (!isJpgOrPngOrJpeg) {
          message.error('Sólo puedes subir imagenes en formato JPG/PNG/JPEG');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPngOrJpeg && isLt2M;
      }
    return (
        <Space direction="vertical" align="center" size="large">
          <Upload
       listType="picture"
       maxCount={4}
       multiple
       beforeUpload={beforeUpload}  
    >
    <Button icon={<UploadOutlined />}
    style={{ marginBottom: 16 }}
    >Upload (Max: 4)</Button>
    </Upload>
    </Space>
       
    )
}

export default UploadImages
