import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Validation } from '../../utils/Validation';
import TrackingTable from '../TrackingTable/TrackingTable';
import Route from '../Route/Route';
import Information from '../Information/Information';
import * as TrackingApi from "../../Api/TrackingApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Tracking(props) {

    const {
        handleMobileHeaderNavText,
        printQr,
        trackingRealoadCancel,
        isTrackingReload
    } = props;

    const currentUser = React.useContext(CurrentUserContext);
    const history = useHistory();

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
    const [currentRow, setCurrentRow] = useState(0);
    const [comments, setComments] = useState([]);
    const [isBoxLoading, setBoxLoading] = useState(false);
    const [isTableLoading, setTableLoading] = useState(false);

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            if (isTrackingReload) {
                setBoxesTabActive(true);
                setExhibitsTabActive(false);
                setBoxOpened(false);
                setRouteTabActive(true);
                setArtObjectsTabActive(false);
                setInformationTabActive(false);
                setQrCodeTabActive(false);
                boxesSearchInput.setValue('');
                artObjectsSearchInput.setValue('');
                boxArtObjectsSearchInput.setValue('');
                trackingRealoadCancel();
            }
        }
    }, [
        isTrackingReload,
        currentUser.role,
        trackingRealoadCancel,
        boxesSearchInput,
        artObjectsSearchInput,
        boxArtObjectsSearchInput
    ])

    useEffect(() => {
        if (currentUser.role === '????????????????') {
            history.push('/fixation');
        }
    })

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
        TrackingApi.disbandBox(id, currentUser.id)
            .then(() => {
                TrackingApi.getAllBoxes()
                    .then((data) => {
                        setArtObjectsData(data.artObjects);
                        setBoxesData(data.boxes);
                        onBackButtonClick();
                    })
                    .catch((err) => console.log(`???????????? ?????? ???????????????? ????????????: ${err}`));

            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            handleMobileHeaderNavText('????????????????????????');
        }
    }, [currentUser.role, handleMobileHeaderNavText]);

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            if (isRouteTabActive) {
                setTabName('??????????????');
            } else if (isArtObjectsTabActive) {
                setTabName('??????????????????');
            } else if (isInformationTabActive) {
                setTabName('?????????? ????????????????????');
            } else if (isQrCodeTabActive) {
                setTabName('QR ??????');
            }
        }
    },
        [
            isRouteTabActive,
            isArtObjectsTabActive,
            isInformationTabActive,
            isQrCodeTabActive,
            currentUser.role
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
        if (currentUser.role === '??????????????????????????') {
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
            trackingBoxesInput,
            currentUser.role
        ]
    );

    useEffect(() => {
        if (currentUser.role === '??????????????????????????') {
            setTableLoading(true);
            TrackingApi.getAllBoxes()
                .then((data) => {
                    setArtObjectsData(data.artObjects);
                    setBoxesData(data.boxes);
                })
                .catch((err) => console.log(`???????????? ?????? ???????????????? ????????????: ${err}`))
                .finally(() => {
                    setTableLoading(false);
                })
        }
    }, [currentUser.role]);

    function onBoxClick(boxData) {
        setBox(boxData);
        setBoxOpened(true);
        setBoxesTabActive(false);
        setExhibitsTabActive(false);
        setBoxLoading(true);
        TrackingApi.getBoxArtObjects(boxData.id)
            .then((data) => {
                setBoxArtObject(data.artObjects);
                setComments(data.fixes.reverse())
            })
            .catch((err) => console.log(`???????????? ?????? ???????????????? ????????????????????: ${err}`))
            .finally(() => {
                setBoxLoading(false);
            })
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

    function onArtObjectClick(artObject) {
        if (!isArtObjectsTabActive) {
            const boxData = boxesData.find((box) => box.id === artObject.boxId);
            onBoxClick(boxData);
            onArtObjectsTabClick();
        }
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
            return '??????????????'
        }
        if (value === 1) {
            return '????????????'
        }
        return '??????????????'
    }

    const exhibitsText = (array) => {
        const newArray = [];
        array.forEach((item) => {
            if (item.status !== '????????????????') {
                newArray.push(item);
            }
        });
        const value = newArray.length % 10;
        const doubleValue = newArray.length;
        if (doubleValue === 11 || doubleValue === 12 || doubleValue === 13 || doubleValue === 14) {
            return `${newArray.length + ' ????????????????????'}`
        }
        if (value === 1) {
            return `${newArray.length + ' ????????????????'}`
        } else if (value === 2 || value === 3 || value === 4) {
            return `${newArray.length + ' ??????????????????'}`
        }
        return `${newArray.length + ' ????????????????????'}`
    }

    const boxesText = (array) => {
        const value = array.length % 10;
        const doubleValue = array.length;
        if (doubleValue === 11 || doubleValue === 12 || doubleValue === 13 || doubleValue === 14) {
            return '????????????'
        }
        if (value === 1) {
            return '????????'
        } else if (value === 2 || value === 3 || value === 4) {
            return '??????????'
        }
        return '????????????'
    }

    function handleShowMore() {
        setCurrentRow(currentRow + 1);
    }

    function hideComments() {
        setCurrentRow(0);
    }

    function onPrintButtonClick() {
        printQr(box.qr);
    }

    return (
        <section className="tracking">
            <Helmet
                title='????????????????????????'
            />
            {!isBoxOpened ? (
                <>
                    <h1 className='tracking__heading'>????????????????????????</h1>
                    <div className='tracking__table'>
                        <div className='tracking__tabs-container'>
                            <p className={`tracking__tab ${isBoxesTabActive && 'tracking__tab_active'}`} onClick={onBoxesTabClick}>??????????</p>
                            <p className={`tracking__tab ${isExhibitsTabActive && 'tracking__tab_active'}`} onClick={onExhibitsTabClick}>??????????????????</p>
                        </div>
                        {isBoxesTabActive && (
                            <TrackingTable
                                dataForRender={boxesDataForRender}
                                isBoxesTabActive={isBoxesTabActive}
                                isExhibitsTabActive={isExhibitsTabActive}
                                isArtObjectsTabActive={isArtObjectsTabActive}
                                onBoxClick={onBoxClick}
                                onArtObjectClick={onArtObjectClick}
                                foundText={foundText}
                                exhibitsText={exhibitsText}
                                boxesText={boxesText}
                                boxesSearchInput={boxesSearchInput}
                                artObjectsSearchInput={artObjectsSearchInput}
                                boxArtObjectsSearchInput={boxArtObjectsSearchInput}
                                trackingSearchInput={trackingSearchInput}
                                isTableLoading={isTableLoading}
                            />
                        )}
                        {isExhibitsTabActive && (
                            <TrackingTable
                                dataForRender={artObjectsDataForRender}
                                isBoxesTabActive={isBoxesTabActive}
                                isExhibitsTabActive={isExhibitsTabActive}
                                isArtObjectsTabActive={isArtObjectsTabActive}
                                onBoxClick={onBoxClick}
                                onArtObjectClick={onArtObjectClick}
                                foundText={foundText}
                                exhibitsText={exhibitsText}
                                boxesText={boxesText}
                                boxesSearchInput={boxesSearchInput}
                                artObjectsSearchInput={artObjectsSearchInput}
                                boxArtObjectsSearchInput={boxArtObjectsSearchInput}
                                trackingSearchInput={trackingSearchInput}
                                isTableLoading={isTableLoading}
                            />
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className='tracking__box-heading-container'>
                        <div className='tracking__box-text-container'>
                            <p className='tracking__box-text'>????????????????????????</p>
                            <div className='tracking__box-arrow' />
                            <p className='tracking__box-name'>{box.name}</p>
                        </div>
                        <button type='button' className='tracking__box-back-button' onClick={onBackButtonClick}>?????????????????? ?? ????????????????????????</button>
                    </div>
                    <div className='tracking__box'>
                        <div className='tracking__box-tabs-container'>
                            <p className={`tracking__box-tab ${isRouteTabActive && 'tracking__box-tab_active'}`} onClick={onRouteTabClick}>??????????????</p>
                            <p className={`tracking__box-tab ${isArtObjectsTabActive && 'tracking__box-tab_active'}`} onClick={onArtObjectsTabClick}>??????????????????</p>
                            <p className={`tracking__box-tab ${isInformationTabActive && 'tracking__box-tab_active'}`} onClick={onInformationTabClick}>?????????? ????????????????????</p>
                            <p className={`tracking__box-tab ${isQrCodeTabActive && 'tracking__box-tab_active'}`} onClick={onQrCodeTabClick}>QR ??????</p>
                        </div>
                        <div className='tracking__box-heading-container-mobile'>
                            <div className='tracking__box-text-container'>
                                <p className='tracking__box-text'>????????????????????????</p>
                                <div className='tracking__box-arrow' />
                                <p className='tracking__box-name'>{box.name}</p>
                            </div>
                            <button type='button' className='tracking__box-back-button' onClick={onBackButtonClick}>?????????????????? ?? ????????????????????????</button>
                            <p className='tracking__nav-text'>{tabName}</p>
                        </div>
                        {isRouteTabActive && (
                            <Route
                                onDisbandButtonClick={onDisbandButtonClick}
                                box={box}
                                fixList={comments}
                            />
                        )}
                        {isArtObjectsTabActive && (
                            <TrackingTable
                                dataForRender={artBoxObjectsDataForRender}
                                isBoxesTabActive={isBoxesTabActive}
                                isExhibitsTabActive={isExhibitsTabActive}
                                isArtObjectsTabActive={isArtObjectsTabActive}
                                onBoxClick={onBoxClick}
                                onArtObjectClick={onArtObjectClick}
                                foundText={foundText}
                                exhibitsText={exhibitsText}
                                boxesText={boxesText}
                                boxesSearchInput={boxesSearchInput}
                                artObjectsSearchInput={artObjectsSearchInput}
                                boxArtObjectsSearchInput={boxArtObjectsSearchInput}
                                trackingSearchInput={trackingSearchInput}
                                isTableLoading={isTableLoading}
                            />
                        )}
                        {isInformationTabActive && (
                            <Information
                                box={box}
                                boxArtObject={boxArtObject}
                                handleShowMore={handleShowMore}
                                hideComments={hideComments}
                                currentRow={currentRow}
                                comments={comments}
                                isBoxLoading={isBoxLoading}
                            />
                        )}
                        {isQrCodeTabActive && (
                            <div className='tracking__qr-code-container'>
                                <img className='tracking__qr-code' src={box.qr} alt="qr ??????" />
                                <button className='tracking__qr-code-button-print' onClick={onPrintButtonClick}>????????????</button>
                            </div>
                        )}
                        <div className='tracking__box-buttons-container'>
                            {isRouteTabActive && (
                                <button className='tracking__box-button-next tracking__box-button-next_big' onClick={onNextTabClick}>??????????</button>
                            )}
                            {isArtObjectsTabActive && (
                                <>
                                    <button className='tracking__box-button-back' onClick={onPrevTabClick}>??????????</button>
                                    <button className='tracking__box-button-next' onClick={onNextTabClick}>??????????</button>
                                </>
                            )}
                            {isInformationTabActive && (
                                <>
                                    <button className='tracking__box-button-back' onClick={onPrevTabClick}>??????????</button>
                                    <button className='tracking__box-button-next' onClick={onNextTabClick}>??????????</button>
                                </>
                            )}
                            {isQrCodeTabActive && (
                                <button className='tracking__box-button-back tracking__box-button-back_big' onClick={onPrevTabClick}>??????????</button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default Tracking;
