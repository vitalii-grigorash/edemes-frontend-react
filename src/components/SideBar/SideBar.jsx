import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from 'react-router-dom';

function SideBar(props) {

    const {
        logout,
        role,
        isMobileSideBarOpen,
        onCloseMobileSideBar
    } = props;

    const { pathname } = useLocation();
    const history = useHistory();

    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (role === "Администратор") {
            history.push('/box-registration');
            setUserName('Иванов И.И.');
        }
        if (role === "Оператор") {
            history.push('/fixation');
            setUserName('Пушкин А.С.');
        }
    }, [history, role]);

    function onLogoutClick() {
        logout();
        onCloseMobileSideBar();
    }

    const handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('side-bar_mobile')) {
            onCloseMobileSideBar();
        }
    }

    return (
        <div className={`side-bar ${isMobileSideBarOpen && 'side-bar_mobile'}`} onMouseDown={handleOverlayClose}>
            <div className='side-bar__main-container'>
                <div className="side-bar__user-container">
                    <div className="side-bar__user">
                        <div className="side-bar__user-avatar" />
                        <p className="side-bar__user-name">{userName}</p>
                        <p className="side-bar__user-role">{role}</p>
                    </div>
                    <div className="side-bar__close-button" onClick={onCloseMobileSideBar} />
                </div>
                {role === 'Администратор' && (
                    <nav className='side-bar__container'>
                        <Link to={'/box-registration'} className='side-bar__logo-container'>
                            <div className='side-bar__logo' />
                            <p className='side-bar__logo-text'>эдемес</p>
                        </Link>
                        <Link to={'#'} className={pathname === '' ? 'side-bar__link-profile side-bar__link-profile_active' : 'side-bar__link-profile'} onClick={onCloseMobileSideBar}>
                            <div className='side-bar__link-icon side-bar__link-icon_profile' />
                            <p className='side-bar__link-text'>Мой профиль</p>
                        </Link>
                        <Link to={'/box-registration'} className={pathname === '/box-registration' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={onCloseMobileSideBar}>
                            <div className='side-bar__link-icon side-bar__link-icon_box-registration' />
                            <p className='side-bar__link-text'>Регистрация ящика</p>
                        </Link>
                        <Link to={'/tracking'} className={pathname === '/tracking' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={onCloseMobileSideBar}>
                            <div className='side-bar__link-icon side-bar__link-icon_tracking' />
                            <p className='side-bar__link-text'>Отслеживание</p>
                        </Link>
                        <Link to={'/catalog'} className={pathname === '/catalog' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={onCloseMobileSideBar}>
                            <div className='side-bar__link-icon side-bar__link-icon_catalog' />
                            <p className='side-bar__link-text'>Каталог</p>
                        </Link>
                        <Link to={'/users'} className={pathname === '/users' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={onCloseMobileSideBar}>
                            <div className='side-bar__link-icon side-bar__link-icon_users' />
                            <p className='side-bar__link-text'>Пользователи</p>
                        </Link>
                    </nav>
                )}
                {role === 'Оператор' && (
                    <nav className='side-bar__container'>
                        <Link to={'/fixation'} className='side-bar__logo-container'>
                            <div className='side-bar__logo' />
                            <p className='side-bar__logo-text'>эдемес</p>
                        </Link>
                        <Link to={'#'} className={pathname === '' ? 'side-bar__link-profile side-bar__link-profile_active' : 'side-bar__link-profile'} onClick={onCloseMobileSideBar}>
                            <div className='side-bar__link-icon side-bar__link-icon_profile' />
                            <p className='side-bar__link-text'>Мой профиль</p>
                        </Link>
                        <Link to={'/fixation'} className={pathname === '/fixation' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={onCloseMobileSideBar}>
                            <div className='side-bar__link-icon side-bar__link-icon_fixation' />
                            <p className='side-bar__link-text'>Фиксация</p>
                        </Link>
                        <Link to={'/fixation-history'} className={pathname === '/fixation-history' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'} onClick={onCloseMobileSideBar}>
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
