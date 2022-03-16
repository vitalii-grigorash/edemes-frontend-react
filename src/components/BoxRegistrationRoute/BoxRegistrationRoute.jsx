import React, { useState } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { Validation } from '../../utils/Validation';

function BoxRegistrationRoute() {

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

    console.log(route);

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

    return (
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
    );

}

export default BoxRegistrationRoute;
