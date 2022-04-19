import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
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
    const [isTrainActive, setTrainActive] = useState(false);
    const [isAirplaneActive, setAirplaneActive] = useState(true);
    const [isBusActive, setBusActive] = useState(false);
    const [isCarActive, setCarActive] = useState(false);
    const [departureMethod, setDepartureMethod] = useState('airplane');
    const [isDownloadContainerActive, setDownloadContainerActive] = useState(true);
    const [isTableContainerActive, setTableContainerActive] = useState(false);
    const [isImgSortActive, setImgSortActive] = useState(false);
    const [isListSortActive, setListSortActive] = useState(true);
    const [exhibitsList, setExhibitsList] = useState([]);
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);
    const [locations, setLocations] = useState([]);
    const [isSelectRouteFromActive, setSelectRouteFromActive] = useState(false);
    const [isRouteFromSelected, setRouteFromSelected] = useState(false);
    const [selectedRouteFrom, setSelectedRouteFrom] = useState('Выберите компанию');

    const [isSelectRouteToActive, setSelectRouteToActive] = useState(false);
    const [isRouteToSelected, setRouteToSelected] = useState(false);
    const [selectedRouteTo, setSelectedRouteTo] = useState('Выберите компанию');

    const from = Validation();
    const to = Validation();

    const route = {
        departureMethod: departureMethod,
        locationFrom: selectedRouteFrom,
        locationTo: selectedRouteTo
    }

    const boxName = Validation();
    const length = Validation();
    const width = Validation();
    const height = Validation();
    const weight = Validation();
    const price = Validation();
    const humidity = Validation();
    const temperature = Validation();

    const generalInformation = {
        boxName: boxName.value,
        dimensions: {
            length: length.value,
            width: width.value,
            height: height.value
        },
        weight: weight.value,
        price: price.value,
        humidity: humidity.value,
        temperature: temperature.value
    }

    function showLocations() {
        BoxRegistrationApi.getLocations()
            .then((locations) => {
                console.log(locations);
                setLocations(locations.locations);
            })
            .catch((err) => console.log(`Ошибка при загрузке каталогов: ${err}`));
    }

    useEffect(() => {
        if (pathname === '/box-registration') {
            showLocations();
        }
        // eslint-disable-next-line
    }, []);

    function handleSelectRouteFrom() {
        if (isSelectRouteFromActive) {
            setSelectRouteFromActive(false);
        } else {
            setSelectRouteFromActive(true);
        }
    }

    function onSelectRouteFromClick(selectedRoute) {
        setRouteFromSelected(true);
        setSelectedRouteFrom(selectedRoute);
    }

    function handleSelectRouteTo() {
        if (isSelectRouteToActive) {
            setSelectRouteToActive(false);
        } else {
            setSelectRouteToActive(true);
        }
    }

    function onSelectRouteToClick(selectedRoute) {
        setRouteToSelected(true);
        setSelectedRouteTo(selectedRoute);
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

    function handleTrainActive() {
        setAirplaneActive(false);
        setBusActive(false);
        setCarActive(false);
        setTrainActive(true);
        setDepartureMethod('train');
    }

    function handleAirplaneActive() {
        setTrainActive(false);
        setBusActive(false);
        setCarActive(false);
        setAirplaneActive(true);
        setDepartureMethod('airplane');
    }

    function handleBusActive() {
        setTrainActive(false);
        setAirplaneActive(false);
        setCarActive(false);
        setBusActive(true);
        setDepartureMethod('bus');
    }

    function handleCarActive() {
        setTrainActive(false);
        setAirplaneActive(false);
        setBusActive(false);
        setCarActive(true);
        setDepartureMethod('car');
    }

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
        price.setValue('');
        humidity.setValue('');
        temperature.setValue('');
        from.setValue('');
        to.setValue('');
        handleAirplaneActive();
        setDownloadContainerActive(true);
        setTableContainerActive(false);
    }

    function onRegisterButtonClick() {
        clearAllBoxRegistrationInputs();
        const dataToRegister = {
            generalInformation: generalInformation,
            exhibits: exhibitsList,
            locationFrom: route.locationFrom,
            locationTo: route.locationTo,
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
                                    placeholder=''
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
                                        placeholder=''
                                        value={length.value}
                                        onChange={length.onChange}
                                    />
                                    <div className='box-registration-general-information__dimensions-cross-icon' />
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                        name="width"
                                        placeholder=''
                                        value={width.value}
                                        onChange={width.onChange}
                                    />
                                    <div className='box-registration-general-information__dimensions-cross-icon' />
                                    <input
                                        type="text"
                                        className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                                        name="height"
                                        placeholder=''
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
                                    placeholder=''
                                    value={weight.value}
                                    onChange={weight.onChange}
                                />
                            </div>
                        </div>
                        <div className='box-registration-general-information__inputs-container'>
                            <div className='box-registration-general-information__input-container'>
                                <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>Стоимость, ₽</p>
                                <input
                                    type="text"
                                    className='box-registration-general-information__input'
                                    name="price"
                                    placeholder=''
                                    value={price.value}
                                    onChange={price.onChange}
                                />
                            </div>
                            <div className='box-registration-general-information__input-container'>
                                <p className='box-registration-general-information__input-label'>Влажность</p>
                                <input
                                    type="text"
                                    className='box-registration-general-information__input'
                                    name="humidity"
                                    placeholder=''
                                    value={humidity.value}
                                    onChange={humidity.onChange}
                                />
                            </div>
                            <div className='box-registration-general-information__input-container'>
                                <p className='box-registration-general-information__input-label'>Температура</p>
                                <input
                                    type="text"
                                    className='box-registration-general-information__input'
                                    name="temperature"
                                    placeholder=''
                                    value={temperature.value}
                                    onChange={temperature.onChange}
                                />
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
                            <div className='box-registration-route__icons-container'>
                                <div className={`box-registration-route__icon-train ${isTrainActive && 'box-registration-route__icon-train_active'}`} onClick={handleTrainActive} />
                                <div className={`box-registration-route__icon-airplane ${isAirplaneActive && 'box-registration-route__icon-airplane_active'}`} onClick={handleAirplaneActive} />
                                <div className={`box-registration-route__icon-bus ${isBusActive && 'box-registration-route__icon-bus_active'}`} onClick={handleBusActive} />
                                <div className={`box-registration-route__icon-car ${isCarActive && 'box-registration-route__icon-car_active'}`} onClick={handleCarActive} />
                            </div>
                            <div className='box-registration-route__inputs-container'>
                                <div className='box-registration-route__input-container'>
                                    <p className='box-registration-route__input-label'>Откуда</p>
                                    <div className='box-registration-route__select-container' onClick={handleSelectRouteFrom}>
                                        <p className={`box-registration-route__select-route-name ${isRouteFromSelected && 'box-registration-route__select-route-name_selected'}`}>{selectedRouteFrom}</p>
                                        <div className='box-registration-route__select-route-arrow' />
                                        {isSelectRouteFromActive && (
                                            <div className='box-registration-route__select-routs-container'>
                                                {locations.map((location) => (
                                                    <div key={location.id} className='box-registration-route__select-route-container' onClick={() => onSelectRouteFromClick(location.name)}>
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
                                                {locations.map((location) => (
                                                    <div key={location.id} className='box-registration-route__select-route-container' onClick={() => onSelectRouteToClick(location.name)}>
                                                        <p className='box-registration-route__select-route'>{location.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className='box-registration-route__travel-time'>Расчетное время в пути 3 ч 35 мин</p>
                        </div>
                        <YMaps>
                            <div className="box-registration-route__map-container">
                                <Map
                                    defaultState={{ center: [59.939098, 30.315868], zoom: 8 }}
                                    width={"100%"}
                                    height={"100%"}
                                >
                                    <Placemark geometry={[60.188510, 29.808661]} />
                                    <Placemark geometry={[55.611256, 37.200880]} />
                                </Map>
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
