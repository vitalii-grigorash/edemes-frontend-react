import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { YMaps, Map, GeoObject } from 'react-yandex-maps';
import { Validation } from '../../utils/Validation';
import * as BoxRegistrationApi from '../../Api/BoxRegistrationApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Cards from '../Cards/Cards';

function BoxRegistration(props) {

    const {
        handleMobileHeaderNavText,
        getCatalogs,
        catalogsForRender,
        onSelectCatalogClick,
        onDeselectCatalogClick,
        selectedArtObjects,
        selectedArtObjectsForRender,
        onOpenCatalogClick,
        artObjectsForRender,
        onSelectArtObjectClick,
        onDeselectArtObjectClick,
        resetSelectedArtObjects,
        handleCardActive,
        handleTableActive,
        isCardActive,
        isTableActive,
        boxRegistrationSearchInput,
        onShowAddedArtObjectsClick,
        handleArtObjectsActive,
        showArtObjectInfo,
        catalogsBackClick,
        artObjectsBackClick,
        isCatalogsActive,
        isArtObjectsActive,
        isArtObjectInfoOpen,
        artObject,
        isSelectedArtObjectsActive,
        searchInputCatalogs,
        searchInputArtObjects,
        searchInputSelectedArtObjects,
        openQrCodeModal,
        boxReagistrationRealoadCancel,
        isBoxRegistrationReload
    } = props;

    const currentUser = React.useContext(CurrentUserContext);
    const history = useHistory();
    const { pathname } = useLocation();
    const [isBoxRegistrationGeneralInformationActive, setBoxRegistrationGeneralInformationActive] = useState(false);
    const [isBoxRegistrationExhibitsActive, setBoxRegistrationExhibitsActive] = useState(false);
    const [isBoxRegistrationRouteActive, setBoxRegistrationRouteActive] = useState(true);
    const [locations, setLocations] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [companyLocations, setCompanyLocations] = useState([]);
    const [isSelectRouteFromActive, setSelectRouteFromActive] = useState(false);
    const [isRouteFromSelected, setRouteFromSelected] = useState(false);
    const [selectedRouteFrom, setSelectedRouteFrom] = useState('???????????????? ??????????');
    const [locationIdFrom, setLocationIdFrom] = useState('');
    const [coordinatesFrom, setCoordinatesFrom] = useState({});
    const [isSelectRouteToActive, setSelectRouteToActive] = useState(false);
    const [isRouteToSelected, setRouteToSelected] = useState(false);
    const [selectedRouteTo, setSelectedRouteTo] = useState('???????????????? ????????????????');
    const [companyIdTo, setCompanyIdTo] = useState('');
    const [isSelectAddressActive, setSelectAddressActive] = useState(false);
    const [isAddressSelected, setAddressSelected] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('???????????????? ??????????');
    const [locationIdTo, setLocationIdTo] = useState('');
    const [coordinatesTo, setCoordinatesTo] = useState({});
    const [recipientCompanyName, setRecipientCompanyName] = useState('');
    const [totalArtObjectsPrice, setTotalArtObjectsPrice] = useState('');
    const [isConditionsActive, setConditionsActive] = useState(false);
    const [condition, setCondition] = useState('???????????????? ??????????????');
    const [isConditionSelected, setConditionSelected] = useState(false);
    const [isMapWithCoordinatesActive, setMapWithCoordinatesActive] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [registerError, setRegisterError] = useState('');

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            if (isBoxRegistrationReload) {
                setBoxRegistrationRouteActive(true);
                setBoxRegistrationGeneralInformationActive(false);
                setBoxRegistrationExhibitsActive(false);
                setConditionsActive(false);
                setSelectRouteFromActive(false);
                setSelectRouteToActive(false);
                setSelectAddressActive(false);
                boxReagistrationRealoadCancel();
            }
        }
    }, [isBoxRegistrationReload, currentUser.role, boxReagistrationRealoadCancel])

    useEffect(() => {
        if (currentUser.role === '????????????????') {
            history.push('/fixation');
        }
    })

    const myGeoObject = {
        geometry: {
            type: "LineString",
            coordinates: [
                [`${coordinatesFrom.geoX}`, `${coordinatesFrom.geoY}`],
                [`${coordinatesTo.geoX}`, `${coordinatesTo.geoY}`]
            ]
        },
        options: {
            geodesic: true,
            strokeWidth: 5,
            strokeColor: "#336699",
        }
    }

    const specialConditionsList = [
        '?????? ???????????? ??????????????',
        '??????????????????, ??????????????',
        '???? ??????????????',
        '???? ????????????????????????????',
        '???????????? ???? ????????????',
        '?????????????????????? ????????????????'
    ]

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            getCatalogs();
        }
        // eslint-disable-next-line
    }, [currentUser.role])

    function handleShowConditions() {
        if (isConditionsActive) {
            setConditionsActive(false);
        } else {
            setConditionsActive(true);
        }
    }

    function onSelectSpecialConditionClick(condition) {
        if (condition === '?????? ???????????? ??????????????') {
            setCondition('???????????????? ??????????????');
            setConditionSelected(false);
        } else {
            setCondition(condition);
            setConditionSelected(true);
        }
    }

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            if (isRouteFromSelected && isAddressSelected) {
                setMapWithCoordinatesActive(true);
            }
        }
    }, [isAddressSelected, isRouteFromSelected, currentUser.role])

    const route = {
        locationIdFrom: locationIdFrom,
        companyIdTo: companyIdTo,
        locationIdTo: locationIdTo,
    }

    const boxName = Validation();
    const length = Validation();
    const width = Validation();
    const height = Validation();
    const weight = Validation();
    const humidity = Validation();
    const temperatureMin = Validation();
    const temperatureMax = Validation();

    const generalInformation = {
        name: boxName.value,
        height: height.value,
        width: width.value,
        depth: length.value,
        weight: weight.value,
        price: totalArtObjectsPrice,
        condition: `${condition !== '???????????????? ??????????????' ? condition : ''}`,
        humidity: humidity.value,
        temperature: {
            min: temperatureMin.value,
            max: temperatureMax.value
        }
    }

    function showLocations() {
        BoxRegistrationApi.getLocations()
            .then((locations) => {
                setLocations(locations.locations);
            })
            .catch((err) => console.log(`???????????? ?????? ???????????????? ??????????????????: ${err}`));
    }

    function showCompanies() {
        BoxRegistrationApi.getCompaniesWithLocations()
            .then((companies) => {
                setCompanies(companies.companiesList);
            })
            .catch((err) => console.log(`???????????? ?????? ???????????????? ??????????????????: ${err}`));
    }

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            if (pathname === '/box-registration') {
                showLocations();
                showCompanies();
            }
        }
    }, [pathname, currentUser.role]);

    function handleSelectRouteFrom() {
        if (isSelectRouteFromActive) {
            setSelectRouteFromActive(false);
        } else {
            setSelectRouteFromActive(true);
            setSelectRouteToActive(false);
            setSelectAddressActive(false);
        }
    }

    function onSelectRouteFromClick(location) {
        setRouteFromSelected(true);
        setSelectedRouteFrom(location.name);
        setLocationIdFrom(location.id);
        setCoordinatesFrom({
            geoX: location.geoX,
            geoY: location.geoY
        })
    }

    function handleSelectRouteTo() {
        if (isSelectRouteToActive) {
            setSelectRouteToActive(false);
        } else {
            setSelectRouteToActive(true);
            setSelectRouteFromActive(false);
            setSelectAddressActive(false);
        }
    }

    function onSelectRouteToClick(company) {
        setRouteToSelected(true);
        setSelectedRouteTo(company.name);
        setCompanyIdTo(company.id);
        setCompanyLocations(company.Locations);
        setRecipientCompanyName(company.name);
        setAddressSelected(false);
        setSelectedAddress('???????????????? ??????????');
        setLocationIdTo('');
    }

    function handleSelectAddress() {
        if (isSelectAddressActive) {
            setSelectAddressActive(false);
        } else {
            setSelectAddressActive(true);
            setSelectRouteToActive(false);
            setSelectRouteFromActive(false);
        }
    }

    function onSelectAddressClick(location) {
        setAddressSelected(true);
        setSelectedAddress(location.name);
        setLocationIdTo(location.id);
        setCoordinatesTo({
            geoX: location.geoX,
            geoY: location.geoY
        })
    }

    const mobileHeading = (() => {
        if (isBoxRegistrationGeneralInformationActive) {
            return '?????????? ????????????????????';
        } else if (isBoxRegistrationExhibitsActive) {
            return '??????????????????';
        } else if (isBoxRegistrationRouteActive) {
            return '??????????????';
        }
    })

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            handleMobileHeaderNavText('?????????????????????? ??????????');
        }
    }, [currentUser.role, handleMobileHeaderNavText]);

    function sumTotalPrice(allPrices) {
        let totalPrice = 0;
        for (let i = 0; i < allPrices.length; i++) {
            totalPrice += allPrices[i];
        }
        setTotalArtObjectsPrice(totalPrice);
    }

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            if (isBoxRegistrationGeneralInformationActive) {
                if (selectedArtObjects.length !== 0) {
                    const allPrices = selectedArtObjects.map((artObject) => {
                        return artObject.price;
                    })
                    sumTotalPrice(allPrices);
                } else {
                    setTotalArtObjectsPrice(0);
                }
            }
        }
    }, [isBoxRegistrationGeneralInformationActive, selectedArtObjects, currentUser.role])

    function onGeneralInformationTabClick() {
        setBoxRegistrationRouteActive(false);
        setBoxRegistrationExhibitsActive(false);
        setBoxRegistrationGeneralInformationActive(true);
    }

    function onExhibitsTabClick() {
        setBoxRegistrationRouteActive(false);
        setBoxRegistrationGeneralInformationActive(false);
        setBoxRegistrationExhibitsActive(true);
    }

    function onRouteTabClick() {
        setBoxRegistrationGeneralInformationActive(false);
        setBoxRegistrationExhibitsActive(false);
        setBoxRegistrationRouteActive(true);
    }

    function prevTabClick() {
        if (isBoxRegistrationGeneralInformationActive) {
            setBoxRegistrationGeneralInformationActive(false);
            setBoxRegistrationExhibitsActive(true);
        } else if (isBoxRegistrationExhibitsActive) {
            setBoxRegistrationExhibitsActive(false);
            setBoxRegistrationRouteActive(true);
        }
    }

    function nextTabClick() {
        if (isBoxRegistrationRouteActive) {
            setBoxRegistrationRouteActive(false);
            setBoxRegistrationExhibitsActive(true);
        } else if (isBoxRegistrationExhibitsActive) {
            setBoxRegistrationExhibitsActive(false);
            setBoxRegistrationGeneralInformationActive(true);
        }
    }

    function clearAllBoxRegistrationInputs() {
        boxName.setValue('');
        length.setValue('');
        width.setValue('');
        height.setValue('');
        weight.setValue('');
        humidity.setValue('');
        temperatureMin.setValue('');
        temperatureMax.setValue('');
        searchInputCatalogs.setValue('');
        searchInputArtObjects.setValue('');
        searchInputSelectedArtObjects.setValue('');
        setCompanyLocations([]);
        setSelectRouteFromActive(false);
        setRouteFromSelected(false);
        setSelectedRouteFrom('???????????????? ??????????');
        setLocationIdFrom('');
        setSelectRouteToActive(false);
        setRouteToSelected(false);
        setSelectedRouteTo('???????????????? ????????????????');
        setCompanyIdTo('');
        setRecipientCompanyName('');
        setSelectAddressActive(false);
        setAddressSelected(false);
        setSelectedAddress('???????????????? ??????????');
        setLocationIdTo('');
        setMapWithCoordinatesActive(false);
        setConditionsActive(false);
        setCondition('???????????????? ??????????????');
        setConditionSelected(false);
        resetSelectedArtObjects();
        setBoxRegistrationGeneralInformationActive(false);
        setBoxRegistrationExhibitsActive(false);
        setBoxRegistrationRouteActive(true);
        setRegisterError('');
    }

    function onRegisterButtonClick() {
        const dataToRegister = {
            locationIdFrom: route.locationIdFrom,
            locationIdTo: route.locationIdTo,
            companyIdTo: route.companyIdTo,
            companyIdFrom: currentUser.userCompanyInfo.id,
            userId: currentUser.id,
            artObjectsIdList: selectedArtObjects.map((artObject) => artObject.id),
            name: generalInformation.name,
            height: generalInformation.height,
            width: generalInformation.width,
            depth: generalInformation.depth,
            weight: generalInformation.weight,
            price: generalInformation.price,
            photo: photos,
            requirements: [
                {
                    type: generalInformation.condition,
                    rangeIn: '',
                    rangeOf: ''
                },
                {
                    type: '??????????????????',
                    rangeIn: generalInformation.humidity,
                    rangeOf: ''
                },
                {
                    type: '??????????????????????',
                    rangeIn: generalInformation.temperature.min,
                    rangeOf: generalInformation.temperature.max
                }
            ],
            qr: ""
        }
        if (
            dataToRegister.locationIdFrom === '' ||
            dataToRegister.locationIdTo === '' ||
            dataToRegister.companyIdTo === '' ||
            dataToRegister.name === ''
        ) {
            setRegisterError('?????????????????? ?????? ???????? ???????????????????? ????????????????????');
        } else {
            if (dataToRegister.artObjectsIdList.length === 0) {
                setRegisterError('???????????????????? ???????????????? ??????????????????');
            } else {
                BoxRegistrationApi.addNewBox(dataToRegister)
                    .then((res) => {
                        clearAllBoxRegistrationInputs();
                        getCatalogs();
                        openQrCodeModal(res);
                        setPhotos([]);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            }
        }
    }

    function onSelectImageHandler(files) {
        if (files.length !== 0) {
            const reader = [];
            for (var i in files) {
                if (files.hasOwnProperty(i)) {
                    reader[i] = new FileReader();
                    reader[i].readAsDataURL(files[i]);
                    reader[i].onload = function (e) {
                        setPhotos(photos => [...photos, e.target.result]);
                    }
                }
            }
        }
    }

    function onRemovePhotoClick(photoForRemove) {
        const filteredPhotos = photos.filter(photo => photo !== photoForRemove);
        if (filteredPhotos.length === 0) {
            setPhotos([]);
        } else {
            setPhotos(filteredPhotos);
        }
    }

    return (
        <section className='box-registration'>
            <Helmet
                title='?????????????????????? ??????????'
            />
            <h1 className='box-registration__heading'>?????????????????????? ??????????</h1>
            <div className='box-registration__form'>
                <div className='box-registration__form-nav-container'>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationRouteActive && 'box-registration__form-nav-text_active'}`} onClick={onRouteTabClick}>??????????????</p>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationExhibitsActive && 'box-registration__form-nav-text_active'}`} onClick={onExhibitsTabClick}>??????????????????</p>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationGeneralInformationActive && 'box-registration__form-nav-text_active'}`} onClick={onGeneralInformationTabClick}>?????????? ????????????????????</p>
                </div>
                <div className='box-registration__heading-mobile-container'>
                    <p className='box-registration__heading-mobile'>{mobileHeading()}</p>
                    {isBoxRegistrationExhibitsActive && (
                        <>
                            {!isArtObjectInfoOpen && (
                                <div className='box-registration__added-container' onClick={onShowAddedArtObjectsClick}>
                                    <div className='box-registration__added-img-container'>
                                        <div className='box-registration__added-value-container'>
                                            <p className='box-registration__added-value'>{selectedArtObjects.length}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {isBoxRegistrationGeneralInformationActive &&
                    <div className='box-registration-general-information'>
                        <p className='box-registration-general-information__heading'>??????????????????</p>
                        <div className='box-registration-general-information__inputs-main-container'>
                            <div className='box-registration-general-information__inputs-container'>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>???????????????? ??????????*</p>
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input'
                                        name="boxName"
                                        placeholder='?????????????? ???????????????? ??????????'
                                        value={boxName.value}
                                        onChange={boxName.onChange}
                                    />
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>????????????????, ????</p>
                                    <div className='box-registration-general-information__dimensions-inputs-container'>
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                            name="length"
                                            placeholder='??????????'
                                            value={length.value}
                                            onChange={length.onChange}
                                        />
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                            name="width"
                                            placeholder='????????????'
                                            value={width.value}
                                            onChange={width.onChange}
                                        />
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                            name="height"
                                            placeholder='????????????'
                                            value={height.value}
                                            onChange={height.onChange}
                                        />
                                    </div>
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>??????, ????</p>
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input'
                                        name="weight"
                                        placeholder='?????????????? ?????? ??????????'
                                        value={weight.value}
                                        onChange={weight.onChange}
                                    />
                                </div>
                            </div>
                            <div className='box-registration-general-information__inputs-container'>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label  box-registration-general-information__input-label_first'>??????????????????????</p>
                                    <div className='box-registration-general-information__fix-info-container'>
                                        <p className='box-registration-general-information__fix-info-text'>{currentUser.userCompanyInfo.name}</p>
                                    </div>
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>????????????????????</p>
                                    <div className='box-registration-general-information__fix-info-container'>
                                        <p className='box-registration-general-information__fix-info-text'>{recipientCompanyName}</p>
                                    </div>
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>??????????????????, ???</p>
                                    <div className='box-registration-general-information__fix-info-container'>
                                        <p className='box-registration-general-information__fix-info-text'>{totalArtObjectsPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='box-registration-general-information__heading box-registration-general-information__heading_conditions'>?????????????? ??????????????????????????????</p>
                        <div className='box-registration-general-information__inputs-main-container'>
                            <div className='box-registration-general-information__inputs-container'>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>???????????? ??????????????</p>
                                    <div className='box-registration-general-information__conditions' onClick={handleShowConditions}>
                                        <p className={`box-registration-general-information__conditions-value ${isConditionSelected && 'box-registration-general-information__conditions-value_selected'}`}>{condition}</p>
                                        <div className='box-registration-general-information__conditions-arrow' />
                                        {isConditionsActive && (
                                            <div className='box-registration-general-information__conditions-container'>
                                                {specialConditionsList.map((condition, index) => (
                                                    <div key={index} className='box-registration-general-information__condition-container' onClick={() => onSelectSpecialConditionClick(condition)}>
                                                        <p className='box-registration-general-information__condition'>{condition}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>??????????????????, %</p>
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input'
                                        name="humidity"
                                        placeholder='?????????????? ??????????????????'
                                        value={humidity.value}
                                        onChange={humidity.onChange}
                                    />
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>??????????????????????, &deg;C</p>
                                    <div className='box-registration-general-information__dimensions-inputs-container'>
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_temperature'
                                            name="temperatureMin"
                                            placeholder='??????????????'
                                            value={temperatureMin.value}
                                            onChange={temperatureMin.onChange}
                                        />
                                        <div className='box-registration-general-information__temperature-line' />
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_temperature'
                                            name="temperatureMax"
                                            placeholder='????????????????'
                                            value={temperatureMax.value}
                                            onChange={temperatureMax.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='fixation-general-information__img-container'>
                            <div className='fixation-general-information__img-add-container'>
                                <input
                                    className="fixation-general-information__img-add-input"
                                    id="input__file"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => onSelectImageHandler(e.target.files)}
                                />
                                <label htmlFor="input__file" className="fixation-general-information__img-add-input-button">
                                    <div className='fixation-general-information__img-add-cross' />
                                    <p className='fixation-general-information__img-add-text'>???????????????? ????????????????????</p>
                                </label>
                            </div>
                            <div className='fixation-general-information__grid-container'>
                                {photos.length !== 0 && (
                                    <>
                                        {photos.map((photo, index) => (
                                            <div key={index} className='fixation-general-information__grid-img-container'>
                                                <img className='fixation-general-information__img' src={photo} alt="???????????????????? ??????????" />
                                                <div className="fixation-general-information__img-remove-container">
                                                    <p className="fixation-general-information__img-remove-text" onClick={() => onRemovePhotoClick(photo)}>??????????????</p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                }
                {isBoxRegistrationExhibitsActive &&
                    <Cards
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
                    />
                }
                {isBoxRegistrationRouteActive &&
                    <div className='box-registration-route'>
                        <div className='box-registration-route__form-container'>
                            <div className='box-registration-route__input-container'>
                                <p className='box-registration-route__input-label'>????????????*</p>
                                <div className='box-registration-route__select-container' onClick={handleSelectRouteFrom}>
                                    <p className={`box-registration-route__select-route-name ${isRouteFromSelected && 'box-registration-route__select-route-name_selected'}`}>{selectedRouteFrom}</p>
                                    <div className='box-registration-route__select-route-arrow' />
                                    {isSelectRouteFromActive && (
                                        <div className='box-registration-route__select-routs-container'>
                                            {locations.map((location) => (
                                                <div key={location.id} className='box-registration-route__select-route-container' onClick={() => onSelectRouteFromClick(location)}>
                                                    <p className='box-registration-route__select-route'>{location.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='box-registration-route__input-container'>
                                <p className='box-registration-route__input-label'>????????*</p>
                                <div className='box-registration-route__select-container' onClick={handleSelectRouteTo}>
                                    <p className={`box-registration-route__select-route-name ${isRouteToSelected && 'box-registration-route__select-route-name_selected'}`}>{selectedRouteTo}</p>
                                    <div className='box-registration-route__select-route-arrow' />
                                    {isSelectRouteToActive && (
                                        <div className='box-registration-route__select-routs-container'>
                                            {companies.map((company) => (
                                                <div key={company.id} className='box-registration-route__select-route-container' onClick={() => onSelectRouteToClick(company)}>
                                                    <p className='box-registration-route__select-route'>{company.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isRouteToSelected && (
                                <div className='box-registration-route__input-container'>
                                    <p className='box-registration-route__input-label'>??????????*</p>
                                    <div className='box-registration-route__select-container' onClick={handleSelectAddress}>
                                        <p className={`box-registration-route__select-route-name ${isAddressSelected && 'box-registration-route__select-route-name_selected'}`}>{selectedAddress}</p>
                                        <div className='box-registration-route__select-route-arrow' />
                                        {isSelectAddressActive && (
                                            <div className='box-registration-route__select-routs-container'>
                                                {companyLocations.map((location) => (
                                                    <div key={location.id} className='box-registration-route__select-route-container' onClick={() => onSelectAddressClick(location)}>
                                                        <p className='box-registration-route__select-route'>{location.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <YMaps>
                            <div className="box-registration-route__map-container">
                                {isMapWithCoordinatesActive ? (
                                    <Map
                                        defaultState={{ center: [59.939098, 30.315868], zoom: 8 }}
                                        width={"100%"}
                                        height={"100%"}
                                        instanceRef={(ref) => {
                                            if (ref) {
                                                ref.setBounds([
                                                    [`${coordinatesFrom.geoX}`, `${coordinatesFrom.geoY}`],
                                                    [`${coordinatesTo.geoX}`, `${coordinatesTo.geoY}`]
                                                ]);
                                            }
                                        }}
                                    >
                                        <GeoObject {...myGeoObject} />
                                    </Map>
                                ) : (
                                    <Map
                                        defaultState={{ center: [59.939098, 30.315868], zoom: 8 }}
                                        width={"100%"}
                                        height={"100%"}
                                    ></Map>
                                )}
                            </div>
                        </YMaps>
                    </div>
                }
                {isBoxRegistrationGeneralInformationActive ? (
                    <p className='box-registration__error-message'>{registerError}</p>
                ) : (
                    <div className='box-registration__no-error' />
                )}
                <div className='box-registration__buttons-container'>
                    {isBoxRegistrationExhibitsActive ? (
                        <>
                            {isArtObjectInfoOpen && (
                                <button type='button' className='box-registration__button-back' onClick={artObjectsBackClick}>?????????????????? ?? ????????????????????</button>
                            )}
                            {isArtObjectsActive && (
                                <button type='button' className='box-registration__button-back' onClick={catalogsBackClick}>?????????????????? ?? ??????????????????</button>
                            )}
                            {isSelectedArtObjectsActive && (
                                <button type='button' className='box-registration__button-back' onClick={catalogsBackClick}>?????????????????? ?? ??????????????????</button>
                            )}
                            {isCatalogsActive && (
                                <>
                                    <button type='button' className='box-registration__button-prev' onClick={prevTabClick}>??????????</button>
                                    <button type='button' className={`box-registration__button-next ${isBoxRegistrationRouteActive && 'box-registration__button-next_big'}`} onClick={nextTabClick}>??????????</button>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {!isBoxRegistrationRouteActive && (
                                <button type='button' className='box-registration__button-prev' onClick={prevTabClick}>??????????</button>
                            )}
                            {isBoxRegistrationGeneralInformationActive ?
                                (
                                    <button type='button' className='box-registration__button-register' onClick={onRegisterButtonClick}>????????????????????????????????</button>
                                ) : (
                                    <button type='button' className={`box-registration__button-next ${isBoxRegistrationRouteActive && 'box-registration__button-next_big'}`} onClick={nextTabClick}>??????????</button>
                                )
                            }
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default BoxRegistration;
