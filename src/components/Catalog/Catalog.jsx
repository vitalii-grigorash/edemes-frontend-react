import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CatalogTable from '../CatalogTable/CatalogTable';
import * as Catalogs from "../../Api/Catalogs";

function Catalog(props) {

    const {
        handleOpenCatalogPopupClick,
        handleMobileHeaderNavText,
        addCatalogs
    } = props;

    const { pathname } = useLocation();
    const [isImgSortActive, setImgSortActive] = useState(true);
    const [isListSortActive, setListSortActive] = useState(false);
    const [isCatalogShow, setCatalogShow] = useState(true);
    const [catalogExhibitsList, setCatalogExhibitsList] = useState([]);
    const [catalogs, setCatalogs] = useState([]);
    const [catalogName, setCatalogName] = useState('');
    const [catalogCategory, setCatalogCategory] = useState('');

    useEffect(() => {
        if (pathname === '/catalog') {
            Catalogs.getAllCatalogs()
                .then((data) => {
                    setCatalogs(data.catalogs);
                    addCatalogs(data.catalogs);
                    console.log(data.catalogs);
                })
                .catch((err) => console.log(`Ошибка при загрузке каталогов: ${err}`));
        }
    }, []);

    useEffect(() => {
        handleMobileHeaderNavText('Каталог');
    });

    function onImgSortActiveClick() {
        setListSortActive(false);
        setImgSortActive(true);
    }

    function onListSortActiveClick() {
        setImgSortActive(false);
        setListSortActive(true);
    }

    function handleShowCatalog() {
        if (isCatalogShow) {
            setCatalogShow(false);
        } else {
            setCatalogShow(true);
        }
    }

    function artObjects() {
        Catalogs.getArtObjects()
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(`Ошибка при загрузке экспонатов: ${err}`));
    }

    function onCatalogClick(catalog) {
        Catalogs.getCatalog(catalog.id)
            .then((data) => {
                console.log(data);
                setCatalogName(catalog.name);
                setCatalogCategory(catalog.category);
                setCatalogExhibitsList(data.catalog.ArtObjects);
                handleShowCatalog();
                artObjects();
            })
            .catch((err) => console.log(`Ошибка при загрузке каталогов: ${err}`));
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

    return (
        <div className="catalog">
            <Helmet
                title='Каталог'
            />
            {isCatalogShow ? (
                <>
                    <div className='catalog__heading-container'>
                        <h1 className='catalog__heading'>Каталог</h1>
                        <button className='catalog__import-button' onClick={handleOpenCatalogPopupClick}>Импорт каталога</button>
                    </div>
                    <div className='catalog__main'>
                        <div className='catalog__display-container'>
                            <div className='catalog__button-mobile-container'>
                                <button className='catalog__import-button-mobile' onClick={handleOpenCatalogPopupClick}>Импорт каталога</button>
                            </div>
                            <div className={`catalog__img-sort-icon ${isImgSortActive && 'catalog__img-sort-icon_active'}`} onClick={onImgSortActiveClick} />
                            <div className={`catalog__list-sort-icon ${isListSortActive && 'catalog__list-sort-icon_active'}`} onClick={onListSortActiveClick} />
                        </div>
                        {isImgSortActive && (
                            <div className='catalog__grid-container'>
                                {catalogs.map((catalog) => (
                                    <div key={catalog.id} className='catalog__grid-item-container' onClick={() => onCatalogClick(catalog)}>
                                        <img className='catalog__img' src={`${catalog.picture}`} alt="Изображение каталога" />
                                        <p className='catalog__name'>{catalog.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <CatalogTable
                    catalogName={catalogName}
                    category={catalogCategory}
                    exhibits={catalogExhibitsList}
                    onCatalogBackClick={handleShowCatalog}
                    exhibitsText={exhibitsText}
                />
            )}
        </div>
    );

}

export default Catalog;
