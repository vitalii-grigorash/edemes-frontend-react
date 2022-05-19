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
import { Validation } from '../../utils/Validation';
import * as Auth from "../../Api/Auth";
import * as Catalogs from "../../Api/Catalogs";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const searchInputCatalogs = Validation();
  const searchInputArtObjects = Validation();
  const searchInputSelectedArtObjects = Validation();

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
  const [isCardActive, setCardActive] = useState(true);
  const [isTableActive, setTableActive] = useState(false);
  const [isArtObjectInfoOpen, setArtObjectInfoOpen] = useState(false);
  const [artObject, setArtObject] = useState({});
  const [catalogs, setCatalogs] = useState([]);
  const [artObjects, setArtObjects] = useState([]);
  const [selectedArtObjects, setSelectedArtObjects] = useState([]);
  const [catalogsForRender, setCatalogsForRender] = useState([]);
  const [artObjectsForRender, setArtObjectsForRender] = useState([]);
  const [selectedArtObjectsForRender, setSelectedArtObjectsForRender] = useState([]);
  const [isCatalogsActive, setCatalogsActive] = useState(true);
  const [isArtObjectsActive, setArtObjectsActive] = useState(false);
  const [isSelectedArtObjectsActive, setSelectedArtObjectsActive] = useState(false);
  const [boxRegistrationCatalogsInput, setBoxRegistrationCatalogsInput] = useState('');
  const [boxRegistrationArtObjectsInput, setBoxRegistrationArtObjectsInput] = useState('');
  const [boxRegistrationSelectedArtObjectsInput, setBoxRegistrationSelectedArtObjectsInput] = useState('');

  useEffect(() => {
    if (pathname === '/box-registration' || pathname === '/catalog') {
      setCardActive(true);
      setTableActive(false);
      setArtObjectInfoOpen(false);
      setCatalogsActive(true);
      setArtObjectsActive(false);
      setSelectedArtObjectsActive(false);
      searchInputCatalogs.setValue('');
      searchInputArtObjects.setValue('');
      searchInputSelectedArtObjects.setValue('');
    }
    // eslint-disable-next-line
  }, [pathname]);

  function boxRegistrationSearchInput(value) {
    if (isCatalogsActive) {
      setBoxRegistrationCatalogsInput(value);
    } else if (isArtObjectsActive) {
      setBoxRegistrationArtObjectsInput(value);
    } else if (isSelectedArtObjectsActive) {
      setBoxRegistrationSelectedArtObjectsInput(value);
    }
  }

  useEffect(() => {
    if (isCatalogsActive) {
      if (boxRegistrationCatalogsInput === '') {
        setCatalogsForRender(catalogs);
      } else {
        const dataForRender = [];
        catalogs.forEach((catalog) => {
          if (catalog.name.toLowerCase().includes(boxRegistrationCatalogsInput.toLowerCase())) {
            dataForRender.push(catalog);
          }
        })
        setCatalogsForRender(dataForRender);
      }
    } else if (isArtObjectsActive) {
      if (boxRegistrationArtObjectsInput === '') {
        setArtObjectsForRender(artObjects);
      } else {
        const dataForRender = [];
        artObjects.forEach((artObject) => {
          if (artObject.name.toLowerCase().includes(boxRegistrationArtObjectsInput.toLowerCase())) {
            dataForRender.push(artObject);
          }
        })
        setArtObjectsForRender(dataForRender);
      }
    } else if (isSelectedArtObjectsActive) {
      if (boxRegistrationSelectedArtObjectsInput === '') {
        setSelectedArtObjectsForRender(selectedArtObjects);
      } else {
        const dataForRender = [];
        selectedArtObjects.forEach((selectedArtObject) => {
          if (selectedArtObject.name.toLowerCase().includes(boxRegistrationSelectedArtObjectsInput.toLowerCase())) {
            dataForRender.push(selectedArtObject);
          }
        })
        setSelectedArtObjectsForRender(dataForRender);
      }
    }
  },
    [
      catalogs,
      isCatalogsActive,
      boxRegistrationCatalogsInput,
      artObjects,
      isArtObjectsActive,
      boxRegistrationArtObjectsInput,
      selectedArtObjects,
      isSelectedArtObjectsActive,
      boxRegistrationSelectedArtObjectsInput
    ]
  );

  function onShowAddedArtObjectsClick() {
    setArtObjectsActive(false);
    setCatalogsActive(false);
    searchInputSelectedArtObjects.setValue('');
    setSelectedArtObjectsActive(true);
  }

  function handleArtObjectsActive() {
    searchInputArtObjects.setValue('');
    setArtObjectsActive(true);
    setCatalogsActive(false);
  }

  function showArtObjectInfo(artObject) {
    setArtObjectsActive(false);
    setCatalogsActive(false);
    setArtObjectInfoOpen(true);
    setArtObject(artObject);
  }

  function catalogsBackClick() {
    setArtObjectsActive(false);
    setSelectedArtObjectsActive(false);
    setCatalogsActive(true);
  }

  function artObjectsBackClick() {
    setArtObjectInfoOpen(false);
    setArtObjectsActive(true);
  }

  const userDefaultName = {
    lastName: "Неизвестный",
    firstName: "Пользователь"
  }

  function handleCardActive() {
    setTableActive(false);
    setCardActive(true);
  }

  function handleTableActive() {
    setCardActive(false);
    setTableActive(true);
  }

  function resetSelectedArtObjects() {
    setSelectedArtObjects([]);
  }

  function getCatalogs() {
    Catalogs.getAllCatalogs()
      .then((data) => {
        setCatalogs(data.catalogs);
      })
      .catch((err) => console.log(`Ошибка при загрузке каталогов: ${err}`));
  }

  function onSelectCatalogClick(card) {
    Catalogs.getCatalog(card.id)
      .then((data) => {
        const filteredItems = selectedArtObjects.filter(selectedArtObject => data.artObjects.find(artObject => artObject.id === selectedArtObject.id))
        const filter = data.artObjects.filter(artObject => filteredItems.every(filteredItem => filteredItem.id !== artObject.id));
        if (filter.length === 0) {
          data.artObjects.forEach(artObject => setSelectedArtObjects(selectedArtObjects => [...selectedArtObjects, artObject]));
        } else {
          filter.forEach(item => setSelectedArtObjects(selectedArtObjects => [...selectedArtObjects, item]));
        }
      })
      .catch((err) => console.log(`Ошибка при загрузке каталога: ${err}`));
  }

  function onDeselectCatalogClick(card) {
    Catalogs.getCatalog(card.id)
      .then((data) => {
        const filteredItems = selectedArtObjects.filter(selectedArtObject => !data.artObjects.find(artObject => artObject.id === selectedArtObject.id))
        setSelectedArtObjects(filteredItems);
      })
      .catch((err) => console.log(`Ошибка при загрузке каталога: ${err}`));
  }

  function onOpenCatalogClick(id) {
    Catalogs.getCatalog(id)
      .then((data) => {
        setArtObjects(data.artObjects);
      })
      .catch((err) => console.log(`Ошибка при загрузке экспонатов: ${err}`));
  }

  function onSelectArtObjectClick(artObject) {
    setSelectedArtObjects(selectedArtObjects => [...selectedArtObjects, artObject]);
  }

  function onDeselectArtObjectClick(artObject) {
    const filteredItems = selectedArtObjects.filter(selectedArtObject => selectedArtObject.id !== artObject.id);
    setSelectedArtObjects(filteredItems);
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
            catalogsForRender={catalogsForRender}
            onSelectCatalogClick={onSelectCatalogClick}
            onDeselectCatalogClick={onDeselectCatalogClick}
            selectedArtObjects={selectedArtObjects}
            selectedArtObjectsForRender={selectedArtObjectsForRender}
            onOpenCatalogClick={onOpenCatalogClick}
            artObjectsForRender={artObjectsForRender}
            onSelectArtObjectClick={onSelectArtObjectClick}
            onDeselectArtObjectClick={onDeselectArtObjectClick}
            resetSelectedArtObjects={resetSelectedArtObjects}
            handleCardActive={handleCardActive}
            handleTableActive={handleTableActive}
            isCardActive={isCardActive}
            isTableActive={isTableActive}
            boxRegistrationSearchInput={boxRegistrationSearchInput}
            onShowAddedArtObjectsClick={onShowAddedArtObjectsClick}
            handleArtObjectsActive={handleArtObjectsActive}
            showArtObjectInfo={showArtObjectInfo}
            catalogsBackClick={catalogsBackClick}
            artObjectsBackClick={artObjectsBackClick}
            isCatalogsActive={isCatalogsActive}
            isArtObjectsActive={isArtObjectsActive}
            isArtObjectInfoOpen={isArtObjectInfoOpen}
            artObject={artObject}
            isSelectedArtObjectsActive={isSelectedArtObjectsActive}
            searchInputCatalogs={searchInputCatalogs}
            searchInputArtObjects={searchInputArtObjects}
            searchInputSelectedArtObjects={searchInputSelectedArtObjects}
          />

          <ProtectedRoute exact path="/tracking"
            isLoggedIn={isLoggedIn}
            component={Tracking}
            handleMobileHeaderNavText={handleMobileHeaderNavText}
          />

          <ProtectedRoute exact path="/catalog"
            isLoggedIn={isLoggedIn}
            component={Catalog}
            handleOpenCatalogPopupClick={handleOpenCatalogPopupClick}
            handleMobileHeaderNavText={handleMobileHeaderNavText}
            catalogsForRender={catalogsForRender}
            onSelectCatalogClick={onSelectCatalogClick}
            onDeselectCatalogClick={onDeselectCatalogClick}
            selectedArtObjects={selectedArtObjects}
            selectedArtObjectsForRender={selectedArtObjectsForRender}
            onOpenCatalogClick={onOpenCatalogClick}
            artObjectsForRender={artObjectsForRender}
            onSelectArtObjectClick={onSelectArtObjectClick}
            onDeselectArtObjectClick={onDeselectArtObjectClick}
            handleArtObjectsActive={handleArtObjectsActive}
            isCatalogsActive={isCatalogsActive}
            isArtObjectsActive={isArtObjectsActive}
            showArtObjectInfo={showArtObjectInfo}
            isArtObjectInfoOpen={isArtObjectInfoOpen}
            artObject={artObject}
            onShowAddedArtObjectsClick={onShowAddedArtObjectsClick}
            isSelectedArtObjectsActive={isSelectedArtObjectsActive}
            isCardActive={isCardActive}
            handleCardActive={handleCardActive}
            isTableActive={isTableActive}
            handleTableActive={handleTableActive}
            boxRegistrationSearchInput={boxRegistrationSearchInput}
            searchInputCatalogs={searchInputCatalogs}
            searchInputArtObjects={searchInputArtObjects}
            searchInputSelectedArtObjects={searchInputSelectedArtObjects}
            catalogsBackClick={catalogsBackClick}
            artObjectsBackClick={artObjectsBackClick}
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
