import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Validation } from '../../utils/Validation';
import TrackingTable from '../TrackingTable/TrackingTable';
import * as TrackingApi from "../../Api/TrackingApi";

function Tracking(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const boxesSearchInput = Validation();
    const artObjectsSearchInput = Validation();
    // const boxArtObjectsSearchInput = Validation();

    const [isBoxesTabActive, setBoxesTabActive] = useState(true);
    const [isExhibitsTabActive, setExhibitsTabActive] = useState(false);
    const [boxesData, setBoxesData] = useState([]);
    const [boxesDataForRender, setBoxesDataForRender] = useState([]);
    const [artObjectsData, setArtObjectsData] = useState([]);
    const [artObjectsDataForRender, setArtObjectsDataForRender] = useState([]);
    const [trackingBoxesInput, setTrackingBoxesInput] = useState('');
    const [trackingArtObjectsInput, setTrackingArtObjectsInput] = useState('');

    useEffect(() => {
        handleMobileHeaderNavText('Отслеживание');
    });

    function trackingSearchInput(value) {
        if (isBoxesTabActive) {
            setTrackingBoxesInput(value);
        } else if (isExhibitsTabActive) {
            setTrackingArtObjectsInput(value);
        }
    }

    useEffect(() => {
        if (isBoxesTabActive) {
            if (trackingBoxesInput === '') {
                setBoxesDataForRender(boxesData);
            } else {
                const dataForRender = [];
                boxesData.forEach((box) => {
                    if (box.name.toLowerCase().includes(trackingBoxesInput.toLowerCase())) {
                        dataForRender.push(box);
                    }
                })
                setBoxesDataForRender(dataForRender);
            }
        } else if (isExhibitsTabActive) {
            if (trackingArtObjectsInput === '') {
                setArtObjectsDataForRender(artObjectsData);
            } else {
                const dataForRender = [];
                artObjectsData.forEach((artObject) => {
                    if (artObject.name.toLowerCase().includes(trackingArtObjectsInput.toLowerCase())) {
                        dataForRender.push(artObject);
                    }
                })
                setArtObjectsDataForRender(dataForRender);
            }
        }
    },
        [
            artObjectsData,
            boxesData,
            isBoxesTabActive,
            isExhibitsTabActive,
            trackingArtObjectsInput,
            trackingBoxesInput
        ]
    );

    useEffect(() => {
        TrackingApi.getAllBoxes()
            .then((data) => {
                console.log(data.artObjects);
                setArtObjectsData(data.artObjects);
                setBoxesData(data.boxes);
            })
            .catch((err) => console.log(`Ошибка при загрузке ящиков: ${err}`));
    }, []);

    function onBoxClick(boxData) {
        console.log(boxData);
    }

    function onBoxesTabClick() {
        setExhibitsTabActive(false);
        setBoxesTabActive(true);
    }

    function onExhibitsTabClick() {
        setBoxesTabActive(false);
        setExhibitsTabActive(true);
    }

    const foundText = (array) => {
        const value = array.length % 10;
        const doubleValue = array.length;
        if (doubleValue === 11 || doubleValue === 12 || doubleValue === 13 || doubleValue === 14) {
            return 'Найдено'
        }
        if (value === 1) {
            return 'Найден'
        }
        return 'Найдено'
    }

    const exhibitsText = (array) => {
        const newArray = [];
        array.forEach((item) => {
            if (item.status !== 'Хранение') {
                newArray.push(item);
            }
        });
        const value = newArray.length % 10;
        const doubleValue = newArray.length;
        if (doubleValue === 11 || doubleValue === 12 || doubleValue === 13 || doubleValue === 14) {
            return `${newArray.length + ' экспонатов'}`
        }
        if (value === 1) {
            return 'экспонат'
        } else if (value === 2 || value === 3 || value === 4) {
            return `${newArray.length + ' экспоната'}`
        }
        return `${newArray.length + ' экспонатов'}`
    }

    const boxesText = (array) => {
        const value = array.length % 10;
        const doubleValue = array.length;
        if (doubleValue === 11 || doubleValue === 12 || doubleValue === 13 || doubleValue === 14) {
            return 'ящиков'
        }
        if (value === 1) {
            return 'ящик'
        } else if (value === 2 || value === 3 || value === 4) {
            return 'ящика'
        }
        return 'ящиков'
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
                        dataForRender={boxesDataForRender}
                        isBoxesTabActive={isBoxesTabActive}
                        isExhibitsTabActive={isExhibitsTabActive}
                        onBoxClick={onBoxClick}
                        foundText={foundText}
                        exhibitsText={exhibitsText}
                        boxesText={boxesText}
                        boxesSearchInput={boxesSearchInput}
                        artObjectsSearchInput={artObjectsSearchInput}
                        trackingSearchInput={trackingSearchInput}
                    />
                )}
                {isExhibitsTabActive && (
                    <TrackingTable
                        dataForRender={artObjectsDataForRender}
                        isBoxesTabActive={isBoxesTabActive}
                        isExhibitsTabActive={isExhibitsTabActive}
                        onBoxClick={onBoxClick}
                        foundText={foundText}
                        exhibitsText={exhibitsText}
                        boxesText={boxesText}
                        boxesSearchInput={boxesSearchInput}
                        artObjectsSearchInput={artObjectsSearchInput}
                        trackingSearchInput={trackingSearchInput}
                    />
                )}
            </div>
        </section>
    );
}

export default Tracking;
