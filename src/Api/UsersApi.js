import { options } from '../config';

const API_URL = options.apiUrl;

export const getAllUsers = () => {
    return fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.ok ? res : Promise.reject(res))
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => data)
        .catch((err) => {
            throw new Error(err.message);
        });
};

export const changeActiveUser = (id) => {
    return fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
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
        });
};