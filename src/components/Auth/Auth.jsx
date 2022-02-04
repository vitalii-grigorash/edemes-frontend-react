import React, { useState, useEffect } from "react";
import { Validation } from '../../utils/Validation';
import eye from '../../images/visibility-icon.svg';

function Auth(props) {

    const {
        onLogin
    } = props;

    const [isRoleOptionsActive, setRoleOptionsActive] = useState(false);
    const [authAs, setAuthAs] = useState('Администратор');
    const [isPasswordShow, setPasswordShow] = useState(false)
    const [isPassword, setPassword] = useState('password');
    const [isPasswordValue, setPasswordValue] = useState(false);
    const [isValidate, setValidate] = useState(true);

    const email = Validation();
    const password = Validation();

    const admin = {
        email: "admin@mail.ru",
        pass: "123"
    }

    const operator = {
        email: "operator@mail.ru",
        pass: "123"
    }

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

    function handleRoleOptionsShow() {
        if (isRoleOptionsActive) {
            setRoleOptionsActive(false);
        } else {
            setRoleOptionsActive(true);
        }
    }

    function authAsAdmin() {
        if ((email.value === admin.email) && (password.value === admin.pass)) {
            onLogin(email.value, password.value, authAs);
            email.setErrorMessage('');
            password.setErrorMessage('');
            setValidate(true);
        } else {
            email.setErrorMessage('Неверный логин или пароль');
            password.setErrorMessage('Неверный логин или пароль');
            setValidate(false);
        }
    }

    function authAsOperator() {
        if ((email.value === operator.email) && (password.value === operator.pass)) {
            onLogin(email.value, password.value, authAs);
            email.setErrorMessage('');
            password.setErrorMessage('');
            setValidate(true);
        } else {
            email.setErrorMessage('Неверный логин или пароль');
            password.setErrorMessage('Неверный логин или пароль');
            setValidate(false);
        }
    }

    function submitForm(evt) {
        evt.preventDefault();
        if (authAs === 'Администратор') {
            authAsAdmin();
        }
        if (authAs === 'Оператор') {
            authAsOperator();
        }
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
                <p className="auth__heading">Вход</p>
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
                        minLength="2"
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
                <button type='submit' className="auth__submit-button">Войти</button>
            </form>
        </div>
    );
}

export default Auth;
