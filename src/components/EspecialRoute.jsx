import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import useInfo from "../info/useInfo";

export default function PublicRoute({ component: Component, ...rest }) {
  const info = useInfo();
  return (
    <Route {...rest}>
      {/* crear un nuevo state y contexto para manerjar la ruta como privada antes de logout 
      ---mientras ocuparé el color
      */}
      {info.color ? <Component /> : <Redirect to="/final" />}

      {!info.color ? <Link to="/formulario"> Acceder </Link> : ""}
    </Route>
  );
}
