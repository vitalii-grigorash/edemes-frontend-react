import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Validation } from '../../utils/Validation';
import HistoryTable from '../HistoryTable/HistoryTable';
import * as FixationApi from "../../Api/FixationApi";
import * as TrackingApi from "../../Api/TrackingApi";

function FixationHistory(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const boxesSearchInput = Validation();

    const [isBoxesTabActive, setBoxesTabActive] = useState(true);
    const [historyBoxesInput, setHistoryBoxesInput] = useState('');
    const [boxesHistory, setBoxesHistory] = useState([]);
    const [boxesHistoryForRender, setBoxesHistoryForRender] = useState([]);
    const [box, setBox] = useState({});
    const [isBoxOpened, setBoxOpened] = useState(false);

    useEffect(() => {
        FixationApi.getFixationHistory(currentUser.id)
            .then((data) => {
                console.log(data.fixesList);
                setBoxesHistory(data.fixesList);
            })
            .catch((err) => {
                console.log(`Ошибка при загрузке ящиков: ${err}`);
            });
    }, [currentUser.id])

    useEffect(() => {
        handleMobileHeaderNavText('История фиксаций');
    });

    function onBoxesTabClick() {
        setBoxesTabActive(true);
    }

    function historySearchInput(value) {
        if (isBoxesTabActive) {
            setHistoryBoxesInput(value);
        }
    }

    useEffect(() => {
        if (isBoxesTabActive) {
            if (historyBoxesInput === '') {
                setBoxesHistoryForRender(boxesHistory);
            } else {
                const dataForRender = [];
                boxesHistory.forEach((box) => {
                    if (box.name.toLowerCase().includes(historyBoxesInput.toLowerCase())) {
                        dataForRender.push(box);
                    }
                })
                setBoxesHistoryForRender(dataForRender);
            }
        }
    },
        [
            historyBoxesInput,
            boxesHistory,
            isBoxesTabActive
        ]
    );

    function onBoxClick(boxData) {
        console.log(boxData);
        setBox(boxData);
        setBoxOpened(true);
        setBoxesTabActive(false);
        TrackingApi.getBoxArtObjects(boxData.id)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(`Ошибка при загрузке экспонатов: ${err}`));
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
        <section className='fixation-history'>
            <Helmet
                title='История фиксаций'
            />
            {!isBoxOpened ? (
                <>
                    <h1 className='fixation-history__heading'>История фиксаций</h1>
                    <div className='fixation-history__table'>
                        <div className='fixation-history__tabs-container'>
                            <p className={`fixation-history__tab ${isBoxesTabActive && 'fixation-history__tab_active'}`} onClick={onBoxesTabClick}>Ящики</p>
                        </div>
                        {isBoxesTabActive && (
                            <HistoryTable
                                dataForRender={boxesHistoryForRender}
                                historySearchInput={historySearchInput}
                                onBoxClick={onBoxClick}
                                foundText={foundText}
                                boxesText={boxesText}
                                boxesSearchInput={boxesSearchInput}
                            />
                        )}
                    </div>
                </>
            ) : (
                <p>{box.name}</p>
            )}
        </section>
    );
}

export default FixationHistory;
