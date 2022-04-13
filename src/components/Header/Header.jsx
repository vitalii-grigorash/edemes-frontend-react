import React, { useState } from "react";

function Header(props) {

    const {
        logout,
        role,
        onOpenMobileSideBar,
        mobileHeaderNavText,
        userName
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
                <div className="header__user-info-container">
                    <p className="header__user-name">{userName}</p>
                    <p className="header__user-role">{role}</p>
                </div>
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
            <div className="header__mobile-container">
                <div className="header__burger-menu-button" onClick={onOpenMobileSideBar} />
                <h2 className="header__mobile-nav-text">{mobileHeaderNavText}</h2>
            </div>
        </div>
    );
}

export default Header;
