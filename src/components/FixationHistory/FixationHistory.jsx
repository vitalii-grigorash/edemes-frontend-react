import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import * as FixationApi from "../../Api/FixationApi";

function FixationHistory(props) {

    const {
        handleMobileHeaderNavText
    } = props;

    const [isBoxesTabActive, setBoxesTabActive] = useState(true);

    useEffect(() => {
        FixationApi.getFixationHistory()
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(`Ошибка при загрузке ящиков: ${err}`);
            });
    })

    useEffect(() => {
        handleMobileHeaderNavText('История фиксаций');
    });

    function onBoxesTabClick() {
        setBoxesTabActive(true);
    }

    return (
        <section className='fixation-history'>
            <Helmet
                title='История фиксаций'
            />
            <h1 className='fixation-history__heading'>История фиксаций</h1>
            <div className='fixation-history__table'>
                <div className='fixation-history__tabs-container'>
                    <p className={`fixation-history__tab ${isBoxesTabActive && 'fixation-history__tab_active'}`} onClick={onBoxesTabClick}>Ящики</p>
                </div>
                {isBoxesTabActive && (
                    <p>Ящики</p>
                )}
            </div>
        </section>
    );
}

export default FixationHistory;
