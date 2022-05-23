import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import TrackingTable from '../TrackingTable/TrackingTable';
import * as TrackingApi from "../../Api/TrackingApi";
import * as Catalogs from "../../Api/Catalogs";

function Tracking(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const [isBoxesTabActive, setBoxesTabActive] = useState(true);
    const [isExhibitsTabActive, setExhibitsTabActive] = useState(false);
    const [boxesData, setBoxesData] = useState([]);
    const [artObjectsData, setArtObjectsData] = useState([]);
    const boxesTablePlaceholder = 'Введите название ящика';
    const exhibitsTablePlaceholder = 'Введите название экспоната';

    useEffect(() => {
        handleMobileHeaderNavText('Отслеживание');
    });

    useEffect(() => {
        TrackingApi.getAllBoxes()
            .then((data) => {
                setBoxesData(data.fixes);
            })
            .catch((err) => console.log(`Ошибка при загрузке ящиков: ${err}`));
    }, []);

    useEffect(() => {
        Catalogs.getArtObjects()
            .then((data) => {
                setArtObjectsData(data.artObjects);
            })
            .catch((err) => console.log(`Ошибка при загрузке ящиков: ${err}`));
    }, []);

    function onBoxClick (boxData) {
        console.log(boxData.Box.Location.locationTo);
        console.log(boxData.Users[0].Company.Locations[0].locationFrom);
    }

    function onBoxesTabClick() {
        setExhibitsTabActive(false);
        setBoxesTabActive(true);
    }

    function onExhibitsTabClick() {
        setBoxesTabActive(false);
        setExhibitsTabActive(true);
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
                        dataForRender={boxesData}
                        inputPlaceholder={boxesTablePlaceholder}
                        isBoxesTabActive={isBoxesTabActive}
                        isExhibitsTabActive={isExhibitsTabActive}
                        onBoxClick={onBoxClick}
                    />
                )}
                {isExhibitsTabActive && (
                    <TrackingTable
                        dataForRender={artObjectsData}
                        inputPlaceholder={exhibitsTablePlaceholder}
                        isBoxesTabActive={isBoxesTabActive}
                        isExhibitsTabActive={isExhibitsTabActive}
                        onBoxClick={onBoxClick}
                    />
                )}
            </div>
        </section>
    );
}

export default Tracking;
