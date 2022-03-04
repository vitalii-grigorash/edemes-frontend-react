import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import FixationGeneralInformation from "../FixationGeneralInformation/FixationGeneralInformation";
import FixationMoving from "../FixationMoving/FixationMoving";
import FixationDocuments from "../FixationDocuments/FixationDocuments";

function Fixation(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const [isScanButtonActive, setScanButtonActive] = useState(false);
    const [scanButtonText, setScanButtonText] = useState('Сканировать');
    const [isGeneralInformationActive, setGeneralInformationActive] = useState(true);
    const [isMovingActive, setMovingActive] = useState(false);
    const [isDocumentsActive, setDocumentsActive] = useState(false);

    useEffect(() => {
        handleMobileHeaderNavText('Фиксация');
    });

    function onGeneralInformationTabClick() {
        setMovingActive(false);
        setDocumentsActive(false);
        setGeneralInformationActive(true);
    }

    function onMovingTabClick() {
        setGeneralInformationActive(false);
        setDocumentsActive(false);
        setMovingActive(true);
    }

    function onDocumentsTabClick() {
        setGeneralInformationActive(false);
        setMovingActive(false);
        setDocumentsActive(true);
    }

    function onScanButtonClick() {
        setScanButtonActive(true);
        setScanButtonText('Сканировать еще');
    }

    return (
        <div className='fixation'>
            <Helmet
                title='Фиксация'
            />
            <div className="fixation__heading-container">
                <p className="fixation__heading">Фиксация</p>
                <button type="button" className="fixation__scan-button" onClick={onScanButtonClick}>{scanButtonText}</button>
            </div>
            {isScanButtonActive && (
                <div className="fixation__main-container">
                    <div className="fixation__nav-container">
                        <p className={`fixation__nav-text ${isGeneralInformationActive && 'fixation__nav-text_active'}`} onClick={onGeneralInformationTabClick}>Общая информация</p>
                        <p className={`fixation__nav-text ${isMovingActive && 'fixation__nav-text_active'}`} onClick={onMovingTabClick}>Перемещение</p>
                        <p className={`fixation__nav-text ${isDocumentsActive && 'fixation__nav-text_active'}`} onClick={onDocumentsTabClick}>Документы</p>
                    </div>
                    {isGeneralInformationActive && (
                        <FixationGeneralInformation />
                    )}
                    {isMovingActive && (
                        <FixationMoving />
                    )}
                    {isDocumentsActive && (
                        <FixationDocuments />
                    )}
                </div>
            )}
            <div className="fixation__bottom-container">
                <button type="button" className="fixation__scan-button" onClick={onScanButtonClick}>{scanButtonText}</button>
            </div>
        </div>
    );
}

export default Fixation;
