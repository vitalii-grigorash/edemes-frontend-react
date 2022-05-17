import React from 'react';

function ArtObjectInfo(props) {

    const {
        artObject
    } = props;

    return (
        <div className='art-object-info'>
            <h1 className='art-object-info__heading'>Брейгель, Ян Старший (Бархатный). 1568-1625</h1>
            <div className='art-object-info__main-container'>
                <div className='art-object-info__table-container'>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Автор</p>
                        <p className='art-object-info__table-rows'>Брейгель, Ян Старший (Бархатный). 1568-1625</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Название</p>
                        <p className='art-object-info__table-rows'>Ферма</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Место создания/школа</p>
                        <p className='art-object-info__table-rows'>Фландрия</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Материал, техника</p>
                        <p className='art-object-info__table-rows'>Холст; масло</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Размер</p>
                        <p className='art-object-info__table-rows'>48,5х40 см</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Год поступления</p>
                        <p className='art-object-info__table-rows'>1919</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Инвентарный номер</p>
                        <p className='art-object-info__table-rows'>ГЭ-4999</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Категория</p>
                        <p className='art-object-info__table-rows'>Живопись</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Отдел/сектор</p>
                        <p className='art-object-info__table-rows'>Западная живопись и Скульптура</p>
                    </div>
                    <div className='art-object-info__table-rows-container'>
                        <p className='art-object-info__table-rows art-object-info__table-rows_heading'>Коллекция</p>
                        <p className='art-object-info__table-rows'>Западноевропейская живопись</p>
                    </div>
                </div>
                <img className='art-object-info__img' alt='Изображение экспоната' src={artObject.photo} />
            </div>
        </div>
    );

}

export default ArtObjectInfo;
