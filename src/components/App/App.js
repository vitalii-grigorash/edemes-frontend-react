import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import BoxRegistration from "../BoxRegistration/BoxRegistration";
import Tracking from "../Tracking/Tracking";
import Catalog from "../Catalog/Catalog";
import Users from "../Users/Users";
import CatalogPopup from "../CatalogPopup/CatalogPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import QrCodePopup from "../QrCodePopup/QrCodePopup";
// import NotFound from "../NotFound/NotFound";
import Fixation from "../Fixation/Fixation";
import FixationHistory from "../FixationHistory/FixationHistory";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Validation } from '../../utils/Validation';
import * as Auth from "../../Api/Auth";
import * as Catalogs from "../../Api/Catalogs";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Profile from "../Profile/Profile";

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
  const [isQrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState({});
  const [fixationHash, setFixationHash] = useState('');
  const [isBoxRegistrationReload, setBoxRegistrationReload] = useState(false);
  const [isTrackingReload, setTrackingReload] = useState(false);
  const [isUsersReload, setUsersReload] = useState(false);
  const [isFixationReload, setFixationReload] = useState(false);
  const [isFixationHistoryReload, setFixationHistoryReload] = useState(false);
  const [isProfileReload, setProfileReload] = useState(false);

  function printQr(qrCode) {
    var imgHtml = "<img style='padding:50px 50px;display:block;margin-left:auto;margin-right:auto;width:300px;height:auto;' src='" + qrCode + "'></img>";
    var WindowObject = window.open('', 'PrintWindow', 'width=1200,height=800,top=150,left=150,toolbars=no,scrollbars=yes,status=no,resizable=yes');
    var strHtml = "<html>\n<head>\n <link rel=\"stylesheet\" type=\"text/css\" href=\"test.css\">\n</head><body onload='window.print();window.close()'><div style=\"testStyle\">\n" + imgHtml + "\n</div>\n</body>\n</html>";
    WindowObject.document.writeln(strHtml);
    WindowObject.document.close();
    WindowObject.focus();
  }

  function openQrCodeModal(data) {
    setQrCodeData(data);
    setQrCodeModalOpen(true);
  }

  function closeQrCodeModal() {
    setQrCodeModalOpen(false);
  }

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

  function boxReagistrationRealoadCancel() {
    setBoxRegistrationReload(false);
  }

  function trackingRealoadCancel() {
    setTrackingReload(false);
  }

  function usersRealoadCancel() {
    setUsersReload(false);
  }

  function fixationRealoadCancel() {
    setFixationReload(false);
  }

  function fixationHistoryRealoadCancel() {
    setFixationHistoryReload(false);
  }

  function profileRealoadCancel() {
    setProfileReload(false);
  }

  function handleOpenMobileSideBar(selectedPathname) {
    if (selectedPathname !== '') {
      if (selectedPathname === '/box-registration') {
        setBoxRegistrationReload(true);
        setCardActive(true);
        setTableActive(false);
        setCatalogsActive(true);
        setArtObjectsActive(false);
        setSelectedArtObjectsActive(false);
        setArtObjectInfoOpen(false);
      } else if (selectedPathname === '/catalog') {
        setCardActive(true);
        setTableActive(false);
        setCatalogsActive(true);
        setArtObjectsActive(false);
        setSelectedArtObjectsActive(false);
        setArtObjectInfoOpen(false);
      } else if (selectedPathname === '/tracking') {
        setTrackingReload(true);
      } else if (selectedPathname === '/users') {
        setUsersReload(true);
      } else if (selectedPathname === '/fixation') {
        setFixationReload(true);
      } else if (selectedPathname === '/fixation-history') {
        setFixationHistoryReload(true);
      } else if (selectedPathname === '/profile') {
        setProfileReload(true);
      }
    }
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
    setCurrentUser({});
    history.push('/login');
  }

  function login(user) {
    if (user.isAuth) {
      setLoggedIn(true);
      createUserName(user);
      setAuthError('');
      setAuthValidate(true);
      setCurrentUser(user);
      if (pathname !== '/profile') {
        if (user.role === "Администратор") {
          history.push('/box-registration');
        }
        if (user.role === "Оператор") {
          history.push(`${fixationHash ? `/fixation/${fixationHash}` : '/fixation'}`);
        }
      }
    } else {
      logout();
    }
  }

  function removeFixationHash() {
    setFixationHash('');
  }

  useEffect(() => {
    const url = window.location.href.split('/');
    if (url[4]) {
      setFixationHash(`${url[4]}`);
    }
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);
      if (user.isAuth) {
        setLoggedIn(true);
        createUserName(user);
        setAuthError('');
        setAuthValidate(true);
        setCurrentUser(user);
        if (`/${url[3]}` === '/') {
          if (user.role === "Администратор") {
            history.push('/box-registration');
          } else if (user.role === "Оператор") {
            history.push('/fixation');
          }
        }
      } else {
        logout();
      }
    } else {
      logout();
    }
    // eslint-disable-next-line
  }, []);

  function handleLogin(email, password) {
    Auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        login(res.user);
      })
      .catch((err) => {
        console.log(err);
        setAuthError(err.message);
        if (err.message === 'Неправильная почта или пароль') {
          setAuthValidate(false);
        }
      })
  }

  function handleOpenSuccessPopupClick() {
    if (isSuccessPopupOpen) {
      setSuccessPopupOpen(false);
    } else {
      setSuccessPopupOpen(true);
    }
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
        handleOpenSuccessPopupClick();
      })
      .catch((err) => {
        setAddNewUserError(err.message);
      })
  }

  function editUser(userData) {
    Auth.editUser(userData)
      .then((res) => {
        localStorage.removeItem('user');
        setCurrentUser(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));
        login(res.user);
        handleOpenSuccessPopupClick();
      })
      .catch((err) => {
        console.log(err);
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

    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">

        {isLoggedIn && (
          <>
            <SideBar
              logout={logout}
              onCloseMobileSideBar={handleOpenMobileSideBar}
              isMobileSideBarOpen={isMobileSideBarOpen}
              userName={userName}
              fixationHash={fixationHash}
              removeFixationHash={removeFixationHash}
            />

            <Header
              logout={logout}
              onOpenMobileSideBar={handleOpenMobileSideBar}
              mobileHeaderNavText={mobileHeaderNavText}
              userName={userName}
              removeFixationHash={removeFixationHash}
            />
          </>
        )}

        <Switch>

          {isLoggedIn && (
            <Route exact path="/box-registration">
              <BoxRegistration
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
                openQrCodeModal={openQrCodeModal}
                boxReagistrationRealoadCancel={boxReagistrationRealoadCancel}
                isBoxRegistrationReload={isBoxRegistrationReload}
              />
            </Route>
          )}

          {isLoggedIn && (
            <Route exact path="/tracking">
              <Tracking
                handleMobileHeaderNavText={handleMobileHeaderNavText}
                printQr={printQr}
                trackingRealoadCancel={trackingRealoadCancel}
                isTrackingReload={isTrackingReload}
              />
            </Route>
          )}

          {isLoggedIn && (
            <Route exact path="/catalog">
              <Catalog
                getCatalogs={getCatalogs}
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
            </Route>
          )}

          {isLoggedIn && (
            <Route exact path="/users">
              <Users
                handleMobileHeaderNavText={handleMobileHeaderNavText}
                addUser={addUser}
                addNewUserError={addNewUserError}
                isUsersReload={isUsersReload}
                usersRealoadCancel={usersRealoadCancel}
              />
            </Route>
          )}

          {isLoggedIn && (
            <Route exact path="/profile">
              <Profile
                handleMobileHeaderNavText={handleMobileHeaderNavText}
                editUser={editUser}
                isProfileReload={isProfileReload}
                profileRealoadCancel={profileRealoadCancel}
              />
            </Route>
          )}

          {isLoggedIn && (
            <Route path="/fixation">
              <Fixation
                handleMobileHeaderNavText={handleMobileHeaderNavText}
                fixationHash={fixationHash}
                printQr={printQr}
                isFixationReload={isFixationReload}
                fixationRealoadCancel={fixationRealoadCancel}
              />
            </Route>
          )}

          {isLoggedIn && (
            <Route exact path="/fixation-history">
              <FixationHistory
                handleMobileHeaderNavText={handleMobileHeaderNavText}
                printQr={printQr}
                isFixationHistoryReload={isFixationHistoryReload}
                fixationHistoryRealoadCancel={fixationHistoryRealoadCancel}
              />
            </Route>
          )}

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

          {/* <Switch>
            <Route exact path="/404" component={NotFound} />
            <Redirect from='*' to='/404' />
          </Switch> */}

        </Switch>

        {pathname === "/catalog" && (
          <CatalogPopup
            isOpen={isCatalogPopupOpen}
            onClosePopupClick={handleOpenCatalogPopupClick}
            catalogs={catalogs}
            getCatalogs={getCatalogs}
          />
        )}

        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClosePopupClick={handleOpenSuccessPopupClick}
        />

        {pathname === "/box-registration" && isQrCodeModalOpen && (
          <QrCodePopup
            isOpen={isQrCodeModalOpen}
            onClosePopupClick={closeQrCodeModal}
            data={qrCodeData}
            printQr={printQr}
          />
        )}

      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
