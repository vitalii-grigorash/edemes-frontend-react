import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { YMaps, Map, GeoObject } from 'react-yandex-maps';
import { Validation } from '../../utils/Validation';
// import BoxRegistrationExhibitsData from '../../utils/BoxRegistrationExhibitsData.json';
import * as BoxRegistrationApi from '../../Api/BoxRegistrationApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Cards from '../Cards/Cards';

function BoxRegistration(props) {

    const {
        handleMobileHeaderNavText,
        getCatalogs,
        catalogs,
        onSelectCatalogClick,
        onDeselectCatalogClick,
        selectedArtObjects,
        onOpenCatalogClick,
        artObjects,
        onSelectArtObjectClick,
        onDeselectArtObjectClick,
    } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const { pathname } = useLocation();
    const [isBoxRegistrationGeneralInformationActive, setBoxRegistrationGeneralInformationActive] = useState(false);
    const [isBoxRegistrationExhibitsActive, setBoxRegistrationExhibitsActive] = useState(false);
    const [isBoxRegistrationRouteActive, setBoxRegistrationRouteActive] = useState(true);
    const [isBoxRegistrationQrCodeActive, setBoxRegistrationQrCodeActive] = useState(false);
    const [locations, setLocations] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [companyLocations, setCompanyLocations] = useState([]);

    const [isSelectRouteFromActive, setSelectRouteFromActive] = useState(false);
    const [isRouteFromSelected, setRouteFromSelected] = useState(false);
    const [selectedRouteFrom, setSelectedRouteFrom] = useState('Выберите адрес');
    const [locationIdFrom, setLocationIdFrom] = useState('');
    const [coordinatesFrom, setCoordinatesFrom] = useState({});

    const [isSelectRouteToActive, setSelectRouteToActive] = useState(false);
    const [isRouteToSelected, setRouteToSelected] = useState(false);
    const [selectedRouteTo, setSelectedRouteTo] = useState('Выберите компанию');
    const [companyIdTo, setCompanyIdTo] = useState('');

    const [isSelectAddressActive, setSelectAddressActive] = useState(false);
    const [isAddressSelected, setAddressSelected] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('Выберите адрес');
    const [locationIdTo, setLocationIdTo] = useState('');
    const [coordinatesTo, setCoordinatesTo] = useState({});

    const [recipientCompanyName, setRecipientCompanyName] = useState('');
    const [totalArtObjectsPrice, setTotalArtObjectsPrice] = useState('');

    const [isConditionsActive, setConditionsActive] = useState(false);
    const [condition, setCondition] = useState('Выберите условие');
    const [isConditionSelected, setConditionSelected] = useState(false);

    const [isMapWithCoordinatesActive, setMapWithCoordinatesActive] = useState(false);

    const [isCatalogsActive, setCatalogsActive] = useState(true);
    const [isArtObjectsActive, setArtObjectsActive] = useState(false);
    const [isArtObjectInfoOpen, setArtObjectInfoOpen] = useState(false);
    const [artObject, setArtObject] = useState({});

    const [isSelectedArtObjectsActive, setSelectedArtObjectsActive] = useState(false);

    function onShowAddedArtObjectsClick() {
        setArtObjectsActive(false);
        setCatalogsActive(false);
        setSelectedArtObjectsActive(true);
        console.log(selectedArtObjects);
    }

    function handleArtObjectsActive() {
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
        'Без особых условий',
        'Осторожно, хрупкое',
        'Не бросать',
        'Не переворачивать',
        'Беречь от солнца',
        'Герметичная упаковка'
    ]

    useEffect(() => {
        getCatalogs();
        // eslint-disable-next-line
    }, [])

    function handleShowConditions() {
        if (isConditionsActive) {
            setConditionsActive(false);
        } else {
            setConditionsActive(true);
        }
    }

    function onSelectSpecialConditionClick(condition) {
        if (condition === 'Без особых условий') {
            setCondition('Выберите условие');
            setConditionSelected(false);
        } else {
            setCondition(condition);
            setConditionSelected(true);
        }
    }

    useEffect(() => {
        if (isRouteFromSelected && isAddressSelected) {
            setMapWithCoordinatesActive(true);
        }
    }, [isAddressSelected, isRouteFromSelected])

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
        condition: `${condition !== 'Выберите условие' ? condition : ''}`,
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
            .catch((err) => console.log(`Ошибка при загрузке каталогов: ${err}`));
    }

    function showCompanies() {
        BoxRegistrationApi.getCompaniesWithLocations()
            .then((companies) => {
                setCompanies(companies.companiesList);
            })
            .catch((err) => console.log(`Ошибка при загрузке каталогов: ${err}`));
    }

    useEffect(() => {
        if (pathname === '/box-registration') {
            showLocations();
            showCompanies();
            setTotalArtObjectsPrice('20000');
        }
    }, [pathname]);

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
        setSelectedAddress('Выберите адрес');
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
            return 'Общая информация';
        } else if (isBoxRegistrationExhibitsActive) {
            return 'Экспонаты';
        } else if (isBoxRegistrationRouteActive) {
            return 'Маршрут';
        } else if (isBoxRegistrationQrCodeActive) {
            return 'QR код';
        }
    })

    useEffect(() => {
        handleMobileHeaderNavText('Регистрация ящика');
    });

    function onGeneralInformationTabClick() {
        setBoxRegistrationQrCodeActive(false);
        setBoxRegistrationRouteActive(false);
        setBoxRegistrationExhibitsActive(false);
        setBoxRegistrationGeneralInformationActive(true);
    }

    function onExhibitsTabClick() {
        setBoxRegistrationQrCodeActive(false);
        setBoxRegistrationRouteActive(false);
        setBoxRegistrationGeneralInformationActive(false);
        setBoxRegistrationExhibitsActive(true);
    }

    function onRouteTabClick() {
        setBoxRegistrationQrCodeActive(false);
        setBoxRegistrationRouteActive(false);
        setBoxRegistrationGeneralInformationActive(false);
        setBoxRegistrationExhibitsActive(false);
        setBoxRegistrationRouteActive(true);
    }

    function onQrCodeTabClick() {
        setBoxRegistrationRouteActive(false);
        setBoxRegistrationGeneralInformationActive(false);
        setBoxRegistrationExhibitsActive(false);
        setBoxRegistrationRouteActive(false);
        setBoxRegistrationQrCodeActive(true);
    }

    function prevTabClick() {
        if (isBoxRegistrationQrCodeActive) {
            setBoxRegistrationQrCodeActive(false);
            setBoxRegistrationGeneralInformationActive(true);
        } else if (isBoxRegistrationGeneralInformationActive) {
            setBoxRegistrationGeneralInformationActive(false);
            setBoxRegistrationExhibitsActive(true);
        } else if (isBoxRegistrationExhibitsActive) {
            setBoxRegistrationExhibitsActive(false);
            setBoxRegistrationRouteActive(true);
        }
    }

    function nextTabClick() {
        if (isBoxRegistrationGeneralInformationActive) {
            setBoxRegistrationGeneralInformationActive(false);
            setBoxRegistrationQrCodeActive(true)
        } else if (isBoxRegistrationExhibitsActive) {
            setBoxRegistrationExhibitsActive(false);
            setBoxRegistrationGeneralInformationActive(true);
        } else if (isBoxRegistrationRouteActive) {
            setBoxRegistrationRouteActive(false);
            setBoxRegistrationExhibitsActive(true);
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
        setCompanyLocations([]);
        setSelectRouteFromActive(false);
        setRouteFromSelected(false);
        setSelectedRouteFrom('Выберите адрес');
        setLocationIdFrom('');
        setSelectRouteToActive(false);
        setRouteToSelected(false);
        setSelectedRouteTo('Выберите компанию');
        setCompanyIdTo('');
        setRecipientCompanyName('');
        setSelectAddressActive(false);
        setAddressSelected(false);
        setSelectedAddress('Выберите адрес');
        setLocationIdTo('');
        setMapWithCoordinatesActive(false);
        setConditionsActive(false);
        setCondition('Выберите условие');
        setConditionSelected(false);
    }

    function onRegisterButtonClick() {
        const dataToRegister = {
            companyIdTo: route.companyIdTo,
            companyIdFrom: currentUser.userCompanyInfo.id,
            userId: currentUser.id,
            locationIdFrom: route.locationIdFrom,
            locationIdTo: route.locationIdTo,
            artObjectsIdList: selectedArtObjects.map((artObject) => artObject.id),
            name: generalInformation.name,
            height: generalInformation.height,
            width: generalInformation.width,
            depth: generalInformation.depth,
            weight: generalInformation.weight,
            price: generalInformation.price,
            requirements: [
                {
                    type: generalInformation.condition,
                    rangeIn: '',
                    rangeOf: ''
                },
                {
                    type: 'Влажность',
                    rangeIn: generalInformation.humidity,
                    rangeOf: ''
                },
                {
                    type: 'Температура',
                    rangeIn: generalInformation.temperature.min,
                    rangeOf: generalInformation.temperature.max
                }
            ],
            qr: "qrCode.jpg"
        }
        console.log(dataToRegister);
        BoxRegistrationApi.addNewBox(dataToRegister)
            .then(() => {
                clearAllBoxRegistrationInputs();
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return (
        <section className='box-registration'>
            <Helmet
                title='Регистрация ящика'
            />
            <h1 className='box-registration__heading'>Регистрация ящика</h1>
            <div className='box-registration__form'>
                <div className='box-registration__form-nav-container'>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationRouteActive && 'box-registration__form-nav-text_active'}`} onClick={onRouteTabClick}>Маршрут</p>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationExhibitsActive && 'box-registration__form-nav-text_active'}`} onClick={onExhibitsTabClick}>Экспонаты</p>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationGeneralInformationActive && 'box-registration__form-nav-text_active'}`} onClick={onGeneralInformationTabClick}>Общая информация</p>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationQrCodeActive && 'box-registration__form-nav-text_active'}`} onClick={onQrCodeTabClick}>QR код</p>
                </div>
                <div className='box-registration__heading-mobile-container'>
                    <p className='box-registration__heading-mobile'>{mobileHeading()}</p>
                </div>
                {isBoxRegistrationGeneralInformationActive &&
                    <div className='box-registration-general-information'>
                        <p className='box-registration-general-information__heading'>Параметры</p>
                        <div className='box-registration-general-information__inputs-main-container'>
                            <div className='box-registration-general-information__inputs-container'>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>Название ящика</p>
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input'
                                        name="boxName"
                                        placeholder='Введите название ящика'
                                        value={boxName.value}
                                        onChange={boxName.onChange}
                                    />
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>Габариты, см</p>
                                    <div className='box-registration-general-information__dimensions-inputs-container'>
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                            name="length"
                                            placeholder='Длина'
                                            value={length.value}
                                            onChange={length.onChange}
                                        />
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                            name="width"
                                            placeholder='Ширина'
                                            value={width.value}
                                            onChange={width.onChange}
                                        />
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                            name="height"
                                            placeholder='Высота'
                                            value={height.value}
                                            onChange={height.onChange}
                                        />
                                    </div>
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>Вес, кг</p>
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input'
                                        name="weight"
                                        placeholder='Введите вес ящика'
                                        value={weight.value}
                                        onChange={weight.onChange}
                                    />
                                </div>
                            </div>
                            <div className='box-registration-general-information__inputs-container'>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label  box-registration-general-information__input-label_first'>Отправитель</p>
                                    <div className='box-registration-general-information__fix-info-container'>
                                        <p className='box-registration-general-information__fix-info-text'>{currentUser.userCompanyInfo.name}</p>
                                    </div>
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>Получатель</p>
                                    <div className='box-registration-general-information__fix-info-container'>
                                        <p className='box-registration-general-information__fix-info-text'>{recipientCompanyName}</p>
                                    </div>
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>Стоимость, ₽</p>
                                    <div className='box-registration-general-information__fix-info-container'>
                                        <p className='box-registration-general-information__fix-info-text'>{totalArtObjectsPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='box-registration-general-information__heading box-registration-general-information__heading_conditions'>Условия транспортировки</p>
                        <div className='box-registration-general-information__inputs-main-container'>
                            <div className='box-registration-general-information__inputs-container'>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>Особые условия</p>
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
                                    <p className='box-registration-general-information__input-label'>Влажность, %</p>
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input'
                                        name="humidity"
                                        placeholder='Введите влажность'
                                        value={humidity.value}
                                        onChange={humidity.onChange}
                                    />
                                </div>
                                <div className='box-registration-general-information__input-container'>
                                    <p className='box-registration-general-information__input-label'>Температура, &deg;C</p>
                                    <div className='box-registration-general-information__dimensions-inputs-container'>
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_temperature'
                                            name="temperatureMin"
                                            placeholder='Минимум'
                                            value={temperatureMin.value}
                                            onChange={temperatureMin.onChange}
                                        />
                                        <div className='box-registration-general-information__temperature-line' />
                                        <input
                                            type="text"
                                            className='box-registration-general-information__input box-registration-general-information__input_temperature'
                                            name="temperatureMax"
                                            placeholder='Максимум'
                                            value={temperatureMax.value}
                                            onChange={temperatureMax.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {isBoxRegistrationExhibitsActive &&
                    <Cards
                        catalogs={catalogs}
                        onSelectCatalogClick={onSelectCatalogClick}
                        onDeselectCatalogClick={onDeselectCatalogClick}
                        selectedArtObjects={selectedArtObjects}
                        onOpenCatalogClick={onOpenCatalogClick}
                        artObjects={artObjects}
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
                    />
                }
                {isBoxRegistrationRouteActive &&
                    <div className='box-registration-route'>
                        <div className='box-registration-route__form-container'>
                            <div className='box-registration-route__input-container'>
                                <p className='box-registration-route__input-label'>Откуда</p>
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
                                <p className='box-registration-route__input-label'>Куда</p>
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
                                    <p className='box-registration-route__input-label'>Адрес</p>
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
                {isBoxRegistrationQrCodeActive &&
                    <div className='box-registration-qr-code'>
                        <div className='box-registration-qr-code__img' />
                    </div>
                }
                <div className='box-registration__buttons-container'>
                    {isBoxRegistrationExhibitsActive ? (
                        <>
                            {isArtObjectInfoOpen && (
                                <button type='button' className='box-registration__button-back' onClick={artObjectsBackClick}>Вернуться к экспонатам</button>
                            )}
                            {isArtObjectsActive && (
                                <button type='button' className='box-registration__button-back' onClick={catalogsBackClick}>Вернуться к каталогам</button>
                            )}
                            {isSelectedArtObjectsActive && (
                                <button type='button' className='box-registration__button-back' onClick={catalogsBackClick}>Вернуться к каталогам</button>
                            )}
                            {isCatalogsActive && (
                                <>
                                    <button type='button' className='box-registration__button-prev' onClick={prevTabClick}>Назад</button>
                                    <button type='button' className={`box-registration__button-next ${isBoxRegistrationRouteActive && 'box-registration__button-next_big'}`} onClick={nextTabClick}>Далее</button>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {!isBoxRegistrationRouteActive && (
                                <button type='button' className='box-registration__button-prev' onClick={prevTabClick}>Назад</button>
                            )}
                            {isBoxRegistrationQrCodeActive ?
                                (
                                    <button type='button' className='box-registration__button-register' onClick={onRegisterButtonClick}>Зарегистрировать</button>
                                ) : (
                                    <button type='button' className={`box-registration__button-next ${isBoxRegistrationRouteActive && 'box-registration__button-next_big'}`} onClick={nextTabClick}>Далее</button>
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
