import React from 'react';

function Filter(props) {

    const {
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
        roleAdminChecked
    } = props;

    function onApplyClick() {
        applyFilter();
    }

    function onResetClick() {
        resetFilter();
    }

    return (
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
                            checked={stateAllChecked}
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
                            checked={stateBlocketChecked}
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
                            checked={stateUnblocketChecked}
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
                            checked={roleAllChecked}
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
                            checked={roleOperatorChecked}
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
                            checked={roleAdminChecked}
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
    );
}

export default Filter;
