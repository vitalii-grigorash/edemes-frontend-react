import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

function QrCodePopup(props) {

    const {
        data,
        isOpen,
        onClosePopupClick,
    } = props;

    const [qrCodeSrc, setQrCodeSrc] = useState('');

    useEffect(() => {
        if (isOpen) {
            QRCode.toDataURL(data.url)
                .then((data) => {
                    setQrCodeSrc(data)
                    // Здесь сделать запрос к API по id ящика и методом PUT отправить туда строку QR-кода.
                });
        }
    }, [isOpen, data.url]);

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
