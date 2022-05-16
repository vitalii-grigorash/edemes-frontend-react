import React, { useState } from 'react';
import disabledCheckbox from '../../images/select-disabled.svg';
import activeCheckbox from '../../images/select-active.svg';

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
        showArtObjectInfo
    } = props;

    const [isCheckboxActive, setCheckboxActive] = useState(false);

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
                <p className='card__text'>Добавлено: <span className='card__text_span'>112 из 13 405</span></p>
            )}
            {isArtObjectsActive && (
                <p className='card__text'>Брейгель Ян Старший</p>
            )}
            <div className='card__buttons-container'>
                {isCatalogsActive && (
                    <button type='button' className='card__button-show' onClick={onCardButtonOpenClick}>Открыть</button>
                )}
                {isArtObjectsActive && (
                    <button type='button' className='card__button-show' onClick={onCardButtonShowClick}>Просмотр</button>
                )}
                <img className='card__button-checkbox' alt='Чекбокс' src={isCheckboxActive ? activeCheckbox : disabledCheckbox} onClick={onCatalogSelectClick} />
            </div>
        </div>
    );

}

export default Card;
