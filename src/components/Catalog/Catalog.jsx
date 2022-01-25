import React from 'react';
import { Helmet } from 'react-helmet-async';

function Catalog () {

    return (
        <div className="catalog">
            <Helmet
                title='Каталог'
            />
            <h1 className="catalog__text">Catalog Page</h1>
        </div>
    );

}

export default Catalog;