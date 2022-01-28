import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import UsersListData from '../../utils/UsersListData.json';
import TablePagination from '../TablePagination/TablePagination';

function Users() {

    const [isRoleOptionsContainerOpen, setRoleOptionsContainerOpen] = useState(false);
    const [roleOptionsContainerValue, setRoleOptionsContainerValue] = useState('Оператор');
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);

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
            <div className='users__add-user-container'>
                <p className='users__add-user-heading'>Добавить пользователя</p>
                <div className='users__add-user-inputs-container'>
                    <div className='users__add-user-input-container'>
                        <p className='users__add-user-input-label'>Фамилия</p>
                        <input type="text" placeholder='' className='users__add-user-input' />
                    </div>
                    <div className='users__add-user-input-container'>
                        <p className='users__add-user-input-label'>Имя</p>
                        <input type="text" placeholder='' className='users__add-user-input' />
                    </div>
                    <div className='users__add-user-input-container'>
                        <p className='users__add-user-input-label'>Отчество</p>
                        <input type="text" placeholder='' className='users__add-user-input' />
                    </div>
                </div>
                <div className='users__add-user-inputs-container'>
                    <div className='users__add-user-input-container'>
                        <p className='users__add-user-input-label'>Логин</p>
                        <input type="text" placeholder='' className='users__add-user-input' />
                    </div>
                    <div className='users__add-user-input-container'>
                        <p className='users__add-user-input-label'>Почта</p>
                        <input type="text" placeholder='' className='users__add-user-input' />
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
                <button type='button' className='users__user-add-button'>Добавить</button>
            </div>

            <div className='users__table-container'>
                <p className='users__table-heading'>Список пользователей</p>
                <div className='users__table'>
                    <div className='users__table-rows users__table-rows_heading'>
                        <p className='users__table-last-name'>Фамилия</p>
                        <p className='users__table-first-name'>Имя</p>
                        <p className='users__table-middle-name'>Отчество</p>
                        <p className='users__table-login'>Логин</p>
                        <p className='users__table-password'>Пароль</p>
                        <p className='users__table-role'>Роль</p>
                    </div>
                    {UsersListData !== null ? (
                        <>
                            {UsersListData.slice(showResultsFrom, resultsShow).map((list) => (
                                <div key={list.id} className='users__table-rows'>
                                    <p className='users__table-last-name'>{list.lastName}</p>
                                    <p className='users__table-first-name'>{list.firstName}</p>
                                    <p className='users__table-middle-name'>{list.middleName}</p>
                                    <p className='users__table-login'>{list.login}</p>
                                    <p className='users__table-password'>{list.password}</p>
                                    <p className='users__table-role'>{list.role}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className='users__table-rows'>
                            <p className='users__no-results-text'>Нет данных для отображения</p>
                        </div>
                    )}
                    <TablePagination
                        sortList={UsersListData}
                        handleShowResultsFrom={handleShowResultsFrom}
                        handleResultsShow={handleResultsShow}
                    />
                </div>
            </div>

        </div>
    );

}

export default Users;