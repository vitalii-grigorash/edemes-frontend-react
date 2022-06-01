import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import FixationGeneralInformation from "../FixationGeneralInformation/FixationGeneralInformation";
import FixationMoving from "../FixationMoving/FixationMoving";
import * as FixationApi from "../../Api/FixationApi";
import { Validation } from '../../utils/Validation';

function Fixation(props) {

    const {
        handleMobileHeaderNavText,
        fixationHash
    } = props;

    const comment = Validation();
    const [isBoxShow, setBoxShow] = useState(false);
    const [isGeneralInformationActive, setGeneralInformationActive] = useState(true);
    const [isMovingActive, setMovingActive] = useState(false);
    const [isQrCodeTabActive, setQrCodeTabActive] = useState(false);
    const [currentRow, setCurrentRow] = useState(0);
    const [box, setBox] = useState({});
    const [comments, setComments] = useState([]);

    // http://localhost:3000/fixation/9662ac60-614d-4f0d-8a53-8a5058437341

    function handleShowMore() {
        setCurrentRow(currentRow + 1);
    }

    function hideComments() {
        setCurrentRow(0);
    }

    function handleBoxShow() {
        setBoxShow(true);
    }

    function handleBoxHide() {
        setBoxShow(false);
    }

    function getFixation() {
        if (fixationHash !== '') {
            FixationApi.getFixationBox(fixationHash)
                .then((data) => {
                    if (data !== undefined) {
                        console.log(data);
                        setBox(data);
                        setComments(data.fixList);
                        handleBoxShow();
                    } else {
                        handleBoxHide();
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке ящика: ${err}`);
                });
        }
    }

    useEffect(() => {
        getFixation();
        // eslint-disable-next-line
    }, []);

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
                            handleShowMore={handleShowMore}
                            hideComments={hideComments}
                            currentRow={currentRow}
                            comments={comments}
                            comment={comment}
                            getFixation={getFixation}
                            isFixationPage={true}

                        />
                    )}
                    {isMovingActive && (
                        <FixationMoving
                            box={box}
                            isFixationPage={true}
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
