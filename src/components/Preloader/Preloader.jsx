import React from 'react';

function Preloader() {

    return (
        <section className="preloader">
            <div className="preloader__container">
                <i className="preloader__circle-preloader"></i>
            </div>
            <p className="preloader__search-text">Идет загрузка...</p>
        </section>
    );
}

export default Preloader;
