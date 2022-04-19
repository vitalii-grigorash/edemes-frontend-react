import React, { useState } from 'react';
import { Validation } from '../../utils/Validation';
import catalogsData from '../../utils/CatalogsData.json';
import * as Catalogs from "../../Api/Catalogs";

function CatalogPopup(props) {

    const {
        catalogs,
        isOpen,
        onClosePopupClick,
        getCatalogs
    } = props;

    const [isSelectCatalogListActive, setSelectCatalogListActive] = useState(false);
    const [isCatalogAddContainerActive, setCatalogAddContainerActive] = useState(false);
    const [isCategoryListActive, setCategoryListActive] = useState(false);
    const [selectedCatalog, setSelectedCatalog] = useState('Выберете каталог');
    const [isCatalogSelected, setCatalogSelected] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Выберете категорию');
    const [isCategorySelected, setCategorySelected] = useState(false);
    const [isDownloadedExhibitsContainerOpened, setDownloadedExhibitsContainerOpened] = useState(false);
    const [isSaveButtonActive, setSaveButtonActive] = useState(false);

    const catalogName = Validation();

    function onCloseButtonClick() {
        onClosePopupClick();
        onCancelButtonClick();
    }

    function onCancelCatalogButtonClick() {
        setCatalogAddContainerActive(false);
        setSelectedCategory('Выберете категорию');
        catalogName.setValue('');
        setCategoryListActive(false);
        setCategorySelected(false);
    }

    function onSaveButtonClick() {
        onCloseButtonClick();
    }

    function onCancelButtonClick() {
        setSaveButtonActive(false);
        setDownloadedExhibitsContainerOpened(false);
        setSelectedCatalog('Выберете каталог');
        setCatalogSelected(false);
        onCancelCatalogButtonClick();
        setSelectCatalogListActive(false);
    }

    function onDownloadButtonClick() {
        setDownloadedExhibitsContainerOpened(true);
        setSaveButtonActive(true);
        setSelectCatalogListActive(false);
    }

    function onAddCatalogButtonClick() {
        const catalog = {
            name: catalogName.value,
            category: selectedCategory,
            picture: "https://static.kulturologia.ru/files/u18214/jpeg2.jpg"
        }
        Catalogs.createNewCatalog(catalog)
            .then((data) => {
                console.log(data);
                catalogName.setValue('');
                handleShowCatalogAddContainer();
                setSelectedCategory('Выберете категорию');
                setCategorySelected(false);
                getCatalogs();
            })
            .catch((err) => console.log(`Ошибка при создании каталога: ${err}`));
    }

    function onSelectCatalogClick(selectedCatalog) {
        setCatalogSelected(true);
        setSelectedCatalog(selectedCatalog);
    }

    function onSelectCategoryClick(selectedCategory) {
        setCategorySelected(true);
        setSelectedCategory(selectedCategory);
    }

    function handleSelectCatalogListShow() {
        if (isSelectCatalogListActive) {
            setSelectCatalogListActive(false);
        } else {
            setSelectCatalogListActive(true);
        }
    }

    function handleShowCatalogAddContainer() {
        if (isCatalogAddContainerActive) {
            setCatalogAddContainerActive(false);
        } else {
            setCatalogAddContainerActive(true);
        }
    }

    function handleShowCategoryList() {
        if (isCategoryListActive) {
            setCategoryListActive(false);
        } else {
            setCategoryListActive(true);
        }
    }

    const handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('catalog-popup_opened')) {
            onCloseButtonClick();
        }
    }

    return (
        <div className={`catalog-popup ${isOpen && 'catalog-popup_opened'}`} onMouseDown={handleOverlayClose}>
            <div className='catalog-popup__main-container'>
                <p className='catalog-popup__name'>Импорт каталога</p>
                <div className='catalog-popup__close-button' onClick={onCloseButtonClick} />
                <p className='catalog-popup__select-label'>Выбрать каталог</p>
                <div className='catalog-popup__select-container' onClick={handleSelectCatalogListShow}>
                    <p className={`catalog-popup__select-catalog-name ${isCatalogSelected && 'catalog-popup__select-catalog-name_selected'}`}>{selectedCatalog}</p>
                    <div className='catalog-popup__select-catalog-arrow' />
                    {isSelectCatalogListActive && (
                        <div className='catalog-popup__select-catalogs-container'>
                            {catalogs.map((catalog) => (
                                <div key={catalog.id} className='catalog-popup__select-catalog-container' onClick={() => onSelectCatalogClick(catalog.name)}>
                                    <p className='catalog-popup__select-catalog'>{catalog.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='catalog-popup__add-catalog-button' onClick={handleShowCatalogAddContainer}>
                    <div className={`catalog-popup__add-catalog-icon ${isCatalogAddContainerActive && 'catalog-popup__add-catalog-icon_active'}`} />
                    <p className={`catalog-popup__add-catalog-text ${isCatalogAddContainerActive && 'catalog-popup__add-catalog-text_active'}`}>Создать новый каталог</p>
                </div>
                {isCatalogAddContainerActive && (
                    <div className='catalog-popup__add-catalog-container'>
                        <p className='catalog-popup__add-catalog-heading'>Новый каталог</p>
                        <div className='catalog-popup__add-catalog-input-container'>
                            <p className='catalog-popup__add-catalog-input-label'>Название</p>
                            <input
                                type="text"
                                className='catalog-popup__add-catalog-input'
                                name="catalogName"
                                placeholder=''
                                value={catalogName.value}
                                onChange={catalogName.onChange}
                            />
                        </div>
                        <div className='catalog-popup__add-catalog-category-container'>
                            <p className='catalog-popup__add-catalog-input-label'>Категория</p>
                            <div className='catalog-popup__select-container' onClick={handleShowCategoryList}>
                                <p className={`catalog-popup__select-catalog-name ${isCategorySelected && 'catalog-popup__select-catalog-name_selected'}`}>{selectedCategory}</p>
                                <div className='catalog-popup__select-catalog-arrow' />
                                {isCategoryListActive && (
                                    <div className='catalog-popup__select-catalogs-container'>
                                        <div className='catalog-popup__select-catalog-container' onClick={() => onSelectCategoryClick('Живопись')}>
                                            <p className='catalog-popup__select-catalog'>Живопись</p>
                                        </div>
                                        <div className='catalog-popup__select-catalog-container' onClick={() => onSelectCategoryClick('Экспонат')}>
                                            <p className='catalog-popup__select-catalog'>Экспонат</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='catalog-popup__add-catalog-buttons-container'>
                            <button type="button" className='catalog-popup__add-catalog-button-cancel' onClick={onCancelCatalogButtonClick}>Отмена</button>
                            <button type="button" className='catalog-popup__add-catalog-button-add' onClick={onAddCatalogButtonClick}>Добавить</button>
                        </div>
                    </div>
                )}
                {!isDownloadedExhibitsContainerOpened ? (
                    <div className='catalog-popup__download-container'>
                        <div className='catalog-popup__download-img' />
                        <button className='catalog-popup__download-button' onClick={onDownloadButtonClick}>Загрузить из файла</button>
                    </div>
                ) : (
                    <div className='catalog-popup__downloaded-exhibits-container'>
                        <div className='catalog-popup__downloaded-exhibits-success-container'>
                            <div className='catalog-popup__downloaded-exhibits-success-icon' />
                            <p className='catalog-popup__downloaded-exhibits-success-text'>Экспонаты загружены</p>
                        </div>
                        <div className='catalog-popup__downloaded-exhibits-grid-container'>
                            {catalogsData.map((catalog) => (
                                <img key={catalog.id} className='catalog-popup__downloaded-exhibit-img' src={require(`../../images/${catalog.img}`)} alt="Изображение экспоната" />
                            ))}
                        </div>
                    </div>
                )}
                <div className='catalog-popup__buttons-container'>
                    <button type="button" className='catalog-popup__button-cancel' onClick={onCancelButtonClick}>Отмена</button>
                    {isSaveButtonActive ? (
                        <button type="button" className='catalog-popup__button-save catalog-popup__button-save_active' onClick={onSaveButtonClick}>Сохранить</button>
                    ) : (
                        <button type="button" className='catalog-popup__button-save'>Сохранить</button>
                    )}
                </div>
            </div>
        </div>

    );

}

export default CatalogPopup;
