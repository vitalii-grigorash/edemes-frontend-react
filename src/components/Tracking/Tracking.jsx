import React from 'react';
import { Helmet } from 'react-helmet-async';

function Tracking () {

    return (
        <div className="tracking">
            <Helmet
                title='Отслеживание'
            />
            <h1 className="tracking__text">Tracking Page</h1>
        </div>
    );

}

export default Tracking;