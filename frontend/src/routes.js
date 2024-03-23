import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import signIn from "./pages/SignIn/index.js";
import sendFile from './pages/dados/dados';
import search from './pages/pDashboard/dashboard';
import tabulador from './pages/pTabulador/pageTabulador';
import person from './pages/pPerson/index';
import { DadosProvider } from '../src/Context/DataContext'
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={signIn} />
      <DadosProvider>
        <PrivateRoute exact path="/dados" component={sendFile} />
        <PrivateRoute exact path="/search" component={search} />
        <PrivateRoute exact path="/tabulador" component={tabulador} />
        <PrivateRoute exact path="/person" component={person} />
      </DadosProvider>
      <Route path="*" component={() => <div style={{ Height: '100%', Width: '450px', margin: '15% 40%' }}><h1>Página não encontrada</h1></div>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;