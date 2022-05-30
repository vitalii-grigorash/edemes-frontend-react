import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import FixationGeneralInformation from "../FixationGeneralInformation/FixationGeneralInformation";
import FixationMoving from "../FixationMoving/FixationMoving";
import * as FixationApi from "../../Api/FixationApi";

function Fixation(props) {

    const {
        handleMobileHeaderNavText,
        fixationHash
    } = props;

    const [isBoxShow, setBoxShow] = useState(false);
    const [isGeneralInformationActive, setGeneralInformationActive] = useState(true);
    const [isMovingActive, setMovingActive] = useState(false);
    const [isQrCodeTabActive, setQrCodeTabActive] = useState(false);
    const [box, setBox] = useState({});

    // http://localhost:3000/fixation/4388fad7-1834-4a67-88c5-b165e36a8c73

    function handleBoxShow() {
        setBoxShow(true);
    }

    function handleBoxHide() {
        setBoxShow(false);
    }

    useEffect(() => {
        if (fixationHash !== '') {
            FixationApi.getFixationBox(fixationHash)
                .then((data) => {
                    if (data !== undefined) {
                        setBox(data);
                        handleBoxShow();
                    } else {
                        handleBoxHide();
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке ящика: ${err}`);
                });
        }
    }, [fixationHash])

    useEffect(() => {
        handleMobileHeaderNavText('Фиксация');
    });

    function onGeneralInformationTabClick() {
        setMovingActive(false);
        setQrCodeTabActive(false);
        setGeneralInformationActive(true);
    }

    function onMovingTabClick() {
        setGeneralInformationActive(false);
        setQrCodeTabActive(false);
        setMovingActive(true);
    }

    function onQrCodeTabClick() {
        setGeneralInformationActive(false);
        setMovingActive(false);
        setQrCodeTabActive(true);
    }

    return (
        <div className='fixation'>
            <Helmet
                title='Фиксация'
            />
            <div className="fixation__heading-container">
                <p className="fixation__heading">Фиксация</p>
            </div>
            {isBoxShow && (
                <div className="fixation__main-container">
                    <div className="fixation__nav-container">
                        <p className={`fixation__nav-text ${isGeneralInformationActive && 'fixation__nav-text_active'}`} onClick={onGeneralInformationTabClick}>Общая информация</p>
                        <p className={`fixation__nav-text ${isMovingActive && 'fixation__nav-text_active'}`} onClick={onMovingTabClick}>Маршрут</p>
                        <p className={`fixation__nav-text ${isQrCodeTabActive && 'fixation__nav-text_active'}`} onClick={onQrCodeTabClick}>QR код</p>
                    </div>
                    {isGeneralInformationActive && (
                        <FixationGeneralInformation
                            box={box}
                        />
                    )}
                    {isMovingActive && (
                        <FixationMoving
                            box={box}
                        />
                    )}
                    {isQrCodeTabActive && (
                        <img className='fixation__qr-code' src={box.box.qr} alt="qr код" />
                    )}
                </div>
            )}
        </div>
    );
}

export default Fixation;
