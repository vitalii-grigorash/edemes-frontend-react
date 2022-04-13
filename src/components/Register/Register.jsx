import React from "react";
import Auth from "../Auth/Auth";

function Register(props) {

    const {
        onRegister,
        authError
    } = props;

    function submitForm(registerData) {
        onRegister(registerData);
    }

    return (
        <Auth
            onSubmit={submitForm}
            authError={authError}
            isValidate={true}
            formHeadingText='Регистрация'
            submitButtonText='Зарегистрироваться'
            entranceText='Уже есть аккаунт?'
            linkTest='Войти'
            path='/login'
        />
    );
}

export default Register;
