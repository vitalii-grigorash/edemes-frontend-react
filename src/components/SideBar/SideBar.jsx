import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SideBar(props) {

    const {
        logout,
        isMobileSideBarOpen,
        onCloseMobileSideBar,
        userName,
        fixationHash,
        removeFixationHash
    } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const { pathname } = useLocation();

    function onLogoutClick() {
        logout();
        onCloseMobileSideBar('');
        removeFixationHash();
    }

    const handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('side-bar_mobile')) {
            onCloseMobileSideBar('');
        }
    }

    return (
        <div className={`side-bar ${isMobileSideBarOpen && 'side-bar_mobile'}`} onMouseDown={handleOverlayClose}>
            <div className='side-bar__main-container'>
                <div className="side-bar__user-container">
                    <div className="side-bar__user">
                        <div className="side-bar__user-avatar" />
                        <p className="side-bar__user-name">{userName}</p>
                        <p className="side-bar__user-role">{currentUser.role}</p>
                    </div>
                    <div className="side-bar__close-button" onClick={() => onCloseMobileSideBar('')} />
                </div>
                {currentUser.role === 'Администратор' && (
                    <nav className='side-bar__container'>
                        <Link to={'/box-registration'} className='side-bar__logo-container' onClick={() => onCloseMobileSideBar('/box-registration')}>
                            <div className='side-bar__logo' />
                            <p className='side-bar__logo-text'>эдемес</p>
                        </Link>
                        <Link to={'/profile'} className={pathname === '/profile' ? 'side-bar__link-profile side-bar__link-profile_active' : 'side-bar__link-profile'} onClick={() => onCloseMobileSideBar('/profile')}>
                            <div className='side-bar__link-icon side-bar__link-icon_profile' />
                            <p className='side-bar__link-text'>Мой профиль</p>
                        </Link>
                        <Link to={'/box-registration'} className={pathname === '/box-registration' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={() => onCloseMobileSideBar('/box-registration')}>
                            <div className='side-bar__link-icon side-bar__link-icon_box-registration' />
                            <p className='side-bar__link-text'>Регистрация ящика</p>
                        </Link>
                        <Link to={'/tracking'} className={pathname === '/tracking' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={() => onCloseMobileSideBar('/tracking')}>
                            <div className='side-bar__link-icon side-bar__link-icon_tracking' />
                            <p className='side-bar__link-text'>Отслеживание</p>
                        </Link>
                        <Link to={'/catalog'} className={pathname === '/catalog' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={() => onCloseMobileSideBar('/catalog')}>
                            <div className='side-bar__link-icon side-bar__link-icon_catalog' />
                            <p className='side-bar__link-text'>Каталог</p>
                        </Link>
                        <Link to={'/users'} className={pathname === '/users' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={() => onCloseMobileSideBar('/users')}>
                            <div className='side-bar__link-icon side-bar__link-icon_users' />
                            <p className='side-bar__link-text'>Пользователи</p>
                        </Link>
                    </nav>
                )}
                {currentUser.role === 'Оператор' && (
                    <nav className='side-bar__container'>
                        <Link to={'/fixation'} className='side-bar__logo-container'>
                            <div className='side-bar__logo' />
                            <p className='side-bar__logo-text'>эдемес</p>
                        </Link>
                        <Link to={'/profile'} className={pathname === '/profile' ? 'side-bar__link-profile side-bar__link-profile_active' : 'side-bar__link-profile'} onClick={() => onCloseMobileSideBar('/profile')}>
                            <div className='side-bar__link-icon side-bar__link-icon_profile' />
                            <p className='side-bar__link-text'>Мой профиль</p>
                        </Link>
                        <Link to={'/fixation'} className={pathname === '/fixation' || pathname === `/fixation/${fixationHash}` ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={() => onCloseMobileSideBar('/fixation')}>
                            <div className='side-bar__link-icon side-bar__link-icon_fixation' />
                            <p className='side-bar__link-text'>Фиксация</p>
                        </Link>
                        <Link to={'/fixation-history'} className={pathname === '/fixation-history' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={() => onCloseMobileSideBar('/fixation-history')}>
                            <div className='side-bar__link-icon side-bar__link-icon_fixation-history' />
                            <p className='side-bar__link-text'>История фиксаций</p>
                        </Link>
                    </nav>
                )}
                <div className="side-bar__options-container">
                    <div className="side-bar__option-container" onClick={onLogoutClick}>
                        <div className='side-bar__link-icon side-bar__link-icon_logout' />
                        <p className='side-bar__link-text'>Выйти</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
