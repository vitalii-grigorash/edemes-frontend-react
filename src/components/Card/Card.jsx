import React, { useState } from 'react';
import disabledCheckbox from '../../images/select-disabled.svg';
import activeCheckbox from '../../images/select-active.svg';

function Card(props) {

    const {
        id,
        name,
        picture,
        onSelectCatalogClick
    } = props;

    const [isCheckboxActive, setCheckboxActive] = useState(false);

    function onCardButtonShowClick() {
        console.log(id);
    }

    function onCatalogSelectClick() {
        if (isCheckboxActive) {
            setCheckboxActive(false);
        } else {
            setCheckboxActive(true);
            onSelectCatalogClick(id);
        }
    }

    return (
        <div className="card">
            <img className='card__picture' alt={name} src={picture} />
            <p className='card__name'>{name}</p>
            <p className='card__text'>Добавлено: <span className='card__text_span'>112 из 13 405</span></p>
            <div className='card__buttons-container'>
                <button type='button' className='card__button-show' onClick={onCardButtonShowClick}>Открыть</button>
                <img className='card__button-checkbox' alt='Чекбокс' src={isCheckboxActive ? activeCheckbox : disabledCheckbox} onClick={onCatalogSelectClick} />
            </div>
        </div>
    );

}

export default Card;
