import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Formulario from "../components/Formulario";
import Home from "../components/Home";
import Login from "../components/Login";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import { Button, Card } from "antd";
import Resumen from "../components/Resumen";
import Final from "../components/Final";

const AppRouter = () => {
  const auth = useAuth();
  return (
    <Router>
      <Card
        style={{
          marginTop: 2,
          backgroundColor: "goldenrod",
          color: "lightseagreen",
        }}
        type="inner"
        title="Seguro Automotriz"
        extra={
          auth.isLogged() && (
            <Button
              style={{ background: "indianred", color: "white" }}
              onClick={auth.logout}
            >
              logout
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

        <Switch>
          <PrivateRoute exact path="/formulario" component={Formulario} />

          <PublicRoute exact path="/login" component={Login} />

          <Route exact path="/" component={Home} />
          <Route exact path="/resumen" component={Resumen} />
          <Route exact path="/final" component={Final} />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
