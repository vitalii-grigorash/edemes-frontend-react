import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TablePagination from '../TablePagination/TablePagination';
import { Validation } from '../../utils/Validation';
import * as UsersApi from '../../Api/UsersApi';

function Users(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const { pathname } = useLocation();
    const [isRoleOptionsContainerOpen, setRoleOptionsContainerOpen] = useState(false);
    const [roleOptionsContainerValue, setRoleOptionsContainerValue] = useState('Оператор');
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);
    const [isAddUserTabActive, setAddUserTabActive] = useState(true);
    const [isListTabActive, setListTabActive] = useState(false);
    const [users, setUsers] = useState([]);

    const firstName = Validation();
    const lastName = Validation();
    const middleName = Validation();
    const email = Validation();

    useEffect(() => {
        handleMobileHeaderNavText('Пользователи');
    });

    function getUsers() {
        UsersApi.getAllUsers()
            .then((data) => {
                setUsers(data.users);
            })
            .catch((err) => console.log(`Ошибка при загрузке списка пользователей: ${err}`));
    }

    useEffect(() => {
        if (pathname === '/users') {
            getUsers();
        }
    }, [pathname])

    function handleUserActive(user) {
        UsersApi.changeActiveUser(user.id)
            .then(() => {
                getUsers();
            })
            .catch((err) => console.log(`Ошибка при загрузке списка пользователей: ${err}`));
    }

    function clearAllInputs() {
        firstName.setValue('');
        lastName.setValue('');
        middleName.setValue('');
        email.setValue('');
        setRoleOptionsContainerValue('Оператор');
    }

    function onAddUserButtonClick() {
        const newUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            middleName: middleName.value,
            email: email.value,
            role: roleOptionsContainerValue
        }
        console.log(newUser);
        clearAllInputs();
    }

    function onAddUserTabClick() {
        setListTabActive(false);
        setAddUserTabActive(true);
    }

    function onListTabClick() {
        setAddUserTabActive(false);
        setListTabActive(true);
    }

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    function onRoleOptionClick(value) {
        setRoleOptionsContainerValue(value);
    }

    function handleRoleOptionsContainerOpen() {
        if (isRoleOptionsContainerOpen) {
            setRoleOptionsContainerOpen(false);
        } else {
            setRoleOptionsContainerOpen(true);
        }
    }

    return (
        <div className="users">
            <Helmet
                title='Пользователи'
            />
            <h1 className='users__heading'>Пользователи</h1>
            <div className='users__container'>
                <div className='users__tabs-container'>
                    <p className={`users__tab ${isAddUserTabActive && 'users__tab_active'}`} onClick={onAddUserTabClick}>Добавить пользователя</p>
                    <p className={`users__tab ${isListTabActive && 'users__tab_active'}`} onClick={onListTabClick}>Список</p>
                </div>
                {isAddUserTabActive && (
                    <div className='users__add-user-container'>
                        <div className='users__add-user-inputs-main-container'>
                            <div className='users__add-user-inputs-container'>
                                <div className='users__add-user-input-container'>
                                    <p className='users__add-user-input-label'>Фамилия</p>
                                    <input
                                        type="text"
                                        className='users__add-user-input'
                                        name="lastName"
                                        placeholder='Иванов'
                                        value={lastName.value}
                                        onChange={lastName.onChange}
                                    />
                                </div>
                                <div className='users__add-user-input-container'>
                                    <p className='users__add-user-input-label'>Имя</p>
                                    <input
                                        type="text"
                                        className='users__add-user-input'
                                        name="firstName"
                                        placeholder=''
                                        value={firstName.value}
                                        onChange={firstName.onChange}
                                    />
                                </div>
                                <div className='users__add-user-input-container'>
                                    <p className='users__add-user-input-label'>Отчество</p>
                                    <input
                                        type="text"
                                        className='users__add-user-input'
                                        name="middleName"
                                        placeholder=''
                                        value={middleName.value}
                                        onChange={middleName.onChange}
                                    />
                                </div>
                            </div>
                            <div className='users__add-user-inputs-container'>
                                <div className='users__add-user-input-container'>
                                    <p className='users__add-user-input-label'>Почта</p>
                                    <input
                                        type="email"
                                        className='users__add-user-input'
                                        name="email"
                                        placeholder=''
                                        value={email.value}
                                        onChange={email.onChange}
                                    />
                                </div>
                                <div className='users__add-user-input-container'>
                                    <p className='users__add-user-input-label'>Роль</p>
                                    <div className='users__add-user-role-container' onClick={handleRoleOptionsContainerOpen}>
                                        <p className='users__add-user-role-text'>{roleOptionsContainerValue}</p>
                                        <div className='users__add-user-role-arrow-icon' />
                                        <div className={`users__add-user-role-options-container ${isRoleOptionsContainerOpen && 'users__add-user-role-options-container_active'}`}>
                                            <div className='users__add-user-role-option-container'>
                                                <p className='users__add-user-role-option' onClick={() => onRoleOptionClick('Администратор')}>Администратор</p>
                                            </div>
                                            <div className='users__add-user-role-option-container'>
                                                <p className='users__add-user-role-option' onClick={() => onRoleOptionClick('Оператор')}>Оператор</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type='button' className='users__user-add-button' onClick={onAddUserButtonClick}>Добавить</button>
                    </div>
                )}
                {isListTabActive && (
                    <div className='users__table-container'>
                        <div className='users__table-rows users__table-rows_heading'>
                            <p className='users__table-name'>ФИО</p>
                            <p className='users__table-email'>Почта</p>
                            <p className='users__table-role'>Роль</p>
                        </div>
                        {users !== null ? (
                            <>
                                {users.slice(showResultsFrom, resultsShow).map((user) => (
                                    <div key={user.id} className='users__table-rows'>
                                        <p className='users__table-name'>{user.lastName} {user.firstName} {user.middleName}</p>
                                        <p className='users__table-email'>{user.email}</p>
                                        <p className='users__table-role'>{user.role}</p>
                                        <div className={`users__table-button-container ${!user.active && 'users__table-button-container_disabled'}`} onClick={() => handleUserActive(user)}>
                                            <div className={`users__table-button ${!user.active && 'users__table-button_disabled'}`} />
                                        </div>
                                        <p className={`users__table-button-text ${!user.active && 'users__table-button-text_disabled'}`}>Заблокировать</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className='users__table-rows'>
                                <p className='users__no-results-text'>Нет данных для отображения</p>
                            </div>
                        )}
                        <TablePagination
                            sortList={users}
                            handleShowResultsFrom={handleShowResultsFrom}
                            handleResultsShow={handleResultsShow}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
