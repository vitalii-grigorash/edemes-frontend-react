import React, { useState } from 'react';
import BoxRegistrationExhibitsTable from '../../utils/BoxRegistrationExhibitsTable.json';
import TablePagination from '../TablePagination/TablePagination';

function BoxRegistrationExhibits() {

    const [isDownloadContainerActive, setDownloadContainerActive] = useState(true);
    const [isTableContainerActive, setTableContainerActive] = useState(false);
    const [isImgSortActive, setImgSortActive] = useState(false);
    const [isListSortActive, setListSortActive] = useState(true);
    const [exhibitsList, setExhibitsList] = useState([]);
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    function onDownloadButtonClick() {
        setDownloadContainerActive(false);
        setTableContainerActive(true);
        setExhibitsList(BoxRegistrationExhibitsTable);
    }

    function onImgSortIconClick() {
        setListSortActive(false);
        setImgSortActive(true);
    }

    function onListSortIconClick() {
        setImgSortActive(false);
        setListSortActive(true);

    }

    return (
        <div className='box-registration-exhibits'>
            {isDownloadContainerActive && (
                <div className='box-registration-exhibits__download-container'>
                    <div className='box-registration-exhibits__download-img' />
                    <button type='button' className='box-registration-exhibits__download-button' onClick={onDownloadButtonClick}>Загрузить из каталога</button>
                </div>
            )}
            {isTableContainerActive && (
                <div className='box-registration-exhibits__table-container'>
                    <div className='box-registration-exhibits__table-heading'>
                        <div className='box-registration-exhibits__table-heading-success-icon' />
                        <p className='box-registration-exhibits__table-heading-success-text'>Каталог загружен</p>
                        <div
                            className={`box-registration-exhibits__table-heading-img-sort-icon ${isImgSortActive && 'box-registration-exhibits__table-heading-img-sort-icon_active'}`}
                            onClick={onImgSortIconClick}
                        />
                        <div
                            className={`box-registration-exhibits__table-heading-list-sort-icon ${isListSortActive && 'box-registration-exhibits__table-heading-list-sort-icon_active'}`}
                            onClick={onListSortIconClick}
                        />
                    </div>
                    {isListSortActive && (
                        <div className='box-registration-exhibits__table'>
                            <div className='box-registration-exhibits__table-rows box-registration-exhibits__table-rows_heading'>
                                <p className='box-registration-exhibits__name'>Название</p>
                                <p className='box-registration-exhibits__weight'>Вес, кг</p>
                                <p className='box-registration-exhibits__dimensions'>Габариты, м</p>
                                <p className='box-registration-exhibits__storage'>Место хранения</p>
                                <p className='box-registration-exhibits__requirements'>Требования</p>
                            </div>
                            {exhibitsList !== null ? (
                                <>
                                    {exhibitsList.slice(showResultsFrom, resultsShow).map((list) => (
                                        <div key={list.id} className='box-registration-exhibits__table-rows'>
                                            <p className='box-registration-exhibits__name'>{list.name}</p>
                                            <p className='box-registration-exhibits__weight'>{list.weight}</p>
                                            <p className='box-registration-exhibits__dimensions'>{list.dimensions}</p>
                                            <p className='box-registration-exhibits__storage'>{list.storage}</p>
                                            <p className='box-registration-exhibits__requirements'>{list.requirements}</p>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className='box-registration-exhibits__table-rows'>
                                    <p className='box-registration-exhibits__no-results-text'>Необходимо загрузить каталог</p>
                                </div>
                            )}

                            <TablePagination
                                exhibitsList={exhibitsList}
                                handleShowResultsFrom={handleShowResultsFrom}
                                handleResultsShow={handleResultsShow}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}

export default BoxRegistrationExhibits;