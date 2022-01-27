import React, { useState } from 'react';
import TablePagination from '../TablePagination/TablePagination';

function TrackingTable(props) {

    const {
        dataForRender,
        inputPlaceholder,
        onSearchClick
    } = props;

    const [isImgSortActive, setImgSortActive] = useState(false);
    const [isListSortActive, setListSortActive] = useState(true);
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    function onImgSortActiveClick() {
        setListSortActive(false);
        setImgSortActive(true);
    }

    function onListSortActiveClick() {
        setImgSortActive(false);
        setListSortActive(true);
    }


    return (
        <div className='tracking-table'>
            <div className='tracking-table__under-table-container'>
                <div className='tracking-table__search-container'>
                    <div className='tracking-table__search-icon' />
                    <input type="text" placeholder={inputPlaceholder} className='tracking-table__search-input' />
                    <button type='button' className='tracking-table__search-button' onClick={onSearchClick}>Поиск</button>
                </div>
                <div className={`tracking-table__img-sort-icon ${isImgSortActive && 'tracking-table__img-sort-icon_active'}`} onClick={onImgSortActiveClick} />
                <div className={`tracking-table__list-sort-icon ${isListSortActive && 'tracking-table__list-sort-icon_active'}`} onClick={onListSortActiveClick} />
            </div>
            {isListSortActive && (
                <div className='tracking-table__container'>
                    <div className='tracking-table__rows tracking-table__rows_heading'>
                        <p className='tracking-table__name'>Название</p>
                        <p className='tracking-table__route'>Маршрут</p>
                        <p className='tracking-table__weight'>Вес, кг</p>
                        <p className='tracking-table__dimensions'>Габариты, м</p>
                        <p className='tracking-table__departure'>Дата отправления</p>
                        <p className='tracking-table__arrival'>Дата прибытия</p>
                        <p className='tracking-table__status'>Статус</p>
                    </div>
                    {dataForRender !== null ? (
                        <>
                            {dataForRender.slice(showResultsFrom, resultsShow).map((list) => (
                                <div key={list.id} className='tracking-table__rows'>
                                    <p className='tracking-table__name'>{list.name}</p>
                                    <p className='tracking-table__route'>{list.route}</p>
                                    <p className='tracking-table__weight'>{list.weight}</p>
                                    <p className='tracking-table__dimensions'>{list.dimensions}</p>
                                    <p className='tracking-table__departure'>{list.departure}</p>
                                    <p className='tracking-table__arrival'>{list.arrival}</p>
                                    <p className={`tracking-table__status ${list.status === 'Прибыл' ? 'tracking-table__status_green' : `${list.status === 'Отменен' && 'tracking-table__status_red'}`}`}>{list.status}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className='tracking-table__rows'>
                            <p className='tracking-table__no-results-text'>Нет данных для отображения</p>
                        </div>
                    )}
                    <TablePagination
                        sortList={dataForRender}
                        handleShowResultsFrom={handleShowResultsFrom}
                        handleResultsShow={handleResultsShow}
                    />
                </div>
            )}
        </div>
    );
}

export default TrackingTable;
