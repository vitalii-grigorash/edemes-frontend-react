import React from "react";

function FixationGeneralInformation() {

    return (
        <div className='fixation-general-information'>
            <div className='fixation-general-information__table-container'>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Название</p>
                    <p className='fixation-general-information__table-row-text'>Ящик 1</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Вес, кг</p>
                    <p className='fixation-general-information__table-row-text'>32</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Экспонаты, шт</p>
                    <p className='fixation-general-information__table-row-text'>1 234</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Габариты, м</p>
                    <p className='fixation-general-information__table-row-text'>0.1 * 0.4 * 0.6</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Маршрут</p>
                    <p className='fixation-general-information__table-row-text'>Санкт-Петербург - Париж</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Дата отправления</p>
                    <p className='fixation-general-information__table-row-text'>12.12.2022</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Дата прибытия</p>
                    <p className='fixation-general-information__table-row-text'>13.05.2022</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Ограничения</p>
                    <p className='fixation-general-information__table-row-text'>Осторожно, хрупко</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Стоимость,  ₽</p>
                    <p className='fixation-general-information__table-row-text'>1 234 567</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Температура,  °С</p>
                    <p className='fixation-general-information__table-row-text'>20</p>
                    <div className='fixation-general-information__table-row-edit-button' />
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-row-text fixation-general-information__table-row-text_heading'>Влажность,  %</p>
                    <p className='fixation-general-information__table-row-text'>10</p>
                    <div className='fixation-general-information__table-row-edit-button' />
                </div>
            </div>
            <div className="fixation-general-information__img-container">
                <div className="fixation-general-information__img" />
                <button type="button" className="fixation-general-information__img-add-button">Добавить фото</button>
            </div>
        </div>
    );
}

export default FixationGeneralInformation;
