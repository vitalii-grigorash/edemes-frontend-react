import { options } from '../config';

const API_URL = options.apiUrl;

export const getFixationBox = (hashQr) => {
    return fetch(`${API_URL}/boxes/scanbox/${hashQr}`, {
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
            if (err.status === 404) {
                throw new Error('В ящике нет доступных экспонатов');
            }
        });
};

export const getFixationHistory = (userId) => {
    return fetch(`${API_URL}/fixes/userfixes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userId
        })
    })
        .then(res => res.ok ? res : Promise.reject(res))
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => data)
        .catch((err) => {
            if (err.status === 404) {
                throw new Error('Нет доступных ящиков');
            }
        });
};

export const addFixation = (fixData) => {
    return fetch(`${API_URL}/fixes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: fixData.userId,
            boxId: fixData.boxId,
            comment: fixData.comment,
            photo: fixData.photo,
            status: fixData.status
        })
    })
        .then(res => res.ok ? res : Promise.reject(res))
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => data)
        .catch((err) => {
            console.log(err);
        });
};
