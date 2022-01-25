import React from 'react';
import { Helmet } from 'react-helmet-async';

function Users () {

    return (
        <div className="users">
            <Helmet
                title='Пользователи'
            />
            <h1 className="users__text">Users Page</h1>
        </div>
    );

}

export default Users;