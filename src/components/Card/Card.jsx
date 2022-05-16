import React, { useEffect, useState } from 'react';
import disabledCheckbox from '../../images/select-disabled.svg';
import activeCheckbox from '../../images/select-active.svg';
import * as Catalogs from "../../Api/Catalogs";

function Card(props) {

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
        selectedArtObjects
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
        <div className="card">
            <img className='card__picture' alt={name} src={picture} />
            <p className='card__name'>{name}</p>
            {isCatalogsActive && (
                <>
                    {isAllSelected && (
                        <p className='card__text'>Добавлено: <span className='card__text_span'>{allCatalogArtObjectsValue}</span></p>
                    )}
                    {!isSelected && (
                        <p className='card__text'>Нет добавленных экпонатов</p>
                    )}
                    {isSomeSelected && (
                        <p className='card__text'>Добавлено: <span className='card__text_span'>{selectedCatalogArtObjectsValue} из {allCatalogArtObjectsValue}</span></p>
                    )}
                </>
            )}
            {isArtObjectsActive && (
                <p className='card__text'>Брейгель Ян Старший</p>
            )}
            {isSelectedArtObjectsActive && (
                <p className='card__text'>Брейгель Ян Старший</p>
            )}
            {isSelectedArtObjectsActive ? (
                <>
                    <div className='card__remove-container' onClick={onRemoveClick}>
                        <div className='card__remove-icon' />
                        <p className='card__remove-text'>Удалить</p>
                    </div>
                </>
            ) : (
                <>
                    <div className='card__buttons-container'>
                        {isCatalogsActive && (
                            <button type='button' className='card__button-show' onClick={onCardButtonOpenClick}>Открыть</button>
                        )}
                        {isArtObjectsActive && (
                            <button type='button' className='card__button-show' onClick={onCardButtonShowClick}>Просмотр</button>
                        )}
                        <img className='card__button-checkbox' alt='Чекбокс' src={isCheckboxActive ? activeCheckbox : disabledCheckbox} onClick={onCatalogSelectClick} />
                    </div>
                </>
            )}
        </div>
    );

}

export default Card;
