import React, { useEffect, useState } from 'react';
import disabledCheckbox from '../../images/disabled-checkbox.svg';
import activeCheckbox from '../../images/active-checkbox.svg';
import * as Catalogs from "../../Api/Catalogs";

function Table(props) {

    const {
        id,
        card,
        name,
        picture,
        onSelectCardClick,
        onDeselectCardClick,
        onOpenCatalogClick,
        handleArtObjectsActive,
        isCatalogsActive,
        isArtObjectsActive,
        isSelectedArtObjectsActive,
        showArtObjectInfo,
        selectedArtObjects,
        showCatalogName
    } = props;

    const [isCheckboxActive, setCheckboxActive] = useState(false);
    const [isSelected, setSelected] = useState(false);
    const [isAllSelected, setAllSelected] = useState(false);
    const [isSomeSelected, setSomeSelected] = useState(false);
    const [allCatalogArtObjectsValue, setAllCatalogArtObjectsValue] = useState('');
    const [selectedCatalogArtObjectsValue, setSelectedCatalogArtObjectsValue] = useState('');

    useEffect(() => {
        if (isArtObjectsActive) {
            if (selectedArtObjects.length !== 0) {
                selectedArtObjects.map((selectedArtObject) => {
                    if (selectedArtObject.id === card.id) {
                        setCheckboxActive(true);
                    }
                    return selectedArtObject;
                })
            }
        }
    }, [card.id, selectedArtObjects, isArtObjectsActive])

    useEffect(() => {
        if (isCatalogsActive) {
            Catalogs.getCatalog(card.id)
                .then((data) => {
                    if (data.artObjects.length !== 0) {
                        const filteredItems = selectedArtObjects.filter(selectedArtObject => data.artObjects.find(artObject => artObject.id === selectedArtObject.id))
                        if (filteredItems.length === data.artObjects.length) {
                            setAllSelected(true);
                            setCheckboxActive(true);
                            setSelected(true);
                            setSomeSelected(false);
                            setAllCatalogArtObjectsValue(data.artObjects.length);
                        } else if (filteredItems.length === 0) {
                            setSelected(false);
                            setAllSelected(false);
                            setSomeSelected(false);
                        } else if (filteredItems.length !== 0 && filteredItems.length !== data.artObjects.length) {
                            setSomeSelected(true);
                            setAllSelected(false);
                            setSelected(true);
                            setSelectedCatalogArtObjectsValue(filteredItems.length);
                            setAllCatalogArtObjectsValue(data.artObjects.length);
                        }
                    }
                })
                .catch((err) => console.log(`Ошибка при загрузке каталога: ${err}`));
        }
    }, [card.id, isCatalogsActive, selectedArtObjects])

    function onRemoveClick() {
        onDeselectCardClick(card);
    }

    function onCardButtonOpenClick() {
        onOpenCatalogClick(id);
        handleArtObjectsActive();
        showCatalogName(card);
    }

    function onCardButtonShowClick() {
        showArtObjectInfo(card);
    }

    function onCatalogSelectClick() {
        if (isCheckboxActive) {
            setCheckboxActive(false);
            onDeselectCardClick(card);
        } else {
            setCheckboxActive(true);
            onSelectCardClick(card);
        }
    }

    return (
        <div className="table">
            <img className='table__picture' alt={name} src={picture} />
            <p className='table__name'>{name}</p>
            {isCatalogsActive && (
                <>
                    {isAllSelected && (
                        <p className='table__text'>Добавлено: <span className='table__text_span'>{allCatalogArtObjectsValue}</span></p>
                    )}
                    {!isSelected && (
                        <p className='table__text'>Нет добавленных экпонатов</p>
                    )}
                    {isSomeSelected && (
                        <p className='table__text'>Добавлено: <span className='table__text_span'>{selectedCatalogArtObjectsValue} из {allCatalogArtObjectsValue}</span></p>
                    )}
                </>
            )}
            {isArtObjectsActive && (
                <p className='table__text'>Брейгель Ян Старший</p>
            )}
            {isSelectedArtObjectsActive && (
                <p className='table__text'>Брейгель Ян Старший</p>
            )}
            {isSelectedArtObjectsActive ? (
                <>
                    <div className='table__remove-container' onClick={onRemoveClick}>
                        <div className='table__remove-icon' />
                        <p className='table__remove-text'>Удалить</p>
                    </div>
                </>
            ) : (
                <>
                    <div className='table__buttons-container'>
                        {isCatalogsActive && (
                            <p className='table__button-show' onClick={onCardButtonOpenClick}>Открыть</p>
                        )}
                        {isArtObjectsActive && (
                            <p className='table__button-show' onClick={onCardButtonShowClick}>Просмотр</p>
                        )}
                        <img className='table__button-checkbox' alt='Чекбокс' src={isCheckboxActive ? activeCheckbox : disabledCheckbox} onClick={onCatalogSelectClick} />
                    </div>
                </>
            )}
        </div>
    );

}

export default Table;
