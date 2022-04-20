import React, { useState, useEffect } from "react";
import { Validation } from '../../utils/Validation';
import eye from '../../images/visibility-icon.svg';
import { Link, useLocation } from 'react-router-dom';
import * as AuthApi from "../../Api/Auth";

function Auth(props) {

    const {
        onSubmit,
        authError,
        isValidate,
        formHeadingText,
        submitButtonText,
        entranceText,
        linkTest,
        path
    } = props;

    const { pathname } = useLocation();

    const [isRoleOptionsActive, setRoleOptionsActive] = useState(false);
    const [isCompanyOptionsActive, setCompanyOptionsActive] = useState(false);
    const [authAs, setAuthAs] = useState('Администратор');
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [isPassword, setPassword] = useState('password');
    const [isPasswordValue, setPasswordValue] = useState(false);
    const [company, setCompany] = useState('Выберите компанию');
    const [companies, setCompanies] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [isCompanySelected, setCompanySelected] = useState(false);

    const email = Validation();
    const password = Validation();
    const firstName = Validation();
    const lastName = Validation();
    const middleName = Validation();

    useEffect(() => {
        if (pathname === '/register') {
            AuthApi.getCompanies()
                .then((companies) => {
                    console.log(companies.companies);
                    setCompanies(companies.companies);
                })
                .catch((err) => console.log(`Ошибка при загрузке списка компаний: ${err}`));
        }
    }, [pathname]);


    function handlePassword() {
        if (isPasswordShow === true) {
            setPasswordShow(false)
            setPassword('password')
        } else {
            setPasswordShow(true)
            setPassword('view')
        }
    }

    function onRoleSelectClick(role) {
        setAuthAs(role);
    }

    function onCompanySelectClick(company) {
        console.log(company);
        setCompany(company.name);
        setCompanyId(company.id);
        setCompanySelected(true);
    }

    function handleRoleOptionsShow() {
        if (isRoleOptionsActive) {
            setRoleOptionsActive(false);
        } else {
            setRoleOptionsActive(true);
        }
    }

    function handleCompanyOptionsShow() {
        if (isCompanyOptionsActive) {
            setCompanyOptionsActive(false);
        } else {
            setCompanyOptionsActive(true);
        }
    }

    const authData = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        middleName: middleName.value,
        role: authAs,
        companyId: companyId
    }

    function submitForm(evt) {
        evt.preventDefault();
        onSubmit(authData);
    }

    useEffect(() => {
        if (password.value.length < 1) {
            setPasswordValue(false);
            setPassword('password');
            setPasswordShow(false);
        } else {
            setPasswordValue(true);
        }
    }, [password.value]);

    return (
        <div className='auth'>
            <form className="auth__container" onSubmit={submitForm}>
                <p className="auth__heading">{formHeadingText}</p>
                <div className="auth__input-container">
                    <p className="auth__input-label">Почта</p>
                    <input
                        type="email"
                        className={`auth__input ${!isValidate && 'auth__input_error'}`}
                        id="login-email-input"
                        name="email"
                        placeholder='Введите почту'
                        minLength="2"
                        maxLength="30"
                        required
                        value={email.value}
                        onChange={email.onChange}
                    />
                    <span id="login-email-input-error" className="auth__input_error-span">{email.errorMessage}</span>
                </div>
                <div className="auth__input-container auth__input-container_password">
                    <p className="auth__input-label">Пароль</p>
                    <input
                        type={isPassword}
                        className={`auth__input ${!isValidate && 'auth__input_error'}`}
                        id="login-password-input"
                        name="password"
                        placeholder='Введите пароль'
                        minLength="6"
                        maxLength="30"
                        required
                        value={password.value}
                        onChange={password.onChange}
                    />
                    {isPasswordValue &&
                        (
                            <img src={eye} alt="Иконка показа пароля" className="auth__input__password-eye" onClick={handlePassword} />
                        )
                    }
                    <span id="login-password-input-error" className="auth__input_error-span">{password.errorMessage}</span>
                </div>
                {pathname === '/register' && (
                    <>
                        <div className="auth__input-container auth__input-container_name">
                            <p className="auth__input-label">Имя</p>
                            <input
                                type="text"
                                className={`auth__input ${!isValidate && 'auth__input_error'}`}
                                id="register-first-name-input"
                                name="first-name"
                                placeholder='Введите имя'
                                minLength="2"
                                maxLength="30"
                                required
                                value={firstName.value}
                                onChange={firstName.onChange}
                            />
                            <span id="register-first-name-input-error" className="auth__input_error-span">{firstName.errorMessage}</span>
                        </div>
                        <div className="auth__input-container auth__input-container_name">
                            <p className="auth__input-label">Фамилия</p>
                            <input
                                type="text"
                                className={`auth__input ${!isValidate && 'auth__input_error'}`}
                                id="register-last-name-input"
                                name="last-name"
                                placeholder='Введите фамилию'
                                minLength="2"
                                maxLength="30"
                                required
                                value={lastName.value}
                                onChange={lastName.onChange}
                            />
                            <span id="register-last-name-input-error" className="auth__input_error-span">{lastName.errorMessage}</span>
                        </div>
                        <div className="auth__input-container auth__input-container_name">
                            <p className="auth__input-label">Отчество</p>
                            <input
                                type="text"
                                className={`auth__input ${!isValidate && 'auth__input_error'}`}
                                id="register-middle-name-input"
                                name="middle-name"
                                placeholder='Введите отчество'
                                minLength="2"
                                maxLength="30"
                                value={middleName.value}
                                onChange={middleName.onChange}
                            />
                            <span id="register-middle-name-input-error" className="auth__input_error-span">{middleName.errorMessage}</span>
                        </div>
                        <div className="auth__role-container">
                            <p className="auth__input-label">Роль</p>
                            <div className="auth__role-select-container" onClick={handleRoleOptionsShow}>
                                <p className="auth__selected-role">{authAs}</p>
                                <div className="auth__selected-role-arrow" />
                                <div className={`auth__role-options-container ${isRoleOptionsActive && 'auth__role-options-container_active'}`}>
                                    <div className="auth__role-option-container" onClick={() => onRoleSelectClick('Администратор')}>
                                        <p className="auth__role-option">Администратор</p>
                                    </div>
                                    <div className="auth__role-option-container" onClick={() => onRoleSelectClick('Оператор')}>
                                        <p className="auth__role-option">Оператор</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="auth__role-container">
                            <p className="auth__input-label">Компания</p>
                            <div className="auth__role-select-container" onClick={handleCompanyOptionsShow}>
                                <p className={`auth__selected-company ${isCompanySelected && 'auth__selected-company_active'}`}>{company}</p>
                                <div className="auth__selected-role-arrow" />
                                <div className={`auth__role-options-container ${isCompanyOptionsActive && 'auth__role-options-container_active'}`}>
                                    {companies.map((company) => (
                                        <div key={company.id} className="auth__role-option-container" onClick={() => onCompanySelectClick(company)}>
                                            <p className="auth__role-option">{company.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>

                )}
                <button type='submit' className="auth__submit-button">{submitButtonText}</button>
                <span className="auth__button-error">{authError}</span>
                <div className="auth__change-container">
                    <p className="auth__change-question">{entranceText}</p>
                    <Link to={`${path}`} className='auth__change-link-container'>
                        <p className='auth__change-link-text'>{linkTest}</p>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Auth;
