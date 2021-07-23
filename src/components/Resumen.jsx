import React from 'react'
import useInfo from "../info/useInfo";
import useAuth from '../auth/useAuth'
import {Typography, Button } from "antd";
import { useHistory } from "react-router-dom";


const { Text, Paragraph } = Typography;
const Resumen = () => {
    const auth = useAuth()
  const usuario =  auth.user 

    const info = useInfo()
    const color  = info.color
    const tipo  = info.tipo
    const year  = info.year
    const placa  = info.placa

    const history = useHistory()
    
    return (
        <div>
            
            <>
              Estimad@
              <Text type="success" style={{marginTop:20}}> {usuario}</Text>
              <br></br>
              <Paragraph style={{marginTop:20}}>{`Los datos ingresados son los siguientes:`}</Paragraph>
              <Paragraph>{`Color: ${color}`}</Paragraph>
              <Paragraph>{`Año: ${year}`}</Paragraph>
              <Paragraph>{`Placa: ${placa}`}</Paragraph>
              <Paragraph>{`Tipo: ${tipo}`}</Paragraph>

              <Button
                type="success"
               size='large'
               style={{background:'royalblue'}}
                onClick={() => { history.push({pathname:"/final"}) 
                
                }}
              >
                Confirmar datos ingresados
              </Button>
             
            </>

            
        </div>
    )
}

export default Resumen
