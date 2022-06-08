import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FixationGeneralInformation from "../FixationGeneralInformation/FixationGeneralInformation";
import FixationMoving from "../FixationMoving/FixationMoving";
import * as FixationApi from "../../Api/FixationApi";
import { Validation } from '../../utils/Validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Fixation(props) {

    const {
        handleMobileHeaderNavText,
        fixationHash,
        printQr,
        isFixationReload,
        fixationRealoadCancel
    } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const history = useHistory();
    const comment = Validation();
    const [isBoxShow, setBoxShow] = useState(false);
    const [isGeneralInformationActive, setGeneralInformationActive] = useState(true);
    const [isMovingActive, setMovingActive] = useState(false);
    const [isQrCodeTabActive, setQrCodeTabActive] = useState(false);
    const [currentRow, setCurrentRow] = useState(0);
    const [box, setBox] = useState({});
    const [comments, setComments] = useState([]);
    const [isBoxLoading, setBoxLoading] = useState(false);

    // http://localhost:3000/fixation/8041d685-a769-4e4e-8984-2ecb5e44182b

    useEffect(() => {
        if (currentUser.role === 'Администратор') {
            history.push('/box-registration');
        }
    })

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
            setBoxLoading(true);
            FixationApi.getFixationBox(fixationHash)
                .then((data) => {
                    if (data !== undefined) {
                        setBox(data);
                        setComments(data.fixList);
                        handleBoxShow();
                    } else {
                        handleBoxHide();
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке ящика: ${err}`);
                })
                .finally(() => {
                    setBoxLoading(false);
                })
        }
    }

    useEffect(() => {
        if (currentUser.role === 'Оператор') {
            getFixation();
        }
        // eslint-disable-next-line
    }, [currentUser.role]);

    useEffect(() => {
        if (currentUser.role === 'Оператор') {
            if (isFixationReload) {
                setBoxShow(false);
                setGeneralInformationActive(true);
                setMovingActive(false);
                setQrCodeTabActive(false);
                hideComments();
                setBox({});
                setComments([]);
                setBoxLoading(false);
                getFixation();
                fixationRealoadCancel();
            }
        }
        // eslint-disable-next-line
    }, [currentUser.role, isFixationReload, fixationRealoadCancel]);

    useEffect(() => {
        if (currentUser.role === 'Оператор') {
            handleMobileHeaderNavText('Фиксация');
        }
    }, [currentUser.role, handleMobileHeaderNavText]);

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

    function onPrintButtonClick() {
        printQr(box.box.qr);
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
                            isBoxLoading={isBoxLoading}
                        />
                    )}
                    {isMovingActive && (
                        <FixationMoving
                            box={box}
                            isFixationPage={true}
                        />
                    )}
                    {isQrCodeTabActive && (
                        <div className="fixation__qr-code-container">
                            <img className='fixation__qr-code' src={box.box.qr} alt="qr код" />
                            <button className='fixation__qr-code-button-print' onClick={onPrintButtonClick}>Печать</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Fixation;
