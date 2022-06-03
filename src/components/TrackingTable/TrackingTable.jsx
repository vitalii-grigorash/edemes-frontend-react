import React, { useState, useEffect } from 'react';
import TablePagination from '../TablePagination/TablePagination';

function TrackingTable(props) {

    const {
        dataForRender,
        isBoxesTabActive,
        isExhibitsTabActive,
        isArtObjectsTabActive,
        onBoxClick,
        foundText,
        exhibitsText,
        boxesText,
        boxesSearchInput,
        artObjectsSearchInput,
        boxArtObjectsSearchInput,
        trackingSearchInput,
        isTableLoading
    } = props;

    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    useEffect(() => {
        if (isBoxesTabActive) {
            trackingSearchInput(boxesSearchInput.value);
        } else if (isExhibitsTabActive) {
            trackingSearchInput(artObjectsSearchInput.value);
        } else if (isArtObjectsTabActive) {
            trackingSearchInput(boxArtObjectsSearchInput.value);
        }
    },
        [
            artObjectsSearchInput.value,
            boxesSearchInput.value,
            boxArtObjectsSearchInput.value,
            isBoxesTabActive,
            isExhibitsTabActive,
            isArtObjectsTabActive,
            trackingSearchInput
        ]
    );

    function statusText(status) {
        if (status === 'В пути, промежуточный пункт') {
            return 'В пути'
        } else if (status === 'Прибытие в пункт назначения') {
            return 'Прибыл'
        } else if (status === 'отправка отменена') {
            return 'Отменен'
        } else if (status === 'Хранение') {
            return 'Хранение'
        } else if (status === 'Отправление') {
            return 'Отправка'
        } else if (status === 'Отмена отправки') {
            return 'Отменен'
        }
    }

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
        <div className='tracking-table'>
            <div className='tracking-table__under-table-container'>
                <div className='tracking-table__search-container'>
                    <div className='tracking-table__search-icon' />
                    {isBoxesTabActive && (
                        <input
                            type="text"
                            className='tracking-table__search-input'
                            name="trackingBoxesSearchInput"
                            placeholder='Введите название ящика'
                            value={boxesSearchInput.value}
                            onChange={boxesSearchInput.onChange}
                        />
                    )}
                    {isExhibitsTabActive && (
                        <input
                            type="text"
                            className='tracking-table__search-input'
                            name="trackingArtObjectsSearchInput"
                            placeholder='Введите название экспоната'
                            value={artObjectsSearchInput.value}
                            onChange={artObjectsSearchInput.onChange}
                        />
                    )}
                    {isArtObjectsTabActive && (
                        <input
                            type="text"
                            className='tracking-table__search-input'
                            name="trackingBoxArtObjectsSearchInput"
                            placeholder='Введите название экспоната'
                            value={boxArtObjectsSearchInput.value}
                            onChange={boxArtObjectsSearchInput.onChange}
                        />
                    )}
                </div>
                {isBoxesTabActive && (
                    <p className='tracking-table__results'>{foundText(dataForRender)} {dataForRender.length} {boxesText(dataForRender)}</p>
                )}
                {isExhibitsTabActive && (
                    <p className='tracking-table__results'>{foundText(dataForRender)} {exhibitsText(dataForRender)}</p>
                )}
                {isArtObjectsTabActive && (
                    <p className='tracking-table__results'>{foundText(dataForRender)} {exhibitsText(dataForRender)}</p>
                )}
            </div>
            <div className='tracking-table__container'>
                <div className='tracking-table__rows tracking-table__rows_heading'>
                    <p className={`tracking-table__name ${!isBoxesTabActive && 'tracking-table__name_art-object'}`}>Название</p>
                    <p className={`tracking-table__route ${!isBoxesTabActive && 'tracking-table__route_exhibits'}`}>Маршрут</p>
                    <p className={`tracking-table__departure ${!isBoxesTabActive && 'tracking-table__departure_exhibits'}`}>Дата отправления</p>
                    <p className={`tracking-table__arrival ${!isBoxesTabActive && 'tracking-table__arrival_exhibits'}`}>Дата прибытия</p>
                    <p className='tracking-table__status'>Статус</p>
                </div>
                {dataForRender !== null && dataForRender.length !== 0 ? (
                    <>
                        {dataForRender.slice(showResultsFrom, resultsShow).map((list) => (
                            <div key={list.id}>
                                {isBoxesTabActive ? (
                                    <div className='tracking-table__rows tracking-table__rows_boxes' onClick={() => onBoxClick(list)}>
                                        <p className='tracking-table__name'>{list.name}</p>
                                        <p className='tracking-table__route'>{routeConvert(list.locationFrom, list.locationTo)}</p>
                                        <p className='tracking-table__departure'>{departureDate(list.createdAt)}</p>
                                        <p className='tracking-table__arrival'>{arrivalDate(list.createdAt)}</p>
                                        <p className={`tracking-table__status ${statusText(list.status) === 'Прибыл' ? 'tracking-table__status_green' : `${statusText(list.status) === 'Отменен' && 'tracking-table__status_red'}`}`}>{statusText(list.status)}</p>
                                    </div>
                                ) : (
                                    <div key={list.id} className='tracking-table__rows'>
                                        <img className='tracking-table__picture' alt={list.name} src={list.photo} />
                                        <p className='tracking-table__name tracking-table__name_exhibits'>{list.name}</p>
                                        <p className='tracking-table__route tracking-table__route_exhibits'>{routeConvert(list.locationFrom, list.locationTo)}</p>
                                        <p className='tracking-table__departure tracking-table__departure_exhibits'>{departureDate(list.createdAt)}</p>
                                        <p className='tracking-table__arrival tracking-table__arrival_exhibits'>{arrivalDate(list.createdAt)}</p>
                                        <p className={`tracking-table__status ${statusText(list.status) === 'Прибыл' ? 'tracking-table__status_green' : `${statusText(list.status) === 'Отменен' && 'tracking-table__status_red'}`}`}>{statusText(list.status)}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                ) : (
                    <div className='tracking-table__rows'>
                        <p className='tracking-table__no-results-text'>{isTableLoading ? 'Загрузка...' : 'Нет данных для отображения'}</p>
                    </div>
                )}
                <TablePagination
                    sortList={dataForRender}
                    handleShowResultsFrom={handleShowResultsFrom}
                    handleResultsShow={handleResultsShow}
                />
            </div>
        </div>
    );
}

export default TrackingTable;
