import React, { useState } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';

function Header(props) {

    const {
        logout,
        onOpenMobileSideBar,
        mobileHeaderNavText,
        userName,
        removeFixationHash
    } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const [isUserOptionsShow, setUserOptionsShow] = useState(false);

    function handleShowUserOptions() {
        if (isUserOptionsShow) {
            setUserOptionsShow(false);
        } else {
            setUserOptionsShow(true);
        }
    }

    function onLogoutClick() {
        logout();
        removeFixationHash();
    }

    return (
        <div className='header'>
            <div className="header__user-container" onClick={handleShowUserOptions}>
                <div className="header__user-info-container">
                    <p className="header__user-name">{userName}</p>
                    <p className="header__user-role">{currentUser.role}</p>
                </div>
                <div className='header__avatar' />
                <div className={`header__arrow ${isUserOptionsShow && 'header__arrow_close'}`} />
                <div className={`header__user-options-container ${isUserOptionsShow && 'header__user-options-container_active'}`}>
                    <Link to={'/profile'} className='header__user-my-profile-container' onClick={() => onOpenMobileSideBar('/profile')}>
                        <p className="header__user-my-profile">Мой профиль</p>
                    </Link>
                    <div className="header__user-option-container" onClick={onLogoutClick}>
                        <div className="header__user-logout-icon" />
                        <p className="header__user-logout">Выйти</p>
                    </div>
                </div>
            </div>
            <div className="header__mobile-container">
                <div className="header__burger-menu-button" onClick={() => onOpenMobileSideBar('')} />
                <h2 className="header__mobile-nav-text">{mobileHeaderNavText}</h2>
            </div>
        </div>
    );
}

export default Header;
