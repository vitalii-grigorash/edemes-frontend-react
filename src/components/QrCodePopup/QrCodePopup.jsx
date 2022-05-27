import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import * as BoxRegistrationApi from '../../Api/BoxRegistrationApi';

function QrCodePopup(props) {

    const {
        data,
        isOpen,
        onClosePopupClick,
    } = props;

    const [qrCodeSrc, setQrCodeSrc] = useState('');

    useEffect(() => {
        if (isOpen) {
            console.log(data);
            QRCode.toDataURL(`http://localhost:3000/fixation/${data.hashQr}`)
                .then((qr) => {
                    setQrCodeSrc(qr)
                    BoxRegistrationApi.addQr({
                        id: data.id,
                        qr: qr
                    })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err.message);
                        })
                });
        }
    }, [isOpen, data.url, data]);

    const handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('qr-code-popup_opened')) {
            onClosePopupClick();
        }
    }

    return (
        <div className={`qr-code-popup ${isOpen && 'qr-code-popup_opened'}`} onMouseDown={handleOverlayClose}>
            <div className='qr-code-popup__main-container'>
                <p className='qr-code-popup__heading'>Qr-код созданного ящика</p>
                <img className='qr-code-popup__qr-code' src={qrCodeSrc} alt="qr-код" />
                <button className='qr-code-popup__button' onClick={onClosePopupClick}>Закрыть</button>
            </div>
        </div>
    );
}

export default QrCodePopup;
