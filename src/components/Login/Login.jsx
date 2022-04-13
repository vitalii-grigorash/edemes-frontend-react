import React from "react";
import Auth from "../Auth/Auth";

function Login(props) {

    const {
        onLogin,
        authError,
        isValidate
    } = props;

    function submitForm (loginData) {
        onLogin(loginData.email, loginData.password);
    }

    return (
        <Auth
            onSubmit={submitForm}
            authError={authError}
            isValidate={isValidate}
            formHeadingText='Вход'
            submitButtonText='Войти'
            entranceText='Еще нет аккаунта?'
            linkTest='Зарегистрироваться'
            path='/register'
        />
    );
}

export default Login;
