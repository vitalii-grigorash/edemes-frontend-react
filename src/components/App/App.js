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
  const [role, setRole] = useState('');
  const [isMobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const [mobileHeaderNavText, setMobileHeaderNavText] = useState('');
  const [userName, setUserName] = useState('');
  const [authError, setAuthError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [addNewUserError, setAddNewUserError] = useState('');
  const [isAuthValidate, setAuthValidate] = useState(true);
  const [catalogs, setCatalogs] = useState([]);
  const [userCompanyId, setUserCompanyId] = useState('');

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

  function createUserName() {
    const firstName = function () {
      if (currentUser.firstName === "") {
        return `${userDefaultName.firstName.charAt(0)}`;
      } else {
        return `${currentUser.firstName.charAt(0)}`;
      }
    }
    const lastName = function () {
      if (currentUser.lastName === "") {
        return userDefaultName.lastName
      } else {
        return currentUser.lastName;
      }
    }
    const middleName = function () {
      if (currentUser.middleName === "") {
        return ""
      } else {
        return `${currentUser.middleName.charAt(0)}.`;
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
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
    }
    setLoggedIn(false);
    history.push('/login')
    setRole('');
  }

  function login() {
    setRole(currentUser.role);
    setUserCompanyId(currentUser.userCompanyInfo.id);
    setLoggedIn(true);
    createUserName();
    setAuthError('');
    setAuthValidate(true);
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      Auth.getUser(jwt)
        .then((res) => {
          console.log(res);
          setCurrentUser(res.user);
          login();
        })
        .catch(err => console.log(err));
    }
    // eslint-disable-next-line
  }, [history]);

  function handleLogin(email, password) {
    Auth.authorize(email, password)
      .then((res) => {
        if (res.tokens.accessToken) {
          Auth.getUser(res.tokens.accessToken)
            .then((res) => {
              console.log(res);
              setCurrentUser(res.user);
              login();
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
        }
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
            userCompanyId={userCompanyId}
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
