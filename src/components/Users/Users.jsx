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
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [isOptionsOpen, setOptionsOpen] = useState(false);
    const [isOptionSelected, setOptionSelected] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Выберите тип сортировки');
    const [stateMethod, setStateMethod] = useState('Все');
    const [roleMethod, setRoleMethod] = useState('Все');

    function handleShowFilter() {
        if (isFilterOpen) {
            setFilterOpen(false);
        } else {
            setFilterOpen(true);
        }
    }
    function handleShowOptions() {
        if (isOptionsOpen) {
            setOptionsOpen(false);
        } else {
            setOptionsOpen(true);
        }
    }

    function onStateRadioСhange(evt) {
        setStateMethod(evt.target.value);
        console.log(evt.target.value);
    };

    function onRoleRadioСhange(evt) {
        setRoleMethod(evt.target.value);
        console.log(evt.target.value);
    }

    function onApplyClick() {
        console.log(stateMethod);
        console.log(roleMethod);
        if (isOptionSelected) {
            console.log(selectedOption);
        }
        handleShowFilter();
        setOptionsOpen(false);
    }

    function onResetClick() {

    }

    const firstName = Validation();
    const lastName = Validation();
    const middleName = Validation();
    const email = Validation();

    function onSelectOptionClick(option) {
        setSelectedOption(option);
        setOptionSelected(true);
    }

    function onDefaultOptionClick() {
        setSelectedOption('Выберите тип сортировки');
        setOptionSelected(false);
    }

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
                    <>
                        <div className='users__table-heading'>
                            <p className='users__table-users-value'>Найдено {users.length} пользователей</p>
                            <div className='users__table-sort-main-container'>
                                <div className='users__table-sort-container' onClick={handleShowFilter}>
                                    <div className='users__table-sort-icon' />
                                    <p className='users__table-sort-text'>Фильтр</p>
                                </div>
                                <div className={`filter ${isFilterOpen && 'filter_opened'}`}>
                                    <div className='filter__heading-container'>
                                        <p className='filter__heading'>Фильтр</p>
                                        <div className='filter__close-icon' onClick={handleShowFilter} />
                                    </div>
                                    <div className='filter__sort-main-container'>
                                        <p className='filter__sort-heading'>Сортировка</p>
                                        <div className='filter__sort-container' onClick={handleShowOptions}>
                                            <p className={`filter__sort-value ${isOptionSelected && 'filter__sort-value_selected'}`}>{selectedOption}</p>
                                            <div className='filter__sort-arrow' />
                                            <div className={`filter__sort-options-container ${isOptionsOpen && 'filter__sort-options-container_opened'}`}>
                                                <div className='filter__sort-option-container' onClick={() => onSelectOptionClick('По дате')}>
                                                    <p className='filter__sort-option'>По дате</p>
                                                </div>
                                                <div className='filter__sort-option-container' onClick={onDefaultOptionClick}>
                                                    <p className='filter__sort-option'>Без сортировки</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='filter__radio-buttons-main-container'>
                                        <div className='filter__radio-buttons-container'>
                                            <p className='filter__radio-buttons-heading'>Состояние</p>
                                            <div className="filter__radio">
                                                <input
                                                    id="stateAll"
                                                    type="radio"
                                                    name="state"
                                                    value="Все"
                                                    onChange={onStateRadioСhange}
                                                    defaultChecked
                                                />
                                                <label htmlFor="stateAll">Все</label>
                                            </div>
                                            <div className="filter__radio">
                                                <input
                                                    id="stateBlocket"
                                                    type="radio"
                                                    name="state"
                                                    value="Заблокирован"
                                                    onChange={onStateRadioСhange}
                                                />
                                                <label htmlFor="stateBlocket">Заблокирован</label>
                                            </div>
                                            <div className="filter__radio">
                                                <input
                                                    id="stateUnblocket"
                                                    type="radio"
                                                    name="state"
                                                    value="Разблокирован"
                                                    onChange={onStateRadioСhange}
                                                />
                                                <label htmlFor="stateUnblocket">Разблокирован</label>
                                            </div>
                                        </div>
                                        <div className='filter__radio-buttons-container'>
                                            <p className='filter__radio-buttons-heading'>Роль</p>
                                            <div className="filter__radio">
                                                <input
                                                    id="roleAll"
                                                    type="radio"
                                                    name="role"
                                                    value="Все"
                                                    onChange={onRoleRadioСhange}
                                                    defaultChecked
                                                />
                                                <label htmlFor="roleAll">Все</label>
                                            </div>
                                            <div className="filter__radio">
                                                <input
                                                    id="roleOperator"
                                                    type="radio"
                                                    name="role"
                                                    value="Оператор"
                                                    onChange={onRoleRadioСhange}
                                                />
                                                <label htmlFor="roleOperator">Оператор</label>
                                            </div>
                                            <div className="filter__radio">
                                                <input
                                                    id="roleAdmin"
                                                    type="radio"
                                                    name="role"
                                                    value="Администратор"
                                                    onChange={onRoleRadioСhange}
                                                />
                                                <label htmlFor="roleAdmin">Администратор</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='filter__buttons-container'>
                                        <button className='filter__button-apply' onClick={onApplyClick}>Применить</button>
                                        <p className='filter__button-reset' onClick={onResetClick}>Сбросить фильтры</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    </>
                )}
            </div>
        </div>
    );
}

export default Users;
