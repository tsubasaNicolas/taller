import { createContext, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

export const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [fileList, setFileList] = useState(
    JSON.parse(localStorage.getItem("fileList")) || []
  );

  useEffect(() => {
    try {
      localStorage.setItem("fileList", JSON.stringify(fileList));
    } catch (error) {
      localStorage.removeItem("fileList");
      console.log(error);
    }
  }, [fileList]);

  const [color, setColor] = useState(JSON.parse(localStorage.getItem("color")));

  const [tipo, setTipo] = useState(
    JSON.parse(localStorage.getItem("tipo")) || "Tipo 1"
  );
  const [year, setYear] = useState(
    JSON.parse(localStorage.getItem("year")) || "2021"
  );
  const [placa, setPlaca] = useState(
    JSON.parse(localStorage.getItem("placa")) || null
  );
  // falta seleccionar las fechas correctas
  const [ingreso, setIngreso] = useState(moment().format("DD-MM-YYYY"));

  useEffect(() => {
    try {
      localStorage.setItem("ingreso", JSON.stringify(ingreso));
    } catch (error) {
      localStorage.removeItem("ingreso");
      console.log(error);
    }
  }, [ingreso]);

  var fechaRetiro = addWeekdays(ingreso, 7);
  console.log(fechaRetiro);

  const [retiro, setRetiro] = useState(fechaRetiro);

  useEffect(() => {
    try {
      localStorage.setItem("retiro", JSON.stringify(retiro));
    } catch (error) {
      localStorage.removeItem("retiro");
      console.log(error);
    }
  }, [retiro]);

  function addWeekdays(date3, days) {
    date3 = moment(date3);
    while (days > 0) {
      date3 = date3.add(1, "days");
      if (date3.isoWeekday() !== 6 && date3.isoWeekday() !== 7) {
        days -= 1;
      }
    }
    return date3;
  }

  useEffect(() => {
    try {
      localStorage.setItem("color", JSON.stringify(color));
    } catch (error) {
      localStorage.removeItem("color");
      console.log(error);
    }
  }, [color]);

  useEffect(() => {
    try {
      localStorage.setItem("placa", JSON.stringify(placa));
      localStorage.setItem("tipo", JSON.stringify(tipo));
      localStorage.setItem("year", JSON.stringify(year));
      localStorage.setItem("ingreso", JSON.stringify(ingreso));
    } catch (error) {
      localStorage.removeItem("placa");

      console.log(error);
    }
  }, [placa, tipo, year, ingreso]);

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
    retiro,
    verRetiro(retiro) {
      setRetiro(retiro);
    },
    fileList,
    verFileList(fileList) {
      setFileList(fileList);
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
