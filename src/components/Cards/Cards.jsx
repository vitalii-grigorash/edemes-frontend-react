import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Table from '../Table/Table';
import ArtObjectInfo from '../ArtObjectInfo/ArtObjectInfo';
import TablePagination from '../TablePagination/TablePagination';
import { useLocation } from 'react-router-dom';

function Cards(props) {

    const {
        catalogsForRender,
        onSelectCatalogClick,
        onDeselectCatalogClick,
        selectedArtObjects,
        selectedArtObjectsForRender,
        onOpenCatalogClick,
        artObjectsForRender,
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
        isCardActive,
        handleCardActive,
        isTableActive,
        handleTableActive,
        boxRegistrationSearchInput,
        searchInputCatalogs,
        searchInputArtObjects,
        searchInputSelectedArtObjects
    } = props;

    const { pathname } = useLocation();
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
            setDataForPagination(catalogsForRender);
            setShowResultsFromCatalogs(0);
            setResultsShowCatalogs(10);
        } else if (isArtObjectsActive) {
            setDataForPagination(artObjectsForRender);
            setShowResultsFromArtObject(0);
            setResultsShowArtObject(10);
        } else if (isSelectedArtObjectsActive) {
            setDataForPagination(selectedArtObjectsForRender);
            setShowResultsFromSelectedArtObjects(0);
            setResultsShowSelectedArtObjects(10);
        }
    }, [isCatalogsActive, catalogsForRender, isArtObjectsActive, artObjectsForRender, isSelectedArtObjectsActive, selectedArtObjectsForRender]);

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

    useEffect(() => {
        if (isCatalogsActive) {
            boxRegistrationSearchInput(searchInputCatalogs.value);
        } else if (isArtObjectsActive) {
            boxRegistrationSearchInput(searchInputArtObjects.value);
        } else if (isSelectedArtObjectsActive) {
            boxRegistrationSearchInput(searchInputSelectedArtObjects.value);
        }
    },
        [
            boxRegistrationSearchInput,
            isCatalogsActive,
            searchInputCatalogs.value,
            isArtObjectsActive,
            searchInputArtObjects.value,
            isSelectedArtObjectsActive,
            searchInputSelectedArtObjects.value
        ]
    );

    return (
        <div className={`cards ${pathname === '/catalog' && 'cards_catalog'}`}>
            {!isArtObjectInfoOpen ? (
                <>
                    {pathname !== '/catalog' ? (
                        <>
                            {isCatalogNameActive && (
                                <p className='cards__under-heading-text'>Каталог: {openedCatalogName}</p>
                            )}
                            {isSelctedArtObjectsHeadingActive && (
                                <p className='cards__under-heading-text'>Добавленные экспонаты</p>
                            )}
                        </>
                    ) : (
                        <>
                            {isCatalogNameActive && (
                                <p className='cards__under-heading-text-catalog'>Каталог: {openedCatalogName}</p>
                            )}
                            {isSelctedArtObjectsHeadingActive && (
                                <p className='cards__under-heading-text-catalog'>Добавленные экспонаты</p>
                            )}
                            <div className='cards__mobile-heading'>
                                {!isCatalogNameActive && !isSelctedArtObjectsHeadingActive && (
                                    <p className='cards__mobile-heading-text'>Каталоги</p>
                                )}
                                {isCatalogNameActive && (
                                    <p className='cards__mobile-heading-text'>Каталог: {openedCatalogName}</p>
                                )}
                                {isSelctedArtObjectsHeadingActive && (
                                    <p className='cards__mobile-heading-text'>Добавленные экспонаты</p>
                                )}
                                <div className='cards__added-mobile-container' onClick={onShowAddedArtObjectsClick}>
                                    <div className='cards__added-img-container'>
                                        <div className='cards__added-value-container'>
                                            <p className='cards__added-value'>{selectedArtObjects.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className='cards__heading-container'>
                        {isCatalogsActive && (
                            <div className='cards__search-container'>
                                <div className='cards__search-icon' />
                                <input
                                    type="text"
                                    className='cards__search-input'
                                    name="searchInput"
                                    placeholder='Введите название'
                                    value={searchInputCatalogs.value}
                                    onChange={searchInputCatalogs.onChange}
                                />
                            </div>
                        )}
                        {isArtObjectsActive && (
                            <div className='cards__search-container'>
                                <div className='cards__search-icon' />
                                <input
                                    type="text"
                                    className='cards__search-input'
                                    name="searchInput"
                                    placeholder='Введите название'
                                    value={searchInputArtObjects.value}
                                    onChange={searchInputArtObjects.onChange}
                                />
                            </div>
                        )}
                        {isSelectedArtObjectsActive && (
                            <div className='cards__search-container'>
                                <div className='cards__search-icon' />
                                <input
                                    type="text"
                                    className='cards__search-input'
                                    name="searchInput"
                                    placeholder='Введите название'
                                    value={searchInputSelectedArtObjects.value}
                                    onChange={searchInputSelectedArtObjects.onChange}
                                />
                            </div>
                        )}
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
                            <p className='cards__table-heding-value'>{foundText(catalogsForRender)} {catalogsForRender.length} {catalogsText(catalogsForRender)}</p>
                        )}
                        {isArtObjectsActive && (
                            <p className='cards__table-heding-value'>{foundText(artObjectsForRender)} {artObjectsForRender.length} {exhibitsText(artObjectsForRender)}</p>
                        )}
                        {isSelectedArtObjectsActive && (
                            <p className='cards__table-heding-value'>{foundText(selectedArtObjectsForRender)} {selectedArtObjectsForRender.length} {exhibitsText(selectedArtObjectsForRender)}</p>
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
                                    {catalogsForRender.length !== 0 ? (
                                        <>
                                            {catalogsForRender.map((catalog) => (
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
                                    ) : (
                                        <div className='cards__not-found'>
                                            <p className='cards__not-found-text'>Нет каталогов</p>
                                        </div>
                                    )}
                                </>
                            )}
                            {isArtObjectsActive && (
                                <>
                                    {artObjectsForRender.length !== 0 ? (
                                        <>
                                            {artObjectsForRender.map((artObject) => (
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
                                            <p className='cards__not-found-text'>Нет экспонатов</p>
                                        </div>
                                    )}
                                </>
                            )}
                            {isSelectedArtObjectsActive && (
                                <>
                                    {selectedArtObjectsForRender.length !== 0 ? (
                                        <>
                                            {selectedArtObjectsForRender.map((artObject) => (
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
                                            <p className='cards__not-found-text'>Нет экспонатов</p>
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
                                    {catalogsForRender.length !== 0 ? (
                                        <>
                                            {catalogsForRender.slice(showResultsFromCatalogs, resultsShowCatalogs).map((catalog) => (
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
                                        </>
                                    ) : (
                                        <div className='cards__table-not-found'>
                                            <p className='cards__table-not-found-text'>Нет каталогов</p>
                                        </div>
                                    )}
                                    <TablePagination
                                        sortList={dataForPagination}
                                        handleShowResultsFrom={handleShowResultsFrom}
                                        handleResultsShow={handleResultsShow}
                                    />
                                </>
                            )}
                            {isArtObjectsActive && (
                                <>
                                    {artObjectsForRender.length !== 0 ? (
                                        <>
                                            {artObjectsForRender.slice(showResultsFromArtObject, resultsShowArtObject).map((artObject) => (
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
                                            <p className='cards__table-not-found-text'>Нет экспонатов</p>
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
                                    {selectedArtObjectsForRender.length !== 0 ? (
                                        <>
                                            {selectedArtObjectsForRender.slice(showResultsFromSelectedArtObjects, resultsShowSelectedArtObjects).map((artObject) => (
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
                                            <p className='cards__table-not-found-text'>Нет экспонатов</p>
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
