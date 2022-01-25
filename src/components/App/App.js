import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import BoxRegistration from "../BoxRegistration/BoxRegistration";
import Tracking from "../Tracking/Tracking";
import Catalog from "../Catalog/Catalog";
import Users from "../Users/Users";
import NotFound from "../NotFound/NotFound";

function App() {

  return (

    <div className="app">

      <SideBar />

      <Header />

      <Switch>

        <Route path='/box-registration' exact>
          <BoxRegistration />
        </Route>

        <Route path='/tracking' exact>
          <Tracking />
        </Route>

        <Route path='/catalog' exact>
          <Catalog />
        </Route>

        <Route path='/users' exact>
          <Users />
        </Route>

        <Switch>
          <Route exact path="/404" component={NotFound} />
          <Redirect from='*' to='/404' />
        </Switch>

      </Switch>

    </div>

  );
}

export default App;
