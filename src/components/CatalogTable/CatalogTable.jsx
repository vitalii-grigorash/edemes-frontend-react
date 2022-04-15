import React, { useState } from 'react';
import TablePagination from '../TablePagination/TablePagination';

function CatalogTable(props) {

    const {
        catalogName,
        category,
        exhibits,
        onCatalogBackClick,
        exhibitsText
    } = props;

    const [isImgSortActive, setImgSortActive] = useState(false);
    const [isListSortActive, setListSortActive] = useState(true);
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);

    const foundText = (array) => {
        const value = array.length % 10;
        const doubleValue = array.length;
        if (doubleValue === 11 || doubleValue === 12 || doubleValue === 13 || doubleValue === 14) {
            return 'Найдено'
        }
        if (value === 1) {
            return 'Найден'
        }
        return 'Найдено'
    }

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
        <div className="catalog-table">
            <div className='catalog-table__heading-container'>
                <p className='catalog-table__heading-nav-text'>Каталог</p>
                <div className='catalog-table__heading-nav-arrow' />
                <p className='catalog-table__heading-nav-text catalog-table__heading-nav-text_name'>{catalogName}</p>
                <button type='button' className='catalog-table__heading-button-back' onClick={onCatalogBackClick}>Вернуться в каталог</button>
            </div>
            <div className='catalog-table__main-container'>
                <div className='catalog-table__heading-container-mobile'>
                    <p className='catalog-table__heading-nav-text'>Каталог</p>
                    <div className='catalog-table__heading-nav-arrow' />
                    <p className='catalog-table__heading-nav-text catalog-table__heading-nav-text_name'>{catalogName}</p>
                    <button type='button' className='catalog-table__heading-button-back' onClick={onCatalogBackClick}>Вернуться в каталог</button>
                </div>
                <div className='catalog-table__main-container-heading'>
                    <p className='catalog-table__main-container-results'>{foundText(exhibits)} {exhibits.length} {exhibitsText(exhibits)}</p>
                    <div className={`catalog-table__main-container-img-sort-icon ${isImgSortActive && 'catalog-table__main-container-img-sort-icon_active'}`} onClick={onImgSortActiveClick} />
                    <div className={`catalog-table__main-container-list-sort-icon ${isListSortActive && 'catalog-table__main-container-list-sort-icon_active'}`} onClick={onListSortActiveClick} />
                </div>
                {isListSortActive && (
                    <div className='catalog-table__container'>
                        <div className='catalog-table__rows catalog-table__rows_heading'>
                            <p className='catalog-table__name'>Название</p>
                            <p className='catalog-table__category'>Категория</p>
                            <p className='catalog-table__weight'>Вес, кг</p>
                            <p className='catalog-table__dimensions'>Габариты, м</p>
                            <p className='catalog-table__storage'>Место хранения</p>
                            <p className='catalog-table__requirements'>Требования</p>
                        </div>
                        {exhibits !== null ? (
                            <>
                                {exhibits.slice(showResultsFrom, resultsShow).map((list) => (
                                    <div key={list.id} className='catalog-table__rows'>
                                        <p className='catalog-table__name'>{list.name}</p>
                                        <p className='catalog-table__category'>{category}</p>
                                        <p className='catalog-table__weight'>{list.weight}</p>
                                        <p className='catalog-table__dimensions'>{list.dimensions}</p>
                                        <p className='catalog-table__storage'>{list.storage}</p>
                                        <p className='catalog-table__requirements'>{list.requirements}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className='tracking-table__rows'>
                                <p className='tracking-table__no-results-text'>Нет данных для отображения</p>
                            </div>
                        )}
                        <TablePagination
                            sortList={exhibits}
                            handleShowResultsFrom={handleShowResultsFrom}
                            handleResultsShow={handleResultsShow}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CatalogTable;
