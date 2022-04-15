import { apiOptions } from '../config';

const API_URL = apiOptions.apiUrl;

export const getAllCatalogs = () => {
    return fetch(`http://evote65-vm.dltc.spbu.ru:5500/catalogs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.ok ? res : Promise.reject(res))
        .then((res) => {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => data)
        .catch((err) => {
            throw new Error(err.message);
        });
};