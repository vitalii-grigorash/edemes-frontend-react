import React from "react";
import { useLocation, useHistory } from 'react-router-dom';

function SuccessPopup(props) {

    const {
        isOpen,
        onClosePopupClick
    } = props;

    const history = useHistory();
    const { pathname } = useLocation();

    function onLoginButtonClick() {
        history.push('/login');
        onClosePopupClick();
    }

    function onCloseButonClick() {
        onClosePopupClick();
    }

    return (
        <div className={`success-popup ${isOpen && 'success-popup_opened'}`}>
            <div className='success-popup__main-container'>
                <div className="success-popup__header-container">
                    {pathname === '/register' && (
                        <>
                            <p className="success-popup__success-message">Регистрация прошла успешно!</p>
                            <p className="success-popup__email-message">На вашу почту отправлена инструкция по подтверждению регистрации</p>
                        </>
                    )}
                    {pathname === '/users' && (
                        <p className="success-popup__user-message">Пользователь добавлен!</p>
                    )}
                    {pathname === '/profile' && (
                        <p className="success-popup__user-message">Данные успешно сохранены!</p>
                    )}
                </div>
                {pathname === '/register' && (
                    <button type="button" className="success-popup__login-button" onClick={onLoginButtonClick}>Войти</button>
                )}
                {pathname === '/users' && (
                    <button type="button" className="success-popup__close-button" onClick={onCloseButonClick}>Закрыть</button>
                )}
                {pathname === '/profile' && (
                    <button type="button" className="success-popup__close-button" onClick={onCloseButonClick}>Закрыть</button>
                )}
            </div>
        </div>
    );
}

export default SuccessPopup;
