import React from "react";
import { useHistory } from 'react-router-dom';

function SuccessPopup(props) {

    const {
        isOpen,
        onClosePopupClick
    } = props;

    const history = useHistory();

    function onLoginButtonClick () {
        history.push('/login');
        onClosePopupClick();
    }

    return (
        <div className={`success-popup ${isOpen && 'success-popup_opened'}`}>
            <div className='success-popup__main-container'>
                <div className="success-popup__header-container">
                    <p className="success-popup__success-message">Регистрация прошла успешно!</p>
                    <p className="success-popup__email-message">На вашу почту отправлена инструкция по подтверждению регистрации</p>
                </div>
                <button type="button" className="success-popup__login-button" onClick={onLoginButtonClick}>Войти</button>
            </div>
        </div>
    );
}

export default SuccessPopup;
