import { createContext, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

export const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [color, setColor] = useState(
    JSON.parse(localStorage.getItem("color")) || null
  );
  const [placa, setPlaca] = useState(
    JSON.parse(localStorage.getItem("placa")) || null
  );

  const [tipo, setTipo] = useState("Tipo 1");
  const [year, setYear] = useState("2021");
  const [ingreso, setIngreso] = useState(moment().format("DD-MM-YYYY"));

  useEffect(() => {
    try {
      localStorage.setItem("placa", JSON.stringify(placa));
      localStorage.setItem("tipo", JSON.stringify(tipo));
      localStorage.setItem("year", JSON.stringify(year));
      localStorage.setItem("ingreso", JSON.stringify(ingreso));
    } catch (error) {
      localStorage.removeItem("placa");
      localStorage.removeItem("tipo");
      localStorage.removeItem("year");
      localStorage.removeItem("ingreso");
      console.log(error);
    }
  }, [placa, tipo, year, ingreso]);

  useEffect(() => {
    try {
      localStorage.setItem("color", JSON.stringify(color));
    } catch (error) {
      localStorage.removeItem("color");

      console.log(error);
    }
  }, [color]);

  const contextValue = {
    color,
    verColor(color) {
      setColor(color);
    },
    placa,
    verPlaca(placa) {
      setPlaca(placa);
    },
    tipo,
    verTipo(tipo) {
      setTipo(tipo);
    },
    year,
    verYear(year) {
      setYear(year);
    },
    ingreso,
    verIngreso(ingreso) {
      setIngreso(ingreso);
    },
  };
  console.log("desde info provider " + JSON.stringify(color));
  console.log("desde info provider " + JSON.stringify(placa));
  console.log("desde info provider " + JSON.stringify(tipo));
  console.log("desde info provider " + JSON.stringify(year));
  return (
    <InfoContext.Provider value={contextValue}>{children}</InfoContext.Provider>
  );
};

export default InfoProvider;
