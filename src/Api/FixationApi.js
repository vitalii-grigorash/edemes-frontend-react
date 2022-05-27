import { apiOptions } from '../config';

const API_URL = apiOptions.apiUrl;

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