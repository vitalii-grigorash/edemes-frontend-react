import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from "../../utils/ProtectedRoute";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import BoxRegistration from "../BoxRegistration/BoxRegistration";
import Tracking from "../Tracking/Tracking";
import Catalog from "../Catalog/Catalog";
import Users from "../Users/Users";
import CatalogPopup from "../CatalogPopup/CatalogPopup";
import NotFound from "../NotFound/NotFound";
import CatalogsData from '../../utils/CatalogsData.json';
import Fixation from "../Fixation/Fixation";
import FixationHistory from "../FixationHistory/FixationHistory";
import Auth from "../Auth/Auth";

function App() {

  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isCatalogPopupOpen, setCatalogPopupOpen] = useState(false);
  const [role, setRole] = useState('');
  const [isMobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const [mobileHeaderNavText, setMobileHeaderNavText] = useState('');

  function handleMobileHeaderNavText(text) {
    setMobileHeaderNavText(text);
  }

  function handleOpenMobileSideBar() {
    if (isMobileSideBarOpen) {
      setMobileSideBarOpen(false);
    } else {
      setMobileSideBarOpen(true);
    }
  }

  function login(authAs) {
    setLoggedIn(true);
    if (authAs === 'Администратор') {
      // history.push('/box-registration');
      setRole(authAs);
    }
    if (authAs === 'Оператор') {
      // history.push('/fixation');
      setRole(authAs);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      const auth = localStorage.getItem('auth');
      const credentials = JSON.parse(auth);
      login(credentials.authAs);
    }
  });

  function handleLogin(email, password, authAs) {
    const credentials = {
      email: email,
      password: password,
      authAs: authAs
    }
    localStorage.setItem('auth', JSON.stringify(credentials));
    login(authAs);
  }

  function logout() {
    localStorage.removeItem('auth');
    setLoggedIn(false);
    history.push('/auth')
    setRole('');
  }

  function handleOpenCatalogPopupClick() {
    if (isCatalogPopupOpen) {
      setCatalogPopupOpen(false);
    } else {
      setCatalogPopupOpen(true);
    }
  }

  return (

    <div className="app">

      {isLoggedIn && (
        <>
          <SideBar
            role={role}
            isMobileSideBarOpen={isMobileSideBarOpen}
            onCloseMobileSideBar={handleOpenMobileSideBar}
            logout={logout}
          />

          <Header
            logout={logout}
            role={role}
            onOpenMobileSideBar={handleOpenMobileSideBar}
            mobileHeaderNavText={mobileHeaderNavText}
          />
        </>
      )}

      <Switch>

        <ProtectedRoute exact path="/box-registration"
          isLoggedIn={isLoggedIn}
          component={BoxRegistration}
          handleMobileHeaderNavText={handleMobileHeaderNavText}
        />

        <ProtectedRoute exact path="/tracking"
          isLoggedIn={isLoggedIn}
          component={Tracking}
          handleMobileHeaderNavText={handleMobileHeaderNavText}
        />

        <ProtectedRoute exact path="/catalog"
          isLoggedIn={isLoggedIn}
          component={Catalog}
          catalogsData={CatalogsData}
          handleOpenCatalogPopupClick={handleOpenCatalogPopupClick}
          handleMobileHeaderNavText={handleMobileHeaderNavText}
        />

        <ProtectedRoute exact path="/users"
          isLoggedIn={isLoggedIn}
          component={Users}
          handleMobileHeaderNavText={handleMobileHeaderNavText}
        />

        <ProtectedRoute exact path="/fixation"
          isLoggedIn={isLoggedIn}
          component={Fixation}
          handleMobileHeaderNavText={handleMobileHeaderNavText}
        />

        <ProtectedRoute exact path="/fixation-history"
          isLoggedIn={isLoggedIn}
          component={FixationHistory}
          handleMobileHeaderNavText={handleMobileHeaderNavText}
        />

        <Route path='/auth'>
          <Auth
            onLogin={handleLogin}
          />
        </Route>

        <Route>
          {!isLoggedIn && <Redirect from='/' to='/auth' />}
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
