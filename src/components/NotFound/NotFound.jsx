import React from 'react';
import { Helmet } from 'react-helmet-async';

function NotFound() {

    return (
        <div className="not-found">
            <Helmet
                title='Страница не найдена'
            />
            <h1 className="not-found__text">Page Not Found! Sorry!</h1>
        </div>
    );

}

export default NotFound;