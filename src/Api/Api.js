import { apiOptions } from '../config';

const BASE_URL = apiOptions.baseUrl;

// Просто для примера, пока не работает. Можно взять за основу и работать по такому принципу.

export const authorize = (authAs, email, password) => fetch(`${BASE_URL}/auth`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ authAs, email, password }),
})
    .then((res) => {
        if (res.status === 400) {
            throw new Error('Не передано одно из полей');
        }
        else if (res.status === 401) {
            throw new Error('Пользователь с таким email не найден');
        }
        return res.json();
    })
    .then((data) => {
        if (data.id) {
            localStorage.setItem('userId', data.id);
            return data;
        }
    });
