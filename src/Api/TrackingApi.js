import { apiOptions } from '../config';

const API_URL = apiOptions.apiUrl;

export const getAllBoxes = () => {
    return fetch(`${API_URL}/fixes`, {
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

export const getBoxArtObjects = (id) => {
    return fetch(`${API_URL}/fixes/boxes/${id}`, {
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

export const disbandBox = (id, userId) => {
    return fetch(`${API_URL}/boxes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            boxId: id,
            userId: userId
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
        });
};