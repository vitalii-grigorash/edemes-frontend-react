import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import * as BoxRegistrationApi from '../../Api/BoxRegistrationApi';
import { options } from '../../config';

function QrCodePopup(props) {

    const {
        data,
        isOpen,
        onClosePopupClick,
        printQr
    } = props;

    const [qrCodeSrc, setQrCodeSrc] = useState('');
    const QR_CODE_URL = options.frontUrl;

    useEffect(() => {
        if (isOpen) {
            console.log(`${QR_CODE_URL}/fixation/${data.hashQr}`);
            QRCode.toDataURL(`${QR_CODE_URL}/fixation/${data.hashQr}`)
                .then((qr) => {
                    setQrCodeSrc(qr)
                    BoxRegistrationApi.addQr({
                        id: data.id,
                        qr: qr
                    })
                        .then(() => {
                            
                        })
                        .catch((err) => {
                            console.log(err.message);
                        })
                });
        }
    }, [isOpen, data.url, data, QR_CODE_URL]);

    const handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('qr-code-popup_opened')) {
            onClosePopupClick();
        }
    }

    function onPrintButtonClick() {
        printQr(qrCodeSrc);
    }

    return (
        <div className={`qr-code-popup ${isOpen && 'qr-code-popup_opened'}`} onMouseDown={handleOverlayClose}>
            <div className='qr-code-popup__main-container'>
                <p className='qr-code-popup__heading'>Ящик зарегистрирован!</p>
                <p className='qr-code-popup__text'>Qr-код созданного ящика</p>
                <img className='qr-code-popup__qr-code' src={qrCodeSrc} alt="qr-код" />
                <div className='qr-code-popup__buttons-container'>
                    <button className='qr-code-popup__button-print' onClick={onPrintButtonClick}>Печать</button>
                    <button className='qr-code-popup__button-close' onClick={onClosePopupClick}>Закрыть</button>
                </div>
            </div>
        </div>
    );
}

export default QrCodePopup;
