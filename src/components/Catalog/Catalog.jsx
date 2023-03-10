import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Cards from '../Cards/Cards';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Catalog(props) {

    const {
        handleOpenCatalogPopupClick,
        getCatalogs,
        handleMobileHeaderNavText,
        catalogsForRender,
        onSelectCatalogClick,
        onDeselectCatalogClick,
        selectedArtObjects,
        selectedArtObjectsForRender,
        onOpenCatalogClick,
        artObjectsForRender,
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
        isCardActive,
        handleCardActive,
        isTableActive,
        handleTableActive,
        boxRegistrationSearchInput,
        searchInputCatalogs,
        searchInputArtObjects,
        searchInputSelectedArtObjects,
        artObjectsBackClick,
        catalogsBackClick,
    } = props;

    const currentUser = React.useContext(CurrentUserContext);
    const history = useHistory();

    useEffect(() => {
        if (currentUser.role === 'Оператор') {
            history.push('/fixation');
        }
    })

    useEffect(() => {
        if (currentUser.role === 'Администратор') {
            handleMobileHeaderNavText('Каталог');
        }
    }, [currentUser.role, handleMobileHeaderNavText]);

    useEffect(() => {
        if (currentUser.role === 'Администратор') {
            getCatalogs();
        }
        // eslint-disable-next-line
    }, [currentUser.role])

    return (
        <div className="catalog">
            <Helmet
                title='Каталог'
            />
            <h1 className='catalog__heading'>Каталог</h1>
            <button className='catalog__import-button' onClick={handleOpenCatalogPopupClick}>Импорт</button>
            <div className='catalog__main-container'>
                <Cards
                    catalogsForRender={catalogsForRender}
                    onSelectCatalogClick={onSelectCatalogClick}
                    onDeselectCatalogClick={onDeselectCatalogClick}
                    selectedArtObjects={selectedArtObjects}
                    selectedArtObjectsForRender={selectedArtObjectsForRender}
                    onOpenCatalogClick={onOpenCatalogClick}
                    artObjectsForRender={artObjectsForRender}
                    onSelectArtObjectClick={onSelectArtObjectClick}
                    onDeselectArtObjectClick={onDeselectArtObjectClick}
                    handleArtObjectsActive={handleArtObjectsActive}
                    isCatalogsActive={isCatalogsActive}
                    isArtObjectsActive={isArtObjectsActive}
                    showArtObjectInfo={showArtObjectInfo}
                    isArtObjectInfoOpen={isArtObjectInfoOpen}
                    artObject={artObject}
                    onShowAddedArtObjectsClick={onShowAddedArtObjectsClick}
                    isSelectedArtObjectsActive={isSelectedArtObjectsActive}
                    isCardActive={isCardActive}
                    handleCardActive={handleCardActive}
                    isTableActive={isTableActive}
                    handleTableActive={handleTableActive}
                    boxRegistrationSearchInput={boxRegistrationSearchInput}
                    searchInputCatalogs={searchInputCatalogs}
                    searchInputArtObjects={searchInputArtObjects}
                    searchInputSelectedArtObjects={searchInputSelectedArtObjects}
                />
                <div className='catalog__buttons-container'>
                    {isArtObjectInfoOpen && (
                        <button type='button' className='catalog__button-back' onClick={artObjectsBackClick}>Вернуться к экспонатам</button>
                    )}
                    {isArtObjectsActive && (
                        <button type='button' className='catalog__button-back' onClick={catalogsBackClick}>Вернуться к каталогам</button>
                    )}
                    {isSelectedArtObjectsActive && (
                        <button type='button' className='catalog__button-back' onClick={catalogsBackClick}>Вернуться к каталогам</button>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Catalog;
