import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import useAuth from "../auth/useAuth";
import Formulario from "../components/Formulario";
import Home from "../components/Home";
import Login from "../components/Login";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "../components/PrivateRoute";
//import EspecialRoute from "../components/EspecialRoute";
import PublicRoute from "../components/PublicRoute";
import { Button, Card } from "antd";
import Resumen from "../components/Resumen";
import Final from "../components/Final";
import { LogoutOutlined } from "@ant-design/icons";
import "../App.css";

const AppRouter = () => {
  const auth = useAuth();
  return (
    <Router>
      <Card
        bodyStyle={{ background: "#ffd452" /* fallback for old browsers */ }}
        type="inner"
        title="Seguro Automotriz"
        extra={
          auth.isLogged() && (
            <Button
              style={{ background: "crimson", color: "white" }}
              icon={<LogoutOutlined />}
              onClick={() => {
                auth.logout();
                <Redirect to="/login" />;
              }}
            >
              Salir
            </Button>
          )
        }
      ></Card>
      <div>
        {/* <nav>
          <ul>
            {!auth.isLogged() && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">login</Link>
                </li>
                <li>
                  <Link to="/formulario">formulario</Link>
                </li>
              </>
            )}
          </ul>
        </nav> */}

        {!auth.isLogged() && (
          <div style={{ display: "none" }}>
            <Link to="/">Home</Link>

            <Link to="/login">login</Link>

            <Link to="/formulario">formulario</Link>
          </div>
        )}

        <Switch>
          <PrivateRoute exact path="/formulario" component={Formulario} />

          <PublicRoute exact path="/login" component={Login} />

          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/resumen" component={Resumen} />
          <PrivateRoute exact path="/final" component={Final} />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
