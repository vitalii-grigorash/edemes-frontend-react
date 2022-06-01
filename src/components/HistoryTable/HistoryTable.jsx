import React, { useState, useEffect } from 'react';
import TablePagination from '../TablePagination/TablePagination';

function HistoryTable(props) {

    const {
        dataForRender,
        onBoxClick,
        foundText,
        boxesText,
        boxesSearchInput,
        historySearchInput
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
        historySearchInput(boxesSearchInput.value);
    }, [boxesSearchInput.value, historySearchInput]);

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

    function fixDate(date) {
        const dateArray = date.split(' ');
        return `${dateArray[0] + '.' + dateArray[1] + '.' + dateArray[2]}`;
    }

    function routeConvert(from, to) {
        if (from !== undefined) {
            const routeFrom = from.split(',')[0].split('. ')[1];
            const routeTo = to.split(',')[0].split('. ')[1];
            return routeFrom + ' - ' + routeTo;
        }
    }

    return (
        <div className='history-table'>
            <div className='history-table__under-table-container'>
                <div className='history-table__search-container'>
                    <div className='history-table__search-icon' />
                    <input
                        type="text"
                        className='history-table__search-input'
                        name="historyBoxesSearchInput"
                        placeholder='Введите название ящика'
                        value={boxesSearchInput.value}
                        onChange={boxesSearchInput.onChange}
                    />
                </div>
                <p className='history-table__results'>{foundText(dataForRender)} {dataForRender.length} {boxesText(dataForRender)}</p>
            </div>
            <div className='history-table__container'>
                <div className='history-table__rows history-table__rows_heading'>
                    <p className='history-table__name'>Название</p>
                    <p className='history-table__route'>Маршрут</p>
                    <p className='history-table__fix-date'>Дата фиксации</p>
                    <p className='history-table__status'>Статус</p>
                </div>
                {dataForRender !== null && dataForRender.length !== 0 ? (
                    <>
                        {dataForRender.slice(showResultsFrom, resultsShow).map((list) => (
                            <div key={list.id} className='history-table__rows' onClick={() => onBoxClick(list)}>
                                <p className='history-table__name'>{list.name}</p>
                                <p className='history-table__route'>{routeConvert(list.from, list.to)}</p>
                                <p className='history-table__fix-date'>{fixDate(list.createdAt)}</p>
                                <p className={`history-table__status ${statusText(list.status) === 'Прибыл' ? 'history-table__status_green' : `${statusText(list.status) === 'Отменен' && 'history-table__status_red'}`}`}>{statusText(list.status)}</p>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className='history-table__rows history-table__rows_no-results'>
                        <p className='history-table__no-results-text'>Нет данных для отображения</p>
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

export default HistoryTable;
