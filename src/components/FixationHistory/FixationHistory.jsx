import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TrackingTableExhibitsData from '../../utils/TrackingTableExhibitsData.json';
import TrackingTableBoxesData from '../../utils/TrackingTableBoxesData.json';
import TrackingTable from '../TrackingTable/TrackingTable';

function FixationHistory() {

    const [isBoxesTabActive, setBoxesTabActive] = useState(true);
    const [isExhibitsTabActive, setExhibitsTabActive] = useState(false);
    const boxesTablePlaceholder = 'Введите название ящика';
    const exhibitsTablePlaceholder = 'Введите название экспоната';

    function onBoxesTabClick() {
        setExhibitsTabActive(false);
        setBoxesTabActive(true);
    }

    function onExhibitsTabClick() {
        setBoxesTabActive(false);
        setExhibitsTabActive(true);
    }

    function onBoxesSearchClick() {
        console.log('onBoxesSearchClick');
    }

    function onExhibitsSearchClick() {
        console.log('onExhibitsSearchClick');
    }

    return (
        <section className='fixation-history'>
            <Helmet
                title='История фиксаций'
            />
            <h1 className='fixation-history__heading'>История фиксаций</h1>
            <div className='fixation-history__table'>
                <div className='fixation-history__tabs-container'>
                    <p className={`fixation-history__tab ${isBoxesTabActive && 'fixation-history__tab_active'}`} onClick={onBoxesTabClick}>Ящики</p>
                    <p className={`fixation-history__tab ${isExhibitsTabActive && 'fixation-history__tab_active'}`} onClick={onExhibitsTabClick}>Экспонаты</p>
                </div>
                {isBoxesTabActive && (
                    <TrackingTable
                        dataForRender={TrackingTableBoxesData}
                        inputPlaceholder={boxesTablePlaceholder}
                        onSearchClick={onBoxesSearchClick}
                    />
                )}
                {isExhibitsTabActive && (
                    <TrackingTable
                        dataForRender={TrackingTableExhibitsData}
                        inputPlaceholder={exhibitsTablePlaceholder}
                        onSearchClick={onExhibitsSearchClick}
                    />
                )}
            </div>
        </section>
    );
}

export default FixationHistory;
