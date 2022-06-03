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
        fixationHash
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

    // http://localhost:3000/fixation/83fba6a1-9e5a-4909-8f19-23007848bfd0
    // http://localhost:3000/fixation/127e7e77-381c-4038-a66b-c560b3ce4f85
    // http://localhost:3000/fixation/77af183c-3b2c-4f7b-97f2-c6fb8d8812a9
    // http://localhost:3000/fixation/8647fcc3-81d6-4f83-9407-af300f7ec140
    // http://localhost:3000/fixation/5d326ca4-b471-44c9-94bb-92cb9742c61c

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
                        <img className='fixation__qr-code' src={box.box.qr} alt="qr код" />
                    )}
                </div>
            )}
        </div>
    );
}

export default Fixation;
