import React from 'react';

function BoxRegistrationGeneralInformation() {

    return (
        <div className='box-registration-general-information'>
            <div className='box-registration-general-information__inputs-container'>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>Название ящика</p>
                    <input
                        type="text"
                        placeholder=''
                        className='box-registration-general-information__input'
                    />
                </div>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label'>Габариты, см</p>
                    <div className='box-registration-general-information__dimensions-inputs-container'>
                        <input
                            type="text"
                            placeholder=''
                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                        />
                        <div className='box-registration-general-information__dimensions-cross-icon' />
                        <input
                            type="text"
                            placeholder=''
                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                        />
                        <div className='box-registration-general-information__dimensions-cross-icon' />
                        <input
                            type="text"
                            placeholder=''
                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                        />
                    </div>
                </div>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label'>Вес, кг</p>
                    <input
                        type="text"
                        placeholder=''
                        className='box-registration-general-information__input'
                    />
                </div>
            </div>
            <div className='box-registration-general-information__inputs-container'>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>Стоимость, ₽</p>
                    <input
                        type="text"
                        placeholder=''
                        className='box-registration-general-information__input'
                    />
                </div>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label'>Влажность</p>
                    <input
                        type="text"
                        placeholder=''
                        className='box-registration-general-information__input'
                    />
                </div>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label'>Температура</p>
                    <input
                        type="text"
                        placeholder=''
                        className='box-registration-general-information__input'
                    />
                </div>
            </div>
        </div>
    );

}

export default BoxRegistrationGeneralInformation;