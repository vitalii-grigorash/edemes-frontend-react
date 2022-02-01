import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CatalogTable from '../CatalogTable/CatalogTable';
import CatalogsData from '../../utils/CatalogsData.json';

function Catalog() {

    const [isImgSortActive, setImgSortActive] = useState(true);
    const [isListSortActive, setListSortActive] = useState(false);
    const [isCatalogShow, setCatalogShow] = useState(true);
    const [catalogExhibitsList, setCatalogExhibitsList] = useState({});

    function onImgSortActiveClick() {
        setListSortActive(false);
        setImgSortActive(true);
    }

    function onListSortActiveClick() {
        setImgSortActive(false);
        setListSortActive(true);
    }

    function handleShowCatalog () {
        if (isCatalogShow) {
            setCatalogShow(false);
        } else {
            setCatalogShow(true);
        }
    }

    function onCatalogClick(catalog) {
        handleShowCatalog();
        setCatalogExhibitsList(catalog);
    }

    return (
        <div className="catalog">
            <Helmet
                title='Каталог'
            />
            {isCatalogShow ? (
                <>
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
                </>
            ) : (
                <CatalogTable
                    catalogName={catalogExhibitsList.name}
                    exhibits={catalogExhibitsList.exhibits}
                    onCatalogBackClick={handleShowCatalog}
                />
            )}
        </div>
    );

}

export default Catalog;
