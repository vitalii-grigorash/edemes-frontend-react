import { options } from '../config';

const API_URL = options.apiUrl;

export const getLocations = () => {
    return fetch(`${API_URL}/locations`, {
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

export const getCompaniesWithLocations = () => {
    return fetch(`${API_URL}/companies/withLocations`, {
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

export const addNewBox = (dataToRegister) => {
    return fetch(`${API_URL}/boxes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToRegister)
    })
        .then(res => res.ok ? res : Promise.reject(res))
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.status === 500) {
                throw new Error('Сервер временно недоступен');
            }
        });
};

export const addQr = (data) => {
    return fetch(`${API_URL}/boxes/addqr`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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

