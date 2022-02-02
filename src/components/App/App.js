import React, { useState } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import BoxRegistration from "../BoxRegistration/BoxRegistration";
import Tracking from "../Tracking/Tracking";
import Catalog from "../Catalog/Catalog";
import Users from "../Users/Users";
import CatalogPopup from "../CatalogPopup/CatalogPopup";
import NotFound from "../NotFound/NotFound";
import CatalogsData from '../../utils/CatalogsData.json';

function App() {

  const [isCatalogPopupOpen, setCatalogPopupOpen] = useState(false);

  function handleOpenCatalogPopupClick() {
    if (isCatalogPopupOpen) {
      setCatalogPopupOpen(false);
    } else {
      setCatalogPopupOpen(true);
    }
  }

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
          <Catalog
            catalogsData={CatalogsData}
            handleOpenCatalogPopupClick={handleOpenCatalogPopupClick}
          />
        </Route>

        <Route path='/users' exact>
          <Users />
        </Route>

        <Switch>
          <Route exact path="/404" component={NotFound} />
          <Redirect from='*' to='/404' />
        </Switch>

      </Switch>

      <CatalogPopup
        catalogsData={CatalogsData}
        isOpen={isCatalogPopupOpen}
        onClosePopupClick={handleOpenCatalogPopupClick}
      />

    </div>

  );
}

export default App;
