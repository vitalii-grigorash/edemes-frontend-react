import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Validation } from '../../utils/Validation';
import TrackingTable from '../TrackingTable/TrackingTable';
import Route from '../Route/Route';
import Information from '../Information/Information';
import qrCode from '../../images/qr.svg';
import * as TrackingApi from "../../Api/TrackingApi";

function Tracking(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const boxesSearchInput = Validation();
    const artObjectsSearchInput = Validation();
    const boxArtObjectsSearchInput = Validation();

    const [isBoxesTabActive, setBoxesTabActive] = useState(true);
    const [isExhibitsTabActive, setExhibitsTabActive] = useState(false);
    const [boxesData, setBoxesData] = useState([]);
    const [boxesDataForRender, setBoxesDataForRender] = useState([]);
    const [artObjectsData, setArtObjectsData] = useState([]);
    const [artObjectsDataForRender, setArtObjectsDataForRender] = useState([]);
    const [artBoxObjectsDataForRender, setBoxArtObjectsDataForRender] = useState([]);
    const [trackingBoxesInput, setTrackingBoxesInput] = useState('');
    const [trackingArtObjectsInput, setTrackingArtObjectsInput] = useState('');
    const [trackingBoxArtObjectsInput, setBoxTrackingArtObjectsInput] = useState('');
    const [isBoxOpened, setBoxOpened] = useState(false);
    const [box, setBox] = useState({});
    const [isRouteTabActive, setRouteTabActive] = useState(true);
    const [isArtObjectsTabActive, setArtObjectsTabActive] = useState(false);
    const [isInformationTabActive, setInformationTabActive] = useState(false);
    const [isQrCodeTabActive, setQrCodeTabActive] = useState(false);
    const [tabName, setTabName] = useState('');
    const [boxArtObject, setBoxArtObject] = useState([]);

    function onBackButtonClick() {
        setBoxOpened(false);
        setBoxesTabActive(true);
        setRouteTabActive(true);
        setArtObjectsTabActive(false);
        setInformationTabActive(false);
        setQrCodeTabActive(false);
        boxArtObjectsSearchInput.setValue('');
    }

    function onDisbandButtonClick(id) {
        TrackingApi.disbandBox(id)
            .then(() => {
                TrackingApi.getAllBoxes()
                    .then((data) => {
                        setArtObjectsData(data.artObjects);
                        setBoxesData(data.boxes);
                        onBackButtonClick();
                    })
                    .catch((err) => console.log(`Ошибка при загрузке ящиков: ${err}`));

            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        handleMobileHeaderNavText('Отслеживание');
    });

    useEffect(() => {
        if (isRouteTabActive) {
            setTabName('Маршрут');
        } else if (isArtObjectsTabActive) {
            setTabName('Экспонаты');
        } else if (isInformationTabActive) {
            setTabName('Общая информация');
        } else if (isQrCodeTabActive) {
            setTabName('QR код');
        }
    },
        [
            isRouteTabActive,
            isArtObjectsTabActive,
            isInformationTabActive,
            isQrCodeTabActive
        ]
    )

    function trackingSearchInput(value) {
        if (isBoxesTabActive) {
            setTrackingBoxesInput(value);
        } else if (isExhibitsTabActive) {
            setTrackingArtObjectsInput(value);
        } else if (isArtObjectsTabActive) {
            setBoxTrackingArtObjectsInput(value);
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
        } else if (isArtObjectsTabActive) {
            if (trackingBoxArtObjectsInput === '') {
                setBoxArtObjectsDataForRender(boxArtObject);
            } else {
                const dataForRender = [];
                boxArtObject.forEach((artObject) => {
                    if (artObject.name.toLowerCase().includes(trackingBoxArtObjectsInput.toLowerCase())) {
                        dataForRender.push(artObject);
                    }
                })
                setBoxArtObjectsDataForRender(dataForRender);
            }
        }
    },
        [
            artObjectsData,
            boxesData,
            isBoxesTabActive,
            isExhibitsTabActive,
            isArtObjectsTabActive,
            trackingArtObjectsInput,
            trackingBoxArtObjectsInput,
            boxArtObject,
            trackingBoxesInput
        ]
    );

    useEffect(() => {
        TrackingApi.getAllBoxes()
            .then((data) => {
                setArtObjectsData(data.artObjects);
                setBoxesData(data.boxes);
            })
            .catch((err) => console.log(`Ошибка при загрузке ящиков: ${err}`));
    }, []);

    function onBoxClick(boxData) {
        setBox(boxData);
        setBoxOpened(true);
        setBoxesTabActive(false);
        setExhibitsTabActive(false);
        TrackingApi.getBoxArtObjects(boxData.id)
            .then((data) => {
                setBoxArtObject(data.artObjects);
            })
            .catch((err) => console.log(`Ошибка при загрузке экспонатов: ${err}`));
    }

    function onBoxesTabClick() {
        setExhibitsTabActive(false);
        setBoxesTabActive(true);
    }

    function onExhibitsTabClick() {
        setBoxesTabActive(false);
        setExhibitsTabActive(true);
    }
    function onRouteTabClick() {
        setArtObjectsTabActive(false);
        setInformationTabActive(false);
        setQrCodeTabActive(false);
        setRouteTabActive(true);
    }

    function onArtObjectsTabClick() {
        setRouteTabActive(false);
        setInformationTabActive(false);
        setQrCodeTabActive(false);
        setArtObjectsTabActive(true);
    }

    function onInformationTabClick() {
        setRouteTabActive(false);
        setQrCodeTabActive(false);
        setArtObjectsTabActive(false);
        setInformationTabActive(true);
    }

    function onQrCodeTabClick() {
        setRouteTabActive(false);
        setArtObjectsTabActive(false);
        setInformationTabActive(false);
        setQrCodeTabActive(true);
    }

    function onPrevTabClick() {
        if (isArtObjectsTabActive) {
            setArtObjectsTabActive(false);
            setRouteTabActive(true);
        } else if (isInformationTabActive) {
            setInformationTabActive(false);
            setArtObjectsTabActive(true);
        } else if (isQrCodeTabActive) {
            setQrCodeTabActive(false);
            setInformationTabActive(true);
        }
    }

    function onNextTabClick() {
        if (isRouteTabActive) {
            setRouteTabActive(false);
            setArtObjectsTabActive(true);
        } else if (isArtObjectsTabActive) {
            setArtObjectsTabActive(false);
            setInformationTabActive(true);
        } else if (isInformationTabActive) {
            setInformationTabActive(false);
            setQrCodeTabActive(true);
        }
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
            return `${newArray.length + ' экспонат'}`
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
            {!isBoxOpened ? (
                <>
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
                                isArtObjectsTabActive={isArtObjectsTabActive}
                                onBoxClick={onBoxClick}
                                foundText={foundText}
                                exhibitsText={exhibitsText}
                                boxesText={boxesText}
                                boxesSearchInput={boxesSearchInput}
                                artObjectsSearchInput={artObjectsSearchInput}
                                boxArtObjectsSearchInput={boxArtObjectsSearchInput}
                                trackingSearchInput={trackingSearchInput}
                            />
                        )}
                        {isExhibitsTabActive && (
                            <TrackingTable
                                dataForRender={artObjectsDataForRender}
                                isBoxesTabActive={isBoxesTabActive}
                                isExhibitsTabActive={isExhibitsTabActive}
                                isArtObjectsTabActive={isArtObjectsTabActive}
                                onBoxClick={onBoxClick}
                                foundText={foundText}
                                exhibitsText={exhibitsText}
                                boxesText={boxesText}
                                boxesSearchInput={boxesSearchInput}
                                artObjectsSearchInput={artObjectsSearchInput}
                                boxArtObjectsSearchInput={boxArtObjectsSearchInput}
                                trackingSearchInput={trackingSearchInput}
                            />
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className='tracking__box-heading-container'>
                        <div className='tracking__box-text-container'>
                            <p className='tracking__box-text'>Отслеживание</p>
                            <div className='tracking__box-arrow' />
                            <p className='tracking__box-name'>{box.name}</p>
                        </div>
                        <button type='button' className='tracking__box-back-button' onClick={onBackButtonClick}>Вернуться в отслеживание</button>
                    </div>
                    <div className='tracking__box'>
                        <div className='tracking__box-tabs-container'>
                            <p className={`tracking__box-tab ${isRouteTabActive && 'tracking__box-tab_active'}`} onClick={onRouteTabClick}>Маршрут</p>
                            <p className={`tracking__box-tab ${isArtObjectsTabActive && 'tracking__box-tab_active'}`} onClick={onArtObjectsTabClick}>Экспонаты</p>
                            <p className={`tracking__box-tab ${isInformationTabActive && 'tracking__box-tab_active'}`} onClick={onInformationTabClick}>Общая информация</p>
                            <p className={`tracking__box-tab ${isQrCodeTabActive && 'tracking__box-tab_active'}`} onClick={onQrCodeTabClick}>QR код</p>
                        </div>
                        <div className='tracking__box-heading-container-mobile'>
                            <div className='tracking__box-text-container'>
                                <p className='tracking__box-text'>Отслеживание</p>
                                <div className='tracking__box-arrow' />
                                <p className='tracking__box-name'>{box.name}</p>
                            </div>
                            <button type='button' className='tracking__box-back-button' onClick={onBackButtonClick}>Вернуться в отслеживание</button>
                            <p className='tracking__nav-text'>{tabName}</p>
                        </div>
                        {isRouteTabActive && (
                            <Route
                                onDisbandButtonClick={onDisbandButtonClick}
                                box={box}
                            />
                        )}
                        {isArtObjectsTabActive && (
                            <TrackingTable
                                dataForRender={artBoxObjectsDataForRender}
                                isBoxesTabActive={isBoxesTabActive}
                                isExhibitsTabActive={isExhibitsTabActive}
                                isArtObjectsTabActive={isArtObjectsTabActive}
                                onBoxClick={onBoxClick}
                                foundText={foundText}
                                exhibitsText={exhibitsText}
                                boxesText={boxesText}
                                boxesSearchInput={boxesSearchInput}
                                artObjectsSearchInput={artObjectsSearchInput}
                                boxArtObjectsSearchInput={boxArtObjectsSearchInput}
                                trackingSearchInput={trackingSearchInput}
                            />
                        )}
                        {isInformationTabActive && (
                            <Information
                                box={box}
                                boxArtObject={boxArtObject}
                            />
                        )}
                        {isQrCodeTabActive && (
                            <img className='tracking__qr-code' src={qrCode} alt="qr код" />
                        )}
                        <div className='tracking__box-buttons-container'>
                            {isRouteTabActive && (
                                <button className='tracking__box-button-next tracking__box-button-next_big' onClick={onNextTabClick}>Далее</button>
                            )}
                            {isArtObjectsTabActive && (
                                <>
                                    <button className='tracking__box-button-back' onClick={onPrevTabClick}>Назад</button>
                                    <button className='tracking__box-button-next' onClick={onNextTabClick}>Далее</button>
                                </>
                            )}
                            {isInformationTabActive && (
                                <>
                                    <button className='tracking__box-button-back' onClick={onPrevTabClick}>Назад</button>
                                    <button className='tracking__box-button-next' onClick={onNextTabClick}>Далее</button>
                                </>
                            )}
                            {isQrCodeTabActive && (
                                <button className='tracking__box-button-back tracking__box-button-back_big' onClick={onPrevTabClick}>Назад</button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default Tracking;
