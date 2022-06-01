import React from "react";

function FixationMoving(props) {

    const {
        box,
        fixList,
        isFixationPage
    } = props;

    console.log(box);

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
        <section className="fixation-moving">
            <div className='fixation-moving__info-container'>
                <p className="fixation-moving__info-heading">Информация о перемещении</p>
                <div className="fixation-moving__info-rows-container">
                    <p className="fixation-moving__info-row-heading">Маршрут</p>
                    {isFixationPage ? (
                        <p className="fixation-moving__info-row-text">{routeConvert(box.locationFrom, box.locationTo)}</p>
                    ) : (
                        <p className="fixation-moving__info-row-text">{routeConvert(box.from, box.to)}</p>
                    )}
                </div>
                <div className="fixation-moving__info-rows-container">
                    <p className="fixation-moving__info-row-heading">Текущее место положения</p>
                    <p className="fixation-moving__info-row-text">Россия, г. Луга</p>
                </div>
                <div className="fixation-moving__info-rows-container">
                    <p className="fixation-moving__info-row-heading">Дата отправления</p>
                    <p className="fixation-moving__info-row-text">{departureDate(box.box.createdAt)}</p>
                </div>
                <div className="fixation-moving__info-rows-container">
                    <p className="fixation-moving__info-row-heading">Дата прибытия</p>
                    <p className="fixation-moving__info-row-text">{arrivalDate(box.box.createdAt)}</p>
                </div>
                <div className="fixation-moving__info-rows-container">
                    <p className="fixation-moving__info-row-heading">Ограничения по задержке</p>
                    <p className="fixation-moving__info-row-text">3 рабочих дня</p>
                </div>
                <div className="fixation-moving__info-rows-container">
                    <p className="fixation-moving__info-row-heading">Адрес отправителя</p>
                    {isFixationPage ? (
                        <p className="fixation-moving__info-row-text">{box.locationFrom}</p>
                    ) : (
                        <p className="fixation-moving__info-row-text">{box.from}</p>
                    )}
                </div>
                <div className="fixation-moving__info-rows-container">
                    <p className="fixation-moving__info-row-heading">Адрес получателя</p>
                    {isFixationPage ? (
                        <p className="fixation-moving__info-row-text">{box.locationTo}</p>
                    ) : (
                        <p className="fixation-moving__info-row-text">{box.to}</p>
                    )}
                </div>
            </div>
            <div className='fixation-moving__steps-container'>
                {isFixationPage ? (
                    <>
                        {box.fixList.map((fix, index) => (
                            <div key={index} className="fixation-moving__step-container">
                                <div className="fixation-moving__step-number-container">
                                    {box.fixList.length - 1 === index ? (
                                        <div className="fixation-moving__step-check-icon" />
                                    ) : (
                                        <p className="fixation-moving__step-value">{index + 1}</p>
                                    )}
                                </div>
                                <div className="fixation-moving__step-info-container">
                                    <p className="fixation-moving__steps-info-status">{fix.status}</p>
                                    <p className="fixation-moving__steps-info-description">{fix.Location.name}</p>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {fixList.map((fix, index) => (
                            <div key={index} className="fixation-moving__step-container">
                                <div className="fixation-moving__step-number-container">
                                    {fixList.length - 1 === index ? (
                                        <div className="fixation-moving__step-check-icon" />
                                    ) : (
                                        <p className="fixation-moving__step-value">{index + 1}</p>
                                    )}
                                </div>
                                <div className="fixation-moving__step-info-container">
                                    <p className="fixation-moving__steps-info-status">{fix.status}</p>
                                    {/* Добавить сюда из API Location, а пока хардкод */}
                                    <p className="fixation-moving__steps-info-description">г. Санкт-Петербург, ул. Пушкина, д. 7</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </section >
    );
}

export default FixationMoving;
