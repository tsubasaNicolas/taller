import React, { useState, useEffect } from "react";
import { DatePicker, Divider, message, Form } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import "moment/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";
import useInfo from "../info/useInfo";

const { Item } = Form;

function disabledDate(current) {
  // No puede seleccionar fecha anterior a hoy y deshabilito sabados y domingos
  return (
    current < moment().subtract(1, "days") ||
    moment(current).day() === 0 ||
    moment(current).day() === 6
  );
}

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

var fechaIngreso = moment();
var fechaRetiro = addWeekdays(fechaIngreso, 7);

const Fechas = () => {
  const info = useInfo();

  const [date, setDate] = useState(fechaIngreso);
  const [date2, setDate2] = useState(fechaRetiro);
  // const [bloqueoDias, setBloqueoDias]= useState()

  function disabledDate2(current) {
    // No puede seleccionar fecha anterior a hoy
    return (
      current < addWeekdays(date, 7) ||
      moment(current).day() === 0 ||
      moment(current).day() === 6
    );
  }
  useEffect(() => {
    if (date) {
      setDate(date);
      console.log("prueba useEffect ingreso " + date.format("DD-MM-YYYY"));
      info.verIngreso(date.format("DD-MM-YYYY"));
    }
    //trabajar con Reducer en el futuro
    // eslint-disable-next-line
  }, [date]);

  useEffect(() => {
    if (date2) {
      setDate2(date2);
      console.log("prueba useEffect retiro  " + date2.format("DD-MM-YYYY"));
    }
    info.verRetiro(date2.format("DD-MM-YYYY"));
    // eslint-disable-next-line
  }, [date2]);

  const handleChange = (value) => {
    if (value) {
      message.info(
        `Fecha de ingreso: ${
          value ? value.format("DD-MM-YYYY") : "Ingrese Fecha"
        }`
      );
    } else {
      message.info("Debes ingresar una fecha de ingreso");
    }
    setDate(value);
    setDate2(addWeekdays(value, 7));
  };

  const handleChange2 = (value2) => {
    message.info(`Fecha de retiro: 
    ${date2 ? date2.format("YYYY-MM-DD") : "Ingrese fecha de retiro"}`);
    setDate2(value2);
  };

  return (
    <div>
      <Divider />
      {/* Fecha ingreso */}

      <Item
        label="Fecha de Ingreso"
        name="fechaIngreso"
        rules={[
          {
            message: "Por favor ingresa la fecha de ingreso",
          },
        ]}
      >
        <DatePicker
          format="DD-MM-YYYY"
          locale={locale}
          disabledDate={disabledDate}
          value={date}
          onChange={handleChange}
        />
        <div style={{ marginTop: 16 }}>
          {date
            ? `Fecha seleccionada: ${date.format("DD-MM-YYYY")}`
            : "Debes ingresar una fecha"}
        </div>
      </Item>

      <Divider />
      {/* Fecha Retiro */}
      <Item
        label="Fecha de retiro"
        name="fechaRetiro"
        rules={[
          {
            message: "Por favor ingresa la fecha de retiro",
          },
        ]}
      >
        <DatePicker
          format="DD-MM-YYYY"
          locale={locale}
          disabled={date ? null : "disabled"}
          disabledDate={disabledDate2}
          onChange={handleChange2}
          value={date2}
        />
        <div style={{ marginTop: 16 }}>
          {date2
            ? `Fecha seleccionada: ${date2.format("DD-MM-YYYY")}`
            : "Ingresa la fecha de retiro"}
        </div>
      </Item>

      <Divider />
    </div>
  );
};

export default Fechas;
