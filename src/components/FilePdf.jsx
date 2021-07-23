import React from 'react'
import { jsPDF } from "jspdf";
import {Button} from "antd";
import useAuth from '../auth/useAuth'
import useInfo from '../info/useInfo'
import {ArrowDownOutlined} from '@ant-design/icons'


//genero el archivo pdf pasando los datos desde el contexto
const FilePdf = () => {
    
    const auth = useAuth()
    const usuario =  auth.user 
  
      const info = useInfo()
      const color  = info.color
      const tipo  = info.tipo
      const year  = info.year
      const placa  = info.placa

console.log('desde FilePdf ' + usuario);
const jsPdfGenerator = ()=> {
    const doc = new jsPDF();

    doc.setTextColor(150)
    doc.text(`Hola, ${usuario}. Estos son los datos ingresados para acceder` , 14, 10);
    doc.text(`al seguro ` , 10, 20);
    
    doc.text(`color: ${color} ` , 10, 40);
    doc.text(`Placa: ${placa} ` , 10, 50);
    doc.text(`Tipo: ${tipo} ` , 10, 60);
    doc.text(`Año: ${year} ` , 10, 70);
    
    doc.save("SeguroAutomotriz.pdf");

}
    return (
        <div>
           
           <Button 
            onClick={()=>jsPdfGenerator()}
            icon={<ArrowDownOutlined />}
            style={{marginTop:20, background:'lightseagreen', color:'white'}}>Descargar Comprobante PDF</Button>
  
        </div>
    )
}

export default FilePdf
