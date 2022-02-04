import React, { useState } from "react";

function Header(props) {

    const {
        logout,
        role
    } = props;

    const [isUserOptionsShow, setUserOptionsShow] = useState(false);

    function handleShowUserOptions() {
        if (isUserOptionsShow) {
            setUserOptionsShow(false);
        } else {
            setUserOptionsShow(true);
        }
    }

    return (
        <div className='header'>
            <div className="header__user-container" onClick={handleShowUserOptions}>
                {role === 'Администратор' && (
                    <div className="header__user-info-container">
                        <p className="header__user-name">Иванов И.И.</p>
                        <p className="header__user-role">Администратор</p>
                    </div>
                )}
                {role === 'Оператор' && (
                    <div className="header__user-info-container">
                        <p className="header__user-name">Пушкин А.С.</p>
                        <p className="header__user-role">Оператор</p>
                    </div>
                )}
                <div className='header__avatar' />
                <div className={`header__arrow ${isUserOptionsShow && 'header__arrow_close'}`} />
                <div className={`header__user-options-container ${isUserOptionsShow && 'header__user-options-container_active'}`}>
                    <div className="header__user-option-container">
                        <p className="header__user-my-profile">Мой профиль</p>
                    </div>
                    <div className="header__user-option-container" onClick={logout}>
                        <div className="header__user-logout-icon" />
                        <p className="header__user-logout">Выйти</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
