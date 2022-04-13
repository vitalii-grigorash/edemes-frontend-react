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
import Login from "../Login/Login";
import Register from "../Register/Register";
import * as Api from "../../Api/Api";

function App() {

  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isCatalogPopupOpen, setCatalogPopupOpen] = useState(false);
  const [role, setRole] = useState('');
  const [isMobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const [mobileHeaderNavText, setMobileHeaderNavText] = useState('');
  const [userName, setUserName] = useState('');
  const [authError, setAuthError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isAuthValidate, setAuthValidate] = useState(true);

  const userDefaultName = {
    lastName: "Неизвестный",
    firstName: "Пользователь"
  }

  function createUserName(user) {
    const firstName = function () {
      if (user.firstName === "") {
        return `${userDefaultName.firstName.charAt(0)}`;
      } else {
        return `${user.firstName.charAt(0)}`;
      }
    }
    const lastName = function () {
      if (user.lastName === "") {
        return userDefaultName.lastName
      } else {
        return user.lastName;
      }
    }
    const middleName = function () {
      if (user.middleName === "") {
        return ""
      } else {
        return `${user.middleName.charAt(0)}.`;
      }
    };
    const shortName = `${lastName()} ${firstName()}.${middleName()}`;
    setUserName(shortName);
  }

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

  function logout() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    setLoggedIn(false);
    history.push('/login')
    setRole('');
  }

  function login(user) {
    if (user.isAuth) {
      setRole(user.role);
      setLoggedIn(true);
      createUserName(user);
      setAuthError('');
      setAuthValidate(true);
    } else {
      logout();
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);
      login(user);
    }
    // eslint-disable-next-line
  }, [history]);

  function handleLogin(email, password) {
    Api.authorize(email, password)
      .then((data) => {
        const user = {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          middleName: data.user.middleName,
          isAuth: data.user.isAuth
        }
        localStorage.setItem('user', JSON.stringify(user));
        login(user);
      })
      .catch((err) => {
        setAuthError(err.message);
        if (err.message === 'Неправильная почта или пароль') {
          setAuthValidate(false);
        }
      })
  }

  function handleRegister(registerData) {
    Api.registration(registerData)
      .then(() => {
        setRegisterError('');
        history.push('/login');
      })
      .catch((err) => {
        setRegisterError(err.message);
      })
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
            logout={logout}
            role={role}
            onCloseMobileSideBar={handleOpenMobileSideBar}
            isMobileSideBarOpen={isMobileSideBarOpen}
            userName={userName}
          />

          <Header
            logout={logout}
            role={role}
            onOpenMobileSideBar={handleOpenMobileSideBar}
            mobileHeaderNavText={mobileHeaderNavText}
            userName={userName}
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

        <Route path='/register'>
          <Register
            onRegister={handleRegister}
            authError={registerError}
          />
        </Route>

        <Route path='/login'>
          <Login
            onLogin={handleLogin}
            authError={authError}
            isValidate={isAuthValidate}
          />
        </Route>

        <Route>
          {!isLoggedIn && <Redirect from='/' to='/login' />}
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
