import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from "../../utils/ProtectedRoute";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import BoxRegistration from "../BoxRegistration/BoxRegistration";
import Tracking from "../Tracking/Tracking";
import Catalog from "../Catalog/Catalog";
import Users from "../Users/Users";
import CatalogPopup from "../CatalogPopup/CatalogPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import NotFound from "../NotFound/NotFound";
import Fixation from "../Fixation/Fixation";
import FixationHistory from "../FixationHistory/FixationHistory";
import Login from "../Login/Login";
import Register from "../Register/Register";
import * as Auth from "../../Api/Auth";
import * as Catalogs from "../../Api/Catalogs";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const history = useHistory();
  const { pathname } = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isCatalogPopupOpen, setCatalogPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isMobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const [mobileHeaderNavText, setMobileHeaderNavText] = useState('');
  const [userName, setUserName] = useState('');
  const [authError, setAuthError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [addNewUserError, setAddNewUserError] = useState('');
  const [isAuthValidate, setAuthValidate] = useState(true);
  const [catalogs, setCatalogs] = useState([]);

  const userDefaultName = {
    lastName: "Неизвестный",
    firstName: "Пользователь"
  }

  function getCatalogs() {
    Catalogs.getAllCatalogs()
      .then((data) => {
        setCatalogs(data.catalogs);
      })
      .catch((err) => console.log(`Ошибка при загрузке каталогов: ${err}`));
  }

  function onSelectCatalogClick(id) {
    Catalogs.getCatalog(id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(`Ошибка при загрузке каталога: ${err}`));
  }

  // function onCancelSelectCatalogClick() {

  // }

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
    history.push('/login');
  }

  function login(user) {
    if (user.isAuth) {
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
      setCurrentUser(user);
      login(user);
    }
    // eslint-disable-next-line
  }, [history]);

  function handleLogin(email, password) {
    Auth.authorize(email, password)
      .then((res) => {
        setCurrentUser(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));
        login(res.user);
      })
      .catch((err) => {
        setAuthError(err.message);
        if (err.message === 'Неправильная почта или пароль') {
          setAuthValidate(false);
        }
      })
  }

  function handleRegister(registerData) {
    Auth.registration(registerData)
      .then(() => {
        setRegisterError('');
        handleOpenSuccessPopupClick();
      })
      .catch((err) => {
        setRegisterError(err.message);
      })
  }

  function addUser(newUser) {
    console.log(newUser);
    Auth.addNewUser(newUser)
      .then(() => {
        setAddNewUserError('');
        // Добавить Модалку подтверждения добавления нового пользователя
      })
      .catch((err) => {
        setAddNewUserError(err.message);
      })
  }

  function handleOpenCatalogPopupClick() {
    if (isCatalogPopupOpen) {
      setCatalogPopupOpen(false);
    } else {
      setCatalogPopupOpen(true);
    }
  }

  function handleOpenSuccessPopupClick() {
    if (isSuccessPopupOpen) {
      setSuccessPopupOpen(false);
    } else {
      setSuccessPopupOpen(true);
    }
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">

        {isLoggedIn && (
          <>
            <SideBar
              logout={logout}
              onCloseMobileSideBar={handleOpenMobileSideBar}
              isMobileSideBarOpen={isMobileSideBarOpen}
              userName={userName}
            />

            <Header
              logout={logout}
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
            getCatalogs={getCatalogs}
            catalogs={catalogs}
            onSelectCatalogClick={onSelectCatalogClick}
          />

          <ProtectedRoute exact path="/tracking"
            isLoggedIn={isLoggedIn}
            component={Tracking}
            handleMobileHeaderNavText={handleMobileHeaderNavText}
          />

          <ProtectedRoute exact path="/catalog"
            getCatalogs={getCatalogs}
            catalogs={catalogs}
            isLoggedIn={isLoggedIn}
            component={Catalog}
            handleOpenCatalogPopupClick={handleOpenCatalogPopupClick}
            handleMobileHeaderNavText={handleMobileHeaderNavText}
          />

          <ProtectedRoute exact path="/users"
            isLoggedIn={isLoggedIn}
            component={Users}
            handleMobileHeaderNavText={handleMobileHeaderNavText}
            addUser={addUser}
            addNewUserError={addNewUserError}
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

        {pathname === "/catalog" && (
          <CatalogPopup
            isOpen={isCatalogPopupOpen}
            onClosePopupClick={handleOpenCatalogPopupClick}
            catalogs={catalogs}
            getCatalogs={getCatalogs}
          />
        )}

        {pathname === "/register" && (
          <SuccessPopup
            isOpen={isSuccessPopupOpen}
            onClosePopupClick={handleOpenSuccessPopupClick}
          />
        )}

      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
