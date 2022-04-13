import { apiOptions } from '../config';

const API_URL = apiOptions.apiUrl;

export const authorize = (email, password) => {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(res => res.ok ? res : Promise.reject(res))
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((err) => {
            if (err.status === 500) {
                throw new Error('Сервер временно недоступен');
            }
            else if (err.status === 401) {
                throw new Error('Неправильная почта или пароль');
            }
        });
};

export const registration = (userData) => {
    return fetch(`${API_URL}/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            role: userData.role,
            firstName: userData.firstName,
            lastName: userData.lastName,
            middleName: userData.middleName,
        })
    })
        .then(res => res.ok ? res : Promise.reject(res))
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((err) => {
            if (err.status === 500) {
                throw new Error('Сервер временно недоступен');
            }
            else if (err.status === 401) {
                throw new Error('Пользователь с таким email уже существует');
            }
        });
};
