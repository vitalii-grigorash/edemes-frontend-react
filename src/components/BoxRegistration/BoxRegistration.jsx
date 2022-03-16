import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { YMaps, Map } from 'react-yandex-maps';
import BoxRegistrationExhibits from '../BoxRegistrationExhibits/BoxRegistrationExhibits';
import BoxRegistrationQrCode from '../BoxRegistrationQrCode/BoxRegistrationQrCode';
import { Validation } from '../../utils/Validation';

function BoxRegistration(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const [isBoxRegistrationGeneralInformationActive, setBoxRegistrationGeneralInformationActive] = useState(true);
    const [isBoxRegistrationExhibitsActive, setBoxRegistrationExhibitsActive] = useState(false);
    const [isBoxRegistrationRouteActive, setBoxRegistrationRouteActive] = useState(false);
    const [isBoxRegistrationQrCodeActive, setBoxRegistrationQrCodeActive] = useState(false);
    const [isTrainActive, setTrainActive] = useState(false);
    const [isAirplaneActive, setAirplaneActive] = useState(true);
    const [isBusActive, setBusActive] = useState(false);
    const [isCarActive, setCarActive] = useState(false);
    const [departureMethod, setDepartureMethod] = useState('airplane');

    const from = Validation();
    const to = Validation();

    const route = {
        departureMethod: departureMethod,
        from: from.value,
        to: to.value
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

    function prevTabClick() {
        if (isBoxRegistrationQrCodeActive) {
            setBoxRegistrationQrCodeActive(false);
            setBoxRegistrationRouteActive(true);
        } else if (isBoxRegistrationRouteActive) {
            setBoxRegistrationRouteActive(false);
            setBoxRegistrationExhibitsActive(true);
        } else if (isBoxRegistrationExhibitsActive) {
            setBoxRegistrationExhibitsActive(false);
            setBoxRegistrationGeneralInformationActive(true);
        }
    }

    function nextTabClick() {
        if (isBoxRegistrationGeneralInformationActive) {
            setBoxRegistrationGeneralInformationActive(false);
            setBoxRegistrationExhibitsActive(true);
            console.log(generalInformation);
        } else if (isBoxRegistrationExhibitsActive) {
            setBoxRegistrationExhibitsActive(false);
            setBoxRegistrationRouteActive(true);
        } else if (isBoxRegistrationRouteActive) {
            setBoxRegistrationRouteActive(false);
            setBoxRegistrationQrCodeActive(true);
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
    }

    function onRegisterButtonClick() {
        clearAllBoxRegistrationInputs();
        const dataToRegister = {
            generalInformation: generalInformation,
            route: route,
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
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationGeneralInformationActive && 'box-registration__form-nav-text_active'}`} onClick={onGeneralInformationTabClick}>Общая информация</p>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationExhibitsActive && 'box-registration__form-nav-text_active'}`} onClick={onExhibitsTabClick}>Экспонаты</p>
                    <p className={`box-registration__form-nav-text ${isBoxRegistrationRouteActive && 'box-registration__form-nav-text_active'}`} onClick={onRouteTabClick}>Маршрут</p>
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
                    (
                        <BoxRegistrationExhibits />
                    )
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
                                    <input
                                        type="text"
                                        className='box-registration-route__input'
                                        name="from"
                                        placeholder=''
                                        value={from.value}
                                        onChange={from.onChange}
                                    />
                                </div>
                                <div className='box-registration-route__input-container'>
                                    <p className='box-registration-route__input-label'>Куда</p>
                                    <input
                                        type="text"
                                        className='box-registration-route__input'
                                        name="to"
                                        placeholder=''
                                        value={to.value}
                                        onChange={to.onChange}
                                    />
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
                                </Map>
                            </div>
                        </YMaps>
                    </div>
                }
                {isBoxRegistrationQrCodeActive &&
                    (
                        <BoxRegistrationQrCode />
                    )
                }
                <div className='box-registration__buttons-container'>
                    {!isBoxRegistrationGeneralInformationActive && (
                        <button type='button' className='box-registration__button-prev' onClick={prevTabClick}>Назад</button>
                    )}
                    {isBoxRegistrationQrCodeActive ?
                        (
                            <button type='button' className='box-registration__button-register' onClick={onRegisterButtonClick}>Зарегистрировать</button>
                        ) : (
                            <button type='button' className={`box-registration__button-next ${isBoxRegistrationGeneralInformationActive && 'box-registration__button-next_big'}`} onClick={nextTabClick}>Далее</button>
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default BoxRegistration;
