import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CatalogsData from '../../utils/CatalogsData.json';

function Catalog() {

    const [isImgSortActive, setImgSortActive] = useState(true);
    const [isListSortActive, setListSortActive] = useState(false);

    function onImgSortActiveClick() {
        setListSortActive(false);
        setImgSortActive(true);
    }

    function onListSortActiveClick() {
        setImgSortActive(false);
        setListSortActive(true);
    }

    function onCatalogClick(catalog) {
        console.log(catalog);
    }

    return (
        <div className="catalog">
            <Helmet
                title='Каталог'
            />
            <div className='catalog__heading-container'>
                <h1 className='catalog__heading'>Каталог</h1>
                <button className='catalog__import-button'>Импорт каталога</button>
            </div>
            <div className='catalog__main'>
                <div className='catalog__display-container'>
                    <div className={`catalog__img-sort-icon ${isImgSortActive && 'catalog__img-sort-icon_active'}`} onClick={onImgSortActiveClick} />
                    <div className={`catalog__list-sort-icon ${isListSortActive && 'catalog__list-sort-icon_active'}`} onClick={onListSortActiveClick} />
                </div>
                {isImgSortActive && (
                    <div className='catalog__grid-container'>
                        {CatalogsData.map((catalog) => (
                            <div key={catalog.id} className='catalog__grid-item-container' onClick={() => onCatalogClick(catalog)}>
                                <img className='catalog__img' src={require(`../../images/${catalog.img}`)} alt="Изображение каталога" />
                                <p className='catalog__name'>{catalog.name}</p>
                                <p className='catalog__exhibits-value'>{catalog.exhibits.length} экс.</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}

export default Catalog;
