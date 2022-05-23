import React, { useState } from 'react';
import TablePagination from '../TablePagination/TablePagination';

function TrackingTable(props) {

    const {
        dataForRender,
        inputPlaceholder,
        isBoxesTabActive,
        isExhibitsTabActive,
        onBoxClick
    } = props;

    console.log(dataForRender);

    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    function statusText(status) {
        if (status === 'В пути, промежуточный пункт') {
            return 'В пути'
        } else if (status === 'Прибытие в пункт назначения') {
            return 'Прибыл'
        } else if (status === 'отправка отменена') {
            return 'Отменен'
        } else if (status === 'Хранение') {
            return 'Хранение'
        }
    }

    return (
        <div className='tracking-table'>
            <div className='tracking-table__under-table-container'>
                <div className='tracking-table__search-container'>
                    <div className='tracking-table__search-icon' />
                    <input type="text" placeholder={inputPlaceholder} className='tracking-table__search-input' />
                </div>
                <p className='tracking-table__results'>Найдено {dataForRender.length} ящика</p>
            </div>
            <div className='tracking-table__container'>
                <div className='tracking-table__rows tracking-table__rows_heading'>
                    <p className={`tracking-table__name ${isExhibitsTabActive && 'tracking-table__name_art-object'}`}>Название</p>
                    <p className={`tracking-table__route ${isExhibitsTabActive && 'tracking-table__route_exhibits'}`}>Маршрут</p>
                    <p className={`tracking-table__departure ${isExhibitsTabActive && 'tracking-table__departure_exhibits'}`}>Дата отправления</p>
                    <p className={`tracking-table__arrival ${isExhibitsTabActive && 'tracking-table__arrival_exhibits'}`}>Дата прибытия</p>
                    <p className='tracking-table__status'>Статус</p>
                </div>
                {dataForRender !== null ? (
                    <>
                        {dataForRender.slice(showResultsFrom, resultsShow).map((list) => (
                            <>
                                {isBoxesTabActive && (
                                    <div key={list.id} className='tracking-table__rows tracking-table__rows_boxes' onClick={() => onBoxClick(list)}>
                                        <p className='tracking-table__name'>{list.Box.name}</p>
                                        <p className='tracking-table__route'>{list.route}</p>
                                        <p className='tracking-table__departure'>{list.createdAt}</p>
                                        <p className='tracking-table__arrival'>{list.arrival}</p>
                                        <p className={`tracking-table__status ${statusText(list.status) === 'Прибыл' ? 'tracking-table__status_green' : `${statusText(list.status) === 'Отменен' && 'tracking-table__status_red'}`}`}>{statusText(list.status)}</p>
                                    </div>
                                )}
                                {isExhibitsTabActive && (
                                    <>
                                        {list.status !== 'Хранение' && (
                                            <div key={list.id} className='tracking-table__rows'>
                                                <img className='tracking-table__picture' alt={list.name} src={list.photo} />
                                                <p className='tracking-table__name tracking-table__name_exhibits'>{list.name}</p>
                                                <p className='tracking-table__route tracking-table__route_exhibits'>{list.route}</p>
                                                <p className='tracking-table__departure tracking-table__departure_exhibits'>{list.departure}</p>
                                                <p className='tracking-table__arrival tracking-table__arrival_exhibits'>{list.arrival}</p>
                                                <p className={`tracking-table__status ${statusText(list.status) === 'Прибыл' ? 'tracking-table__status_green' : `${statusText(list.status) === 'Отменен' && 'tracking-table__status_red'}`}`}>{statusText(list.status)}</p>
                                            </div>
                                        )}
                                    </>

                                )}
                            </>
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
        </div>
    );
}

export default TrackingTable;
