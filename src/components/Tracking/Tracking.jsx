import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TrackingTableExhibitsData from '../../utils/TrackingTableExhibitsData.json';
import TrackingTableBoxesData from '../../utils/TrackingTableBoxesData.json';
import TrackingTable from '../TrackingTable/TrackingTable';

function Tracking() {

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
        <section className="tracking">
            <Helmet
                title='Отслеживание'
            />
            <h1 className='tracking__heading'>Отслеживание</h1>
            <div className='tracking__table'>
                <div className='tracking__tabs-container'>
                    <p className={`tracking__tab ${isBoxesTabActive && 'tracking__tab_active'}`} onClick={onBoxesTabClick}>Ящики</p>
                    <p className={`tracking__tab ${isExhibitsTabActive && 'tracking__tab_active'}`} onClick={onExhibitsTabClick}>Экспонаты</p>
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

export default Tracking;
