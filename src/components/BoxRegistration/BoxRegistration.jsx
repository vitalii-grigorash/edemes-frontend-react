import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { YMaps, Map, GeoObject } from 'react-yandex-maps';
import { Validation } from '../../utils/Validation';
import BoxRegistrationExhibitsData from '../../utils/BoxRegistrationExhibitsData.json';
import TablePagination from '../TablePagination/TablePagination';
import * as BoxRegistrationApi from '../../Api/BoxRegistrationApi';

function BoxRegistration(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const { pathname } = useLocation();
    const [isBoxRegistrationGeneralInformationActive, setBoxRegistrationGeneralInformationActive] = useState(false);
    const [isBoxRegistrationExhibitsActive, setBoxRegistrationExhibitsActive] = useState(false);
    const [isBoxRegistrationRouteActive, setBoxRegistrationRouteActive] = useState(true);
    const [isBoxRegistrationQrCodeActive, setBoxRegistrationQrCodeActive] = useState(false);
    const [isDownloadContainerActive, setDownloadContainerActive] = useState(true);
    const [isTableContainerActive, setTableContainerActive] = useState(false);
    const [isImgSortActive, setImgSortActive] = useState(false);
    const [isListSortActive, setListSortActive] = useState(true);
    const [exhibitsList, setExhibitsList] = useState([]);
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);
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

    const [senderCompanyName, setSenderCompanyName] = useState('');
    const [recipientCompanyName, setRecipientCompanyName] = useState('');
    const [totalArtObjectsPrice, setTotalArtObjectsPrice] = useState('');

    const [isMapWithCoordinatesActive, setMapWithCoordinatesActive] = useState(false);

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

    const generalInformation = {
        boxName: boxName.value,
        dimensions: {
            length: length.value,
            width: width.value,
            height: height.value
        },
        weight: weight.value
    }

    function showLocations() {
        BoxRegistrationApi.getLocations()
            .then((locations) => {
                console.log(locations);
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
            if (localStorage.getItem('user')) {
                const userData = localStorage.getItem('user');
                const user = JSON.parse(userData);
                setSenderCompanyName(user.userCompanyInfo.name);
            }
        }
        // eslint-disable-next-line
    }, []);

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

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    function onDownloadButtonClick() {
        setDownloadContainerActive(false);
        setTableContainerActive(true);
        setExhibitsList(BoxRegistrationExhibitsData);
    }

    function onImgSortIconClick() {
        setListSortActive(false);
        setImgSortActive(true);
    }

    function onListSortIconClick() {
        setImgSortActive(false);
        setListSortActive(true);

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
            console.log(generalInformation);
        } else if (isBoxRegistrationExhibitsActive) {
            setBoxRegistrationExhibitsActive(false);
            setBoxRegistrationGeneralInformationActive(true);
        } else if (isBoxRegistrationRouteActive) {
            setBoxRegistrationRouteActive(false);
            setBoxRegistrationExhibitsActive(true);
            console.log(route);
        }
    }

    function clearAllBoxRegistrationInputs() {
        boxName.setValue('');
        length.setValue('');
        width.setValue('');
        height.setValue('');
        weight.setValue('');
        setDownloadContainerActive(true);
        setTableContainerActive(false);
        setCompanyLocations([]);
        setSelectRouteFromActive(false);
        setRouteFromSelected(false);
        setSelectedRouteFrom('Выберите адрес');
        setLocationIdFrom('');
        setSelectRouteToActive(false);
        setRouteToSelected(false);
        setSelectedRouteTo('Выберите компанию');
        setCompanyIdTo('');
        setSelectAddressActive(false);
        setAddressSelected(false);
        setSelectedAddress('Выберите адрес');
        setLocationIdTo('');
    }

    function onRegisterButtonClick() {
        clearAllBoxRegistrationInputs();
        const dataToRegister = {
            generalInformation: generalInformation,
            exhibits: exhibitsList,
            locationIdFrom: route.locationIdFrom,
            companyIdTo: route.companyIdTo,
            locationIdTo: route.locationIdTo,
            qrCode: "qrCode.jpg"
        }
        console.log(dataToRegister);
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
                                    <div className='box-registration-general-information__dimensions-cross-icon' />
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                        name="width"
                                        placeholder='Ширина'
                                        value={width.value}
                                        onChange={width.onChange}
                                    />
                                    <div className='box-registration-general-information__dimensions-cross-icon' />
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
                                    <p className='box-registration-general-information__fix-info-text'>{senderCompanyName}</p>
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
                }
                {isBoxRegistrationExhibitsActive &&
                    <div className='box-registration-exhibits'>
                        {isDownloadContainerActive && (
                            <div className='box-registration-exhibits__download-container'>
                                <div className='box-registration-exhibits__download-img' />
                                <button type='button' className='box-registration-exhibits__download-button' onClick={onDownloadButtonClick}>Загрузить из каталога</button>
                            </div>
                        )}
                        {isTableContainerActive && (
                            <div className='box-registration-exhibits__table-container'>
                                <div className='box-registration-exhibits__table-heading'>
                                    <div className='box-registration-exhibits__table-heading-success-icon' />
                                    <p className='box-registration-exhibits__table-heading-success-text'>Каталог загружен</p>
                                    <div
                                        className={`box-registration-exhibits__table-heading-img-sort-icon ${isImgSortActive && 'box-registration-exhibits__table-heading-img-sort-icon_active'}`}
                                        onClick={onImgSortIconClick}
                                    />
                                    <div
                                        className={`box-registration-exhibits__table-heading-list-sort-icon ${isListSortActive && 'box-registration-exhibits__table-heading-list-sort-icon_active'}`}
                                        onClick={onListSortIconClick}
                                    />
                                </div>
                                {isListSortActive && (
                                    <div className='box-registration-exhibits__table'>
                                        <div className='box-registration-exhibits__table-rows box-registration-exhibits__table-rows_heading'>
                                            <p className='box-registration-exhibits__name'>Название</p>
                                            <p className='box-registration-exhibits__weight'>Вес, кг</p>
                                            <p className='box-registration-exhibits__dimensions'>Габариты, м</p>
                                            <p className='box-registration-exhibits__storage'>Место хранения</p>
                                            <p className='box-registration-exhibits__requirements'>Требования</p>
                                        </div>
                                        {exhibitsList !== null ? (
                                            <>
                                                {exhibitsList.slice(showResultsFrom, resultsShow).map((list) => (
                                                    <div key={list.id} className='box-registration-exhibits__table-rows'>
                                                        <p className='box-registration-exhibits__name'>{list.name}</p>
                                                        <p className='box-registration-exhibits__weight'>{list.weight}</p>
                                                        <p className='box-registration-exhibits__dimensions'>{list.dimensions}</p>
                                                        <p className='box-registration-exhibits__storage'>{list.storage}</p>
                                                        <p className='box-registration-exhibits__requirements'>{list.requirements}</p>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <div className='box-registration-exhibits__table-rows'>
                                                <p className='box-registration-exhibits__no-results-text'>Необходимо загрузить каталог</p>
                                            </div>
                                        )}
                                        <TablePagination
                                            sortList={exhibitsList}
                                            handleShowResultsFrom={handleShowResultsFrom}
                                            handleResultsShow={handleResultsShow}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
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
                </div>
            </div>
        </section>
    );
}

export default BoxRegistration;
