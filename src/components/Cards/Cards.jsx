import React, { useState } from 'react';
import { Validation } from '../../utils/Validation';
import Card from '../Card/Card';
import ArtObjectInfo from '../ArtObjectInfo/ArtObjectInfo';

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
