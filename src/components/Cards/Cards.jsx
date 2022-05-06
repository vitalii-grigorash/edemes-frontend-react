import React, { useState } from 'react';
import { Validation } from '../../utils/Validation';
import Card from '../Card/Card';

function Cards(props) {

    const {
        catalogs,
        onSelectCatalogClick,
        onDeselectCatalogClick,
        selectedArtObjects,
        onOpenCatalogClick,
        artObjects,
        onSelectArtObjectClick,
        onDeselectArtObjectClick
    } = props;

    const searchInput = Validation();
    const [isCardActive, setCardActive] = useState(true);
    const [isTableActive, setTableActive] = useState(false);
    const [isCatalogsActive, setIsCatalogsActive] = useState(true);
    const [isArtObjectsActive, setIsArtObjectsActive] = useState(false);

    function handleArtObjectsActive () {
        if (isArtObjectsActive) {
            setIsArtObjectsActive(false);
            setIsCatalogsActive(true);
        } else {
            setIsArtObjectsActive(true);
            setIsCatalogsActive(false);
        }
    }

    function onSearchButtonClick() {
        console.log(searchInput.value);
        searchInput.setValue('');
    }

    function onAddedButtonClick() {
        console.log(selectedArtObjects);
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
                <div className='cards__added-container' onClick={onAddedButtonClick}>
                    <div className='cards__added-img-container'>
                        <div className='cards__added-value-container'>
                            <p className='cards__added-value'>{selectedArtObjects.length}</p>
                        </div>
                    </div>
                    <p className='cards__added-text'>Добавлено</p>
                </div>
            </div>
            <div className='cards__table-heding-container'>
                <p className='cards__table-heding-value'>Найдено {catalogs.length} каталога</p>
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
                                    key={catalog.id}
                                    id={catalog.id}
                                    card={catalog}
                                    name={catalog.name}
                                    picture={catalog.picture}
                                    onSelectCardClick={onSelectCatalogClick}
                                    onDeselectCardClick={onDeselectCatalogClick}
                                    onOpenCatalogClick={onOpenCatalogClick}
                                    handleArtObjectsActive={handleArtObjectsActive}
                                />
                            ))}
                        </>
                    )}
                    {isArtObjectsActive && (
                        <>
                            {artObjects.map((artObject) => (
                                <Card
                                    key={artObject.id}
                                    id={artObject.id}
                                    card={artObject}
                                    name={artObject.name}
                                    picture={artObject.photo}
                                    onSelectCardClick={onSelectArtObjectClick}
                                    onDeselectCardClick={onDeselectArtObjectClick}
                                    onOpenCatalogClick={onOpenCatalogClick}
                                    handleArtObjectsActive={handleArtObjectsActive}
                                />
                            ))}
                        </>
                    )}
                </div>
            )}
            {isTableActive && (
                <div className='cards__table'>

                </div>
            )}
        </div>
    );

}

export default Cards;
