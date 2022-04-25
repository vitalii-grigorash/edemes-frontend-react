import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TablePagination from '../TablePagination/TablePagination';
import { Validation } from '../../utils/Validation';
import Filter from '../../components/Filter/Filter';
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
    const [stateAllChecked, setStateAllChecked] = useState(true);
    const [stateBlocketChecked, setStateBlocketChecked] = useState(false);
    const [stateUnblocketChecked, setStateUnblocketChecked] = useState(false);
    const [roleAllChecked, setRoleAllChecked] = useState(true);
    const [roleOperatorChecked, setRoleOperatorChecked] = useState(false);
    const [roleAdminChecked, setRoleAdminChecked] = useState(false);

    function onStateRadioСhange(evt) {
        setStateMethod(evt.target.value);
        if (evt.target.value === 'Все') {
            setStateAllChecked(true);
            setStateBlocketChecked(false);
            setStateUnblocketChecked(false);
        } else if (evt.target.value === 'Заблокирован') {
            setStateBlocketChecked(true);
            setStateAllChecked(false);
            setStateUnblocketChecked(false);
        } else if (evt.target.value === 'Разблокирован') {
            setStateUnblocketChecked(true);
            setStateBlocketChecked(false);
            setStateAllChecked(false);
        }
    };

    function onRoleRadioСhange(evt) {
        setRoleMethod(evt.target.value);
        if (evt.target.value === 'Все') {
            setRoleAllChecked(true);
            setRoleOperatorChecked(false);
            setRoleAdminChecked(false);
        } else if (evt.target.value === 'Оператор') {
            setRoleOperatorChecked(true);
            setRoleAllChecked(false);
            setRoleAdminChecked(false);
        } else if (evt.target.value === 'Администратор') {
            setRoleAdminChecked(true);
            setRoleOperatorChecked(false);
            setRoleAllChecked(false);
        }
    }

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

    function onSelectOptionClick(option) {
        setSelectedOption(option);
        setOptionSelected(true);
    }

    function onDefaultOptionClick() {
        setSelectedOption('Выберите тип сортировки');
        setOptionSelected(false);
    }

    function applyFilter() {
        handleShowFilter();
        setOptionsOpen(false);
        console.log(stateMethod);
        console.log(roleMethod);
        if (selectedOption !== 'Выберите тип сортировки') {
            console.log(selectedOption);
        }
    }

    function resetFilter() {
        setOptionsOpen(false);
        setOptionSelected(false);
        setSelectedOption('Выберите тип сортировки');
        setStateMethod('Все');
        setStateAllChecked(true);
        setStateBlocketChecked(false);
        setStateUnblocketChecked(false);
        setRoleMethod('Все');
        setRoleAllChecked(true);
        setRoleOperatorChecked(false);
        setRoleAdminChecked(false);
    }

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
                    <>
                        <div className='users__table-heading'>
                            <p className='users__table-users-value'>Найдено {users.length} пользователей</p>
                            <div className='users__table-sort-main-container'>
                                <div className='users__table-sort-container' onClick={handleShowFilter}>
                                    <div className='users__table-sort-icon' />
                                    <p className='users__table-sort-text'>Фильтр</p>
                                </div>
                                {isFilterOpen && (
                                    <Filter
                                        handleShowFilter={handleShowFilter}
                                        isFilterOpen={isFilterOpen}
                                        applyFilter={applyFilter}
                                        resetFilter={resetFilter}
                                        handleShowOptions={handleShowOptions}
                                        isOptionsOpen={isOptionsOpen}
                                        onSelectOptionClick={onSelectOptionClick}
                                        isOptionSelected={isOptionSelected}
                                        selectedOption={selectedOption}
                                        onDefaultOptionClick={onDefaultOptionClick}
                                        onStateRadioСhange={onStateRadioСhange}
                                        onRoleRadioСhange={onRoleRadioСhange}
                                        stateAllChecked={stateAllChecked}
                                        stateBlocketChecked={stateBlocketChecked}
                                        stateUnblocketChecked={stateUnblocketChecked}
                                        roleAllChecked={roleAllChecked}
                                        roleOperatorChecked={roleOperatorChecked}
                                        roleAdminChecked={roleAdminChecked}
                                    />
                                )}
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
