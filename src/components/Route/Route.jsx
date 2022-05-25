import React from 'react';

function Route(props) {

    const {
        box,
        onDisbandButtonClick,
    } = props;

    function departureDate(date) {
        const dateArray = date.split(' ');
        return `${dateArray[0] + '.' + dateArray[1] + '.' + dateArray[2]}`;
    }

    function arrivalDate(date) {
        const dateArray = date.split(' ');
        return `${(Number(dateArray[0]) + 3) + '.' + dateArray[1] + '.' + dateArray[2]}`;
    }

    function routeConvert(from, to) {
        if (from !== undefined) {
            const routeFrom = from.split(',')[0].split('. ')[1];
            const routeTo = to.split(',')[0].split('. ')[1];
            return routeFrom + ' - ' + routeTo;
        }
    }

    return (
        <section className="route">
            <div className='route__info-container'>
                <p className="route__info-heading">Информация о перемещении</p>
                <div className="route__info-rows-container">
                    <p className="route__info-row-heading">Маршрут</p>
                    <p className="route__info-row-text">{routeConvert(box.locationFrom, box.locationTo)}</p>
                </div>
                <div className="route__info-rows-container">
                    <p className="route__info-row-heading">Текущее место положения</p>
                    <p className="route__info-row-text">Россия, г. Луга</p>
                </div>
                <div className="route__info-rows-container">
                    <p className="route__info-row-heading">Дата отправления</p>
                    <p className="route__info-row-text">{departureDate(box.createdAt)}</p>
                </div>
                <div className="route__info-rows-container">
                    <p className="route__info-row-heading">Дата прибытия</p>
                    <p className="route__info-row-text">{arrivalDate(box.createdAt)}</p>
                </div>
                <div className="route__info-rows-container">
                    <p className="route__info-row-heading">Ограничения по задержке</p>
                    <p className="route__info-row-text">3 рабочих дня</p>
                </div>
                <div className="route__info-rows-container">
                    <p className="route__info-row-heading">Адрес отправителя</p>
                    <p className="route__info-row-text">{box.locationFrom}</p>
                </div>
                <div className="route__info-rows-container">
                    <p className="route__info-row-heading">Адрес получателя</p>
                    <p className="route__info-row-text">{box.locationTo}</p>
                </div>
                {box.status === "Отмена отправки" ? (
                    <></>
                ) : (
                    <button className='route__disband-button' type="button" onClick={() => onDisbandButtonClick(box.id)}>Расформировать</button>
                )}
            </div>
            <div className='route__steps-container'>
                <div className="route__steps-numbers-container">
                    <div className="route__step-container">
                        <div className="route__step-check-icon" />
                    </div>
                    <div className="route__step-line" />
                    <div className="route__step-container">
                        <p className="route__step-value">2</p>
                    </div>
                    <div className="route__step-line" />
                    <div className="route__step-container">
                        <p className="route__step-value">3</p>
                    </div>
                    <div className="route__step-line" />
                    <div className="route__step-container">
                        <p className="route__step-value">4</p>
                    </div>
                    <div className="route__step-line" />
                    <div className="route__step-container">
                        <p className="route__step-value">5</p>
                    </div>
                </div>
                <div className="route__steps-info-container">
                    <div className="route__step-info-container">
                        <p className="route__steps-info-status">Создано</p>
                        <p className="route__steps-info-description">Объект упаковывается и готовятся документы</p>
                    </div>
                    <div className="route__step-info-container">
                        <p className="route__steps-info-status">Создано</p>
                        <p className="route__steps-info-description">Объект упаковывается и готовятся документы</p>
                    </div>
                    <div className="route__step-info-container">
                        <p className="route__steps-info-status">Создано</p>
                        <p className="route__steps-info-description">Объект упаковывается и готовятся документы</p>
                    </div>
                    <div className="route__step-info-container">
                        <p className="route__steps-info-status">Создано</p>
                        <p className="route__steps-info-description">Объект упаковывается и готовятся документы</p>
                    </div>
                    <div className="route__step-info-container">
                        <p className="route__steps-info-status">Создано</p>
                        <p className="route__steps-info-description">Объект упаковывается и готовятся документы</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Route;
