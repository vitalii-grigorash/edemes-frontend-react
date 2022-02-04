import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from 'react-router-dom';

function SideBar(props) {

    const {
        role
    } = props;

    const { pathname } = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (role === "Администратор") {
            history.push('/box-registration');
        }
        if (role === "Оператор") {
            history.push('/fixation');
        }
    }, [history, role]);

    return (
        <div className='side-bar'>
            {role === 'Администратор' && (
                <nav className='side-bar__main-container'>
                    <Link to={'/box-registration'} className='side-bar__logo-container'>
                        <div className='side-bar__logo' />
                        <p className='side-bar__logo-text'>эдемес</p>
                    </Link>
                    <Link to={'/box-registration'} className={pathname === '/box-registration' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'}>
                        <div className='side-bar__link-icon side-bar__link-icon_box-registration' />
                        <p className='side-bar__link-text'>Регистрация ящика</p>
                    </Link>
                    <Link to={'/tracking'} className={pathname === '/tracking' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'}>
                        <div className='side-bar__link-icon side-bar__link-icon_tracking' />
                        <p className='side-bar__link-text'>Отслеживание</p>
                    </Link>
                    <Link to={'/catalog'} className={pathname === '/catalog' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'}>
                        <div className='side-bar__link-icon side-bar__link-icon_catalog' />
                        <p className='side-bar__link-text'>Каталог</p>
                    </Link>
                    <Link to={'/users'} className={pathname === '/users' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'}>
                        <div className='side-bar__link-icon side-bar__link-icon_users' />
                        <p className='side-bar__link-text'>Пользователи</p>
                    </Link>
                </nav>
            )}
            {role === 'Оператор' && (
                <nav className='side-bar__main-container'>
                    <Link to={'/fixation'} className='side-bar__logo-container'>
                        <div className='side-bar__logo' />
                        <p className='side-bar__logo-text'>эдемес</p>
                    </Link>
                    <Link to={'/fixation'} className={pathname === '/fixation' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'}>
                        <div className='side-bar__link-icon side-bar__link-icon_fixation' />
                        <p className='side-bar__link-text'>Фиксация</p>
                    </Link>
                    <Link to={'/fixation-history'} className={pathname === '/fixation-history' ? 'side-bar__link-container side-bar__link-container_active' : 'side-bar__link-container'}>
                        <div className='side-bar__link-icon side-bar__link-icon_fixation-history' />
                        <p className='side-bar__link-text'>История фиксаций</p>
                    </Link>
                </nav>
            )}
        </div>
    );
}

export default SideBar;
