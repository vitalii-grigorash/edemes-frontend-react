import React, { useState } from "react";
import { YMaps, Map } from 'react-yandex-maps';

function FixationMoving() {

    const [isListSelected, setListSelected] = useState(true);
    const [isMapSelected, setMapSelected] = useState(false);

    function handleListSelect() {
        setMapSelected(false);
        setListSelected(true);
    }

    function handleMapSelect() {
        setListSelected(false);
        setMapSelected(true);
    }

    return (
        <div className="fixation-moving">
            <div className="fixation-moving__select-container">
                <div className={`fixation-moving__item-container ${isListSelected && "fixation-moving__item-container_active"}`} onClick={handleListSelect}>
                    <div className="fixation-moving__item-icon fixation-moving__item-icon_list" />
                    <p className="fixation-moving__item-text">Список</p>
                </div>
                <div className={`fixation-moving__item-container ${isMapSelected && "fixation-moving__item-container_active"}`} onClick={handleMapSelect}>
                    <div className="fixation-moving__item-icon fixation-moving__item-icon_map" />
                    <p className="fixation-moving__item-text">Карта</p>
                </div>
            </div>
            {isListSelected && (
                <div className="fixation-moving__list-container">
                    <div className="fixation-moving__steps-container">
                        <div className="fixation-moving__steps-numbers-container">
                            <div className="fixation-moving__step-container">
                                <div className="fixation-moving__step-check-icon" />
                            </div>
                            <div className="fixation-moving__step-line" />
                            <div className="fixation-moving__step-container">
                                <p className="fixation-moving__step-value">2</p>
                            </div>
                            <div className="fixation-moving__step-line" />
                            <div className="fixation-moving__step-container">
                                <p className="fixation-moving__step-value">3</p>
                            </div>
                            <div className="fixation-moving__step-line" />
                            <div className="fixation-moving__step-container">
                                <p className="fixation-moving__step-value">4</p>
                            </div>
                            <div className="fixation-moving__step-line" />
                            <div className="fixation-moving__step-container">
                                <p className="fixation-moving__step-value">5</p>
                            </div>
                        </div>
                        <div className="fixation-moving__steps-info-container">
                            <div className="fixation-moving__step-info-container">
                                <p className="fixation-moving__steps-info-status">Создано</p>
                                <p className="fixation-moving__steps-info-description">Объект упаковывается и готовятся документы</p>
                            </div>
                            <div className="fixation-moving__step-info-container">
                                <p className="fixation-moving__steps-info-status">Создано</p>
                                <p className="fixation-moving__steps-info-description">Объект упаковывается и готовятся документы</p>
                            </div>
                            <div className="fixation-moving__step-info-container">
                                <p className="fixation-moving__steps-info-status">Создано</p>
                                <p className="fixation-moving__steps-info-description">Объект упаковывается и готовятся документы</p>
                            </div>
                            <div className="fixation-moving__step-info-container">
                                <p className="fixation-moving__steps-info-status">Создано</p>
                                <p className="fixation-moving__steps-info-description">Объект упаковывается и готовятся документы</p>
                            </div>
                            <div className="fixation-moving__step-info-container">
                                <p className="fixation-moving__steps-info-status">Создано</p>
                                <p className="fixation-moving__steps-info-description">Объект упаковывается и готовятся документы</p>
                            </div>
                        </div>
                    </div>
                    <div className="fixation-moving__info-container">
                        <p className="fixation-moving__info-heading">Информация о перемещении</p>
                        <div className="fixation-moving__info-rows-container">
                            <p className="fixation-moving__info-row-heading">Маршрут</p>
                            <p className="fixation-moving__info-row-text">Санкт-Петербург - Париж</p>
                        </div>
                        <div className="fixation-moving__info-rows-container">
                            <p className="fixation-moving__info-row-heading">Текущее место положения</p>
                            <p className="fixation-moving__info-row-text">Россия, г. Луга</p>
                        </div>
                        <div className="fixation-moving__info-rows-container">
                            <p className="fixation-moving__info-row-heading">Дата отправления</p>
                            <p className="fixation-moving__info-row-text">12.12. 2022</p>
                        </div>
                        <div className="fixation-moving__info-rows-container">
                            <p className="fixation-moving__info-row-heading">Дата прибытия</p>
                            <p className="fixation-moving__info-row-text">23.02. 2022</p>
                        </div>
                        <div className="fixation-moving__info-rows-container">
                            <p className="fixation-moving__info-row-heading">Ограничения по задержке</p>
                            <p className="fixation-moving__info-row-text">3 рабочих дня</p>
                        </div>
                        <div className="fixation-moving__info-rows-container">
                            <p className="fixation-moving__info-row-heading">Адрес отправителя</p>
                            <p className="fixation-moving__info-row-text">Россия, Санкт-Петербург, Дворцовая площадь, 2</p>
                        </div>
                        <div className="fixation-moving__info-rows-container">
                            <p className="fixation-moving__info-row-heading">Адрес получателя</p>
                            <p className="fixation-moving__info-row-text">6 Rue des Francs Bourgeois, 75003 Paris</p>
                        </div>
                    </div>
                </div>
            )}
            {isMapSelected && (
                <YMaps>
                    <div className="fixation-moving__map-container">
                        <Map
                            defaultState={{ center: [59.939098, 30.315868], zoom: 8 }}
                            width={"100%"}
                            height={"100%"}
                        >
                        </Map>
                    </div>
                </YMaps>
            )}
        </div>
    );
}

export default FixationMoving;
