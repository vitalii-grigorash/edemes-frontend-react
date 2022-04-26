import React, { useState, useEffect } from 'react';
import TablePagination from '../TablePagination/TablePagination';
import Filter from '../../components/Filter/Filter';

function UsersTable(props) {

    const {
        isFilterActive,
        allUsers,
        handleUserActive,
        handleShowFilter,
        isFilterOpen,
        applyFilter,
        resetFilter,
        handleShowOptions,
        isOptionsOpen,
        onSelectOptionClick,
        isOptionSelected,
        selectedOption,
        onDefaultOptionClick,
        onStateRadioСhange,
        onRoleRadioСhange,
        stateAllChecked,
        stateBlocketChecked,
        stateUnblocketChecked,
        roleAllChecked,
        roleOperatorChecked,
        roleAdminChecked,
        roleFilteredUsers,
        stateFilteredUsers,
        stateMethod,
        roleMethod,
        handleApplyClicked,
        isApplyClicked,
        byField
    } = props;

    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);
    const [filteredUsers, setFilteredUser] = useState([]);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    useEffect(() => {
        if (isApplyClicked) {
            if (stateMethod === 'Все' && roleMethod === 'Все') {
                if (isOptionSelected) {
                    setFilteredUser(allUsers.sort(byField('createdAt')));
                } else {
                    setFilteredUser(allUsers);
                }
            } else {
                if (roleMethod === 'Все') {
                    const filtered = roleFilteredUsers.filter(role => stateFilteredUsers.every(state => role.active === state.active));
                    if (isOptionSelected) {
                        setFilteredUser(filtered.sort(byField('createdAt')));
                    } else {
                        setFilteredUser(filtered);
                    }
                } else {
                    const filtered = stateFilteredUsers.filter(state => roleFilteredUsers.every(role => state.role === role.role));
                    if (isOptionSelected) {
                        setFilteredUser(filtered.sort(byField('createdAt')));
                    } else {
                        setFilteredUser(filtered);
                    }
                }
            }
            handleApplyClicked();
        }

    }, [isApplyClicked, roleFilteredUsers, stateFilteredUsers, allUsers, roleMethod, stateMethod, handleApplyClicked, isOptionSelected, byField]);

    return (
        <>
            <div className='users__table-heading'>
                <p className='users__table-users-value'>Найдено {!isFilterActive ? allUsers.length : filteredUsers.length} пользователей</p>
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
                {isFilterActive ? (
                    <>
                        {filteredUsers.length !== 0 ? (
                            <>
                                {filteredUsers.slice(showResultsFrom, resultsShow).map((user) => (
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
                                <p className='users__no-results-text'>Нет пользователей, соответствующих заданным параметрам</p>
                            </div>
                        )}
                        <TablePagination
                            sortList={filteredUsers}
                            handleShowResultsFrom={handleShowResultsFrom}
                            handleResultsShow={handleResultsShow}
                        />
                    </>
                ) : (
                    <>
                        {allUsers !== null ? (
                            <>
                                {allUsers.slice(showResultsFrom, resultsShow).map((user) => (
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
                            sortList={allUsers}
                            handleShowResultsFrom={handleShowResultsFrom}
                            handleResultsShow={handleResultsShow}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default UsersTable;
