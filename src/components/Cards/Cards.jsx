import React, { useEffect, useState } from 'react';
import { Validation } from '../../utils/Validation';
import Card from '../Card/Card';
import Table from '../Table/Table';
import ArtObjectInfo from '../ArtObjectInfo/ArtObjectInfo';
import TablePagination from '../TablePagination/TablePagination';

function Cards(props) {

    const {
        catalogs,
        onSelectCatalogClick,
        onDeselectCatalogClick,
        selectedArtObjects,
        onOpenCatalogClick,
        artObjects,
        onSelectArtObjectClick,
        onDeselectArtObjectClick,
        handleArtObjectsActive,
        isCatalogsActive,
        isArtObjectsActive,
        showArtObjectInfo,
        isArtObjectInfoOpen,
        artObject,
        onShowAddedArtObjectsClick,
        isSelectedArtObjectsActive,
    } = props;

    const searchInput = Validation();
    const [isCardActive, setCardActive] = useState(true);
    const [isTableActive, setTableActive] = useState(false);
    const [isCatalogNameActive, setCatalogNameActive] = useState(false);
    const [openedCatalogName, setOpenedCatalogName] = useState('');
    const [isSelctedArtObjectsHeadingActive, setSelctedArtObjectsHeadingActive] = useState(false);
    const [showResultsFromCatalogs, setShowResultsFromCatalogs] = useState(0);
    const [resultsShowCatalogs, setResultsShowCatalogs] = useState(10);
    const [showResultsFromArtObject, setShowResultsFromArtObject] = useState(0);
    const [resultsShowArtObject, setResultsShowArtObject] = useState(10);
    const [showResultsFromSelectedArtObjects, setShowResultsFromSelectedArtObjects] = useState(0);
    const [resultsShowSelectedArtObjects, setResultsShowSelectedArtObjects] = useState(10);
    const [dataForPagination, setDataForPagination] = useState([]);

    function handleShowResultsFrom(value) {
        if (isCatalogsActive) {
            setShowResultsFromCatalogs(value);
        } else if (isArtObjectsActive) {
            setShowResultsFromArtObject(value);
        } else if (isSelectedArtObjectsActive) {
            setShowResultsFromSelectedArtObjects(value);
        }
    }

    function handleResultsShow(value) {
        if (isCatalogsActive) {
            setResultsShowCatalogs(value);
        } else if (isArtObjectsActive) {
            setResultsShowArtObject(value);
        } else if (isSelectedArtObjectsActive) {
            setResultsShowSelectedArtObjects(value);
        }
    }

    useEffect(() => {
        if (isCatalogsActive) {
            setDataForPagination(catalogs);
            setShowResultsFromCatalogs(0);
            setResultsShowCatalogs(10);
        } else if (isArtObjectsActive) {
            setDataForPagination(artObjects);
            setShowResultsFromArtObject(0);
            setResultsShowArtObject(10);
        } else if (isSelectedArtObjectsActive) {
            setDataForPagination(selectedArtObjects);
            setShowResultsFromSelectedArtObjects(0);
            setResultsShowSelectedArtObjects(10);
        }
    }, [isCatalogsActive, catalogs, isArtObjectsActive, artObjects, isSelectedArtObjectsActive, selectedArtObjects]);

    function showCatalogName(catalog) {
        setCatalogNameActive(true);
        setOpenedCatalogName(catalog.name);
    }

    useEffect(() => {
        if (isCatalogsActive) {
            setCatalogNameActive(false);
            setSelctedArtObjectsHeadingActive(false);
        }
    }, [isCatalogsActive]);

    useEffect(() => {
        if (isSelectedArtObjectsActive) {
            setSelctedArtObjectsHeadingActive(true);
            setCatalogNameActive(false);
        }
    }, [isSelectedArtObjectsActive]);

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

    const exhibitsText = (array) => {
        const value = array.length % 10;
        const doubleValue = array.length;
        if (doubleValue === 11 || doubleValue === 12 || doubleValue === 13 || doubleValue === 14) {
            return 'экспонатов'
        }
        if (value === 1) {
            return 'экспонат'
        } else if (value === 2 || value === 3 || value === 4) {
            return 'экспоната'
        }
        return 'экспонатов'
    }

    const catalogsText = (array) => {
        const value = array.length % 10;
        const doubleValue = array.length;
        if (doubleValue === 11 || doubleValue === 12 || doubleValue === 13 || doubleValue === 14) {
            return 'каталогов'
        }
        if (value === 1) {
            return 'каталог'
        } else if (value === 2 || value === 3 || value === 4) {
            return 'каталога'
        }
        return 'каталогов'
    }

    function onSearchButtonClick() {
        console.log(searchInput.value);
        searchInput.setValue('');
    }

    function handleCardActive() {
        setTableActive(false);
        setCardActive(true);
    }

    function handleTableActive() {
        setCardActive(false);
        setTableActive(true);
    }

    return (
        <div className="cards">
            {!isArtObjectInfoOpen ? (
                <>
                    {isCatalogNameActive && (
                        <p className='cards__under-heading-text'>Каталог: {openedCatalogName}</p>
                    )}
                    {isSelctedArtObjectsHeadingActive && (
                        <p className='cards__under-heading-text'>Добавленные экспонаты</p>
                    )}
                    <div className='cards__heading-container'>
                        <div className='cards__search-container'>
                            <div className='cards__search-icon' />
                            <input
                                type="text"
                                className='cards__search-input'
                                name="searchInput"
                                placeholder='Поиск'
                                value={searchInput.value}
                                onChange={searchInput.onChange}
                            />
                            <button type='button' className='cards__search-button' onClick={onSearchButtonClick}>Поиск</button>
                        </div>
                        <div className='cards__added-container' onClick={onShowAddedArtObjectsClick}>
                            <div className='cards__added-img-container'>
                                <div className='cards__added-value-container'>
                                    <p className='cards__added-value'>{selectedArtObjects.length}</p>
                                </div>
                            </div>
                            <p className='cards__added-text'>Добавлено</p>
                        </div>
                    </div>
                    <div className='cards__table-heding-container'>
                        {isCatalogsActive && (
                            <p className='cards__table-heding-value'>{foundText(catalogs)} {catalogs.length} {catalogsText(catalogs)}</p>
                        )}
                        {isArtObjectsActive && (
                            <p className='cards__table-heding-value'>{foundText(artObjects)} {artObjects.length} {exhibitsText(artObjects)}</p>
                        )}
                        {isSelectedArtObjectsActive && (
                            <p className='cards__table-heding-value'>{foundText(selectedArtObjects)} {selectedArtObjects.length} {exhibitsText(selectedArtObjects)}</p>
                        )}
                        <div className='cards__table-heding-switch-container'>
                            <div className={`cards__table-heding-switch-card ${isCardActive && 'cards__table-heding-switch-card_active'}`} onClick={handleCardActive} />
                            <div className={`cards__table-heding-switch-table ${isTableActive && 'cards__table-heding-switch-table_active'}`} onClick={handleTableActive} />
                        </div>
                    </div>
                    {isCardActive && (
                        <div className='cards__card'>
                            {isCatalogsActive && (
                                <>
                                    {catalogs.map((catalog) => (
                                        <Card
                                            isCatalogsActive={isCatalogsActive}
                                            isArtObjectsActive={isArtObjectsActive}
                                            isSelectedArtObjectsActive={isSelectedArtObjectsActive}
                                            key={catalog.id}
                                            id={catalog.id}
                                            card={catalog}
                                            name={catalog.name}
                                            picture={catalog.picture}
                                            onSelectCardClick={onSelectCatalogClick}
                                            onDeselectCardClick={onDeselectCatalogClick}
                                            onOpenCatalogClick={onOpenCatalogClick}
                                            handleArtObjectsActive={handleArtObjectsActive}
                                            showArtObjectInfo={showArtObjectInfo}
                                            selectedArtObjects={selectedArtObjects}
                                            showCatalogName={showCatalogName}
                                        />
                                    ))}
                                </>
                            )}
                            {isArtObjectsActive && (
                                <>
                                    {artObjects.length !== 0 ? (
                                        <>
                                            {artObjects.map((artObject) => (
                                                <Card
                                                    isCatalogsActive={isCatalogsActive}
                                                    isArtObjectsActive={isArtObjectsActive}
                                                    isSelectedArtObjectsActive={isSelectedArtObjectsActive}
                                                    key={artObject.id}
                                                    id={artObject.id}
                                                    card={artObject}
                                                    name={artObject.name}
                                                    picture={artObject.photo}
                                                    onSelectCardClick={onSelectArtObjectClick}
                                                    onDeselectCardClick={onDeselectArtObjectClick}
                                                    onOpenCatalogClick={onOpenCatalogClick}
                                                    handleArtObjectsActive={handleArtObjectsActive}
                                                    showArtObjectInfo={showArtObjectInfo}
                                                    selectedArtObjects={selectedArtObjects}
                                                    showCatalogName={showCatalogName}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <div className='cards__not-found'>
                                            <p className='cards__not-found-text'>В каталоге нет экспонатов</p>
                                        </div>
                                    )}
                                </>
                            )}
                            {isSelectedArtObjectsActive && (
                                <>
                                    {selectedArtObjects.length !== 0 ? (
                                        <>
                                            {selectedArtObjects.map((artObject) => (
                                                <Card
                                                    isCatalogsActive={isCatalogsActive}
                                                    isArtObjectsActive={isArtObjectsActive}
                                                    isSelectedArtObjectsActive={isSelectedArtObjectsActive}
                                                    key={artObject.id}
                                                    id={artObject.id}
                                                    card={artObject}
                                                    name={artObject.name}
                                                    picture={artObject.photo}
                                                    onSelectCardClick={onSelectArtObjectClick}
                                                    onDeselectCardClick={onDeselectArtObjectClick}
                                                    onOpenCatalogClick={onOpenCatalogClick}
                                                    handleArtObjectsActive={handleArtObjectsActive}
                                                    showArtObjectInfo={showArtObjectInfo}
                                                    selectedArtObjects={selectedArtObjects}
                                                    showCatalogName={showCatalogName}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <div className='cards__not-found'>
                                            <p className='cards__not-found-text'>Необходимо добавить экспонаты</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    {isTableActive && (
                        <div className='cards__table'>
                            <div className='cards__table-heading-row-container'>
                                <p className='cards__table-heading-row-text cards__table-heading-row-text_name'>Название</p>
                                <p className='cards__table-heading-row-text'>{isCatalogsActive ? 'Добавлено экспонатов' : 'Описание'}</p>
                            </div>
                            {isCatalogsActive && (
                                <>
                                    {catalogs.slice(showResultsFromCatalogs, resultsShowCatalogs).map((catalog) => (
                                        <Table
                                            isCatalogsActive={isCatalogsActive}
                                            isArtObjectsActive={isArtObjectsActive}
                                            isSelectedArtObjectsActive={isSelectedArtObjectsActive}
                                            key={catalog.id}
                                            id={catalog.id}
                                            card={catalog}
                                            name={catalog.name}
                                            picture={catalog.picture}
                                            onSelectCardClick={onSelectCatalogClick}
                                            onDeselectCardClick={onDeselectCatalogClick}
                                            onOpenCatalogClick={onOpenCatalogClick}
                                            handleArtObjectsActive={handleArtObjectsActive}
                                            showArtObjectInfo={showArtObjectInfo}
                                            selectedArtObjects={selectedArtObjects}
                                            showCatalogName={showCatalogName}
                                        />
                                    ))}
                                    <TablePagination
                                        sortList={dataForPagination}
                                        handleShowResultsFrom={handleShowResultsFrom}
                                        handleResultsShow={handleResultsShow}
                                    />
                                </>
                            )}
                            {isArtObjectsActive && (
                                <>
                                    {artObjects.length !== 0 ? (
                                        <>
                                            {artObjects.slice(showResultsFromArtObject, resultsShowArtObject).map((artObject) => (
                                                <Table
                                                    isCatalogsActive={isCatalogsActive}
                                                    isArtObjectsActive={isArtObjectsActive}
                                                    isSelectedArtObjectsActive={isSelectedArtObjectsActive}
                                                    key={artObject.id}
                                                    id={artObject.id}
                                                    card={artObject}
                                                    name={artObject.name}
                                                    picture={artObject.photo}
                                                    onSelectCardClick={onSelectArtObjectClick}
                                                    onDeselectCardClick={onDeselectArtObjectClick}
                                                    onOpenCatalogClick={onOpenCatalogClick}
                                                    handleArtObjectsActive={handleArtObjectsActive}
                                                    showArtObjectInfo={showArtObjectInfo}
                                                    selectedArtObjects={selectedArtObjects}
                                                    showCatalogName={showCatalogName}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <div className='cards__table-not-found'>
                                            <p className='cards__table-not-found-text'>В каталоге нет экспонатов</p>
                                        </div>
                                    )}
                                    <TablePagination
                                        sortList={dataForPagination}
                                        handleShowResultsFrom={handleShowResultsFrom}
                                        handleResultsShow={handleResultsShow}
                                    />
                                </>
                            )}
                            {isSelectedArtObjectsActive && (
                                <>
                                    {selectedArtObjects.length !== 0 ? (
                                        <>
                                            {selectedArtObjects.slice(showResultsFromSelectedArtObjects, resultsShowSelectedArtObjects).map((artObject) => (
                                                <Table
                                                    isCatalogsActive={isCatalogsActive}
                                                    isArtObjectsActive={isArtObjectsActive}
                                                    isSelectedArtObjectsActive={isSelectedArtObjectsActive}
                                                    key={artObject.id}
                                                    id={artObject.id}
                                                    card={artObject}
                                                    name={artObject.name}
                                                    picture={artObject.photo}
                                                    onSelectCardClick={onSelectArtObjectClick}
                                                    onDeselectCardClick={onDeselectArtObjectClick}
                                                    onOpenCatalogClick={onOpenCatalogClick}
                                                    handleArtObjectsActive={handleArtObjectsActive}
                                                    showArtObjectInfo={showArtObjectInfo}
                                                    selectedArtObjects={selectedArtObjects}
                                                    showCatalogName={showCatalogName}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <div className='cards__table-not-found'>
                                            <p className='cards__table-not-found-text'>Необходимо добавить экспонаты</p>
                                        </div>
                                    )}
                                    <TablePagination
                                        sortList={dataForPagination}
                                        handleShowResultsFrom={handleShowResultsFrom}
                                        handleResultsShow={handleResultsShow}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <ArtObjectInfo
                    artObject={artObject}
                />
            )}
        </div>
    );

}

export default Cards;
