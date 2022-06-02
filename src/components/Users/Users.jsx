import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Validation } from '../../utils/Validation';
import UsersTable from '../UsersTable/UsersTable';
import * as UsersApi from '../../Api/UsersApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Users(props) {

    const {
        handleMobileHeaderNavText,
        addUser,
        addNewUserError
    } = props;

    const currentUser = React.useContext(CurrentUserContext);
    const history = useHistory();

    const { pathname } = useLocation();
    const [isRoleOptionsContainerOpen, setRoleOptionsContainerOpen] = useState(false);
    const [roleOptionsContainerValue, setRoleOptionsContainerValue] = useState('Оператор');
    const [isAddUserTabActive, setAddUserTabActive] = useState(true);
    const [isListTabActive, setListTabActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [roleFilteredUsers, setRoleFilteredUsers] = useState([]);
    const [stateFilteredUsers, setStateFilteredUsers] = useState([]);
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
    const [isFilterActive, setFilterActive] = useState(false);
    const [isApplyClicked, setApplyClicked] = useState(false);
    const [isReloadUsersList, setReloadUsersList] = useState(false);

    useEffect(() => {
        if (currentUser.role === 'Оператор') {
            history.push('/fixation');
        }
    })

    function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    function handleApplyClicked() {
        if (isApplyClicked) {
            setApplyClicked(false);
        } else {
            setApplyClicked(true);
        }
    }

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

    function userStateFilter() {
        if (stateMethod !== 'Все') {
            const usersStateFiltered = users.filter((user) => {
                const filtered = () => {
                    if (stateMethod === 'Заблокирован') {
                        return user.active === false;
                    } else if (stateMethod === 'Разблокирован') {
                        return user.active === true;
                    } else if (stateMethod === 'Все') {
                        return user
                    }
                }
                return filtered();
            })
            setStateFilteredUsers(usersStateFiltered);
        } else {
            setStateFilteredUsers(users);
        }
    }

    function userRoleFilter() {
        if (roleMethod !== 'Все') {
            const usersRoleFiltered = users.filter((user) => {
                const filtered = () => {
                    if (user.role === roleMethod) {
                        return user
                    } else if (roleMethod === 'Все') {
                        return user
                    }
                }
                return filtered();
            })
            setRoleFilteredUsers(usersRoleFiltered);
        } else {
            setRoleFilteredUsers(users);
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
        setFilterActive(false);
        handleShowFilter();
    }

    const firstName = Validation();
    const lastName = Validation();
    const middleName = Validation();
    const email = Validation();

    useEffect(() => {
        if (currentUser.role === 'Администратор') {
            handleMobileHeaderNavText('Пользователи');
        }
    }, [currentUser.role, handleMobileHeaderNavText]);

    function getUsers() {
        UsersApi.getAllUsers()
            .then((data) => {
                setUsers(data.users.sort(byField('id')));
                if (isFilterActive) {
                    setReloadUsersList(true);
                }
            })
            .catch((err) => console.log(`Ошибка при загрузке списка пользователей: ${err}`));
    }

    function applyFilter() {
        setFilterOpen(false);
        setOptionsOpen(false);
        setFilterActive(true);
        handleApplyClicked();
        userStateFilter();
        userRoleFilter();
    }

    useEffect(() => {
        if (currentUser.role === 'Администратор') {
            if (isReloadUsersList) {
                applyFilter();
                setReloadUsersList(false);
            }
        }
        // eslint-disable-next-line
    }, [isReloadUsersList, currentUser.role])

    useEffect(() => {
        if (currentUser.role === 'Администратор') {
            if (pathname === '/users') {
                getUsers();
            }
        }
        // eslint-disable-next-line
    }, [pathname, currentUser.role])

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

    function submitForm(evt) {
        evt.preventDefault();
        const newUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            middleName: middleName.value,
            email: email.value,
            role: roleOptionsContainerValue,
            companyId: currentUser.userCompanyInfo.id
        }
        addUser(newUser);
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
                    <form className='users__add-user-container' onSubmit={submitForm}>
                        <div className='users__add-user-inputs-main-container'>
                            <div className='users__add-user-inputs-container'>
                                <div className='users__add-user-input-container'>
                                    <p className='users__add-user-input-label'>Фамилия</p>
                                    <input
                                        type="text"
                                        className='users__add-user-input'
                                        id="new-user-last-name-input"
                                        name="lastName"
                                        placeholder='Иванов'
                                        minLength="2"
                                        maxLength="30"
                                        required
                                        value={lastName.value}
                                        onChange={lastName.onChange}
                                    />
                                    <span id="new-user-last-name-input-error" className="users__add-user-input_error-span">{lastName.errorMessage}</span>
                                </div>
                                <div className='users__add-user-input-container'>
                                    <p className='users__add-user-input-label'>Имя</p>
                                    <input
                                        type="text"
                                        className='users__add-user-input'
                                        id="new-user-first-name-input"
                                        name="firstName"
                                        placeholder='Иван'
                                        minLength="2"
                                        maxLength="30"
                                        required
                                        value={firstName.value}
                                        onChange={firstName.onChange}
                                    />
                                    <span id="new-user-first-name-input-error" className="users__add-user-input_error-span">{firstName.errorMessage}</span>
                                </div>
                                <div className='users__add-user-input-container'>
                                    <p className='users__add-user-input-label'>Отчество</p>
                                    <input
                                        type="text"
                                        className='users__add-user-input'
                                        name="middleName"
                                        placeholder='Иванович'
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
                                        id="new-user-email-input"
                                        name="email"
                                        placeholder='example@mail.ru'
                                        minLength="2"
                                        maxLength="30"
                                        required
                                        value={email.value}
                                        onChange={email.onChange}
                                    />
                                    <span id="new-user-email-input-error" className="users__add-user-input_error-span">{email.errorMessage}</span>
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
                        <p className='users__user-add-button-error'>{addNewUserError}</p>
                        <button type='submit' className='users__user-add-button'>Добавить</button>
                    </form>
                )}
                {isListTabActive && (
                    <UsersTable
                        isFilterActive={isFilterActive}
                        allUsers={users}
                        handleUserActive={handleUserActive}
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
                        roleFilteredUsers={roleFilteredUsers}
                        stateFilteredUsers={stateFilteredUsers}
                        stateMethod={stateMethod}
                        roleMethod={roleMethod}
                        handleApplyClicked={handleApplyClicked}
                        isApplyClicked={isApplyClicked}
                        byField={byField}
                    />
                )}
            </div>
        </div>
    );
}

export default Users;
