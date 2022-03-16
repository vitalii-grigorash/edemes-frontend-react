import React from 'react';
import { Validation } from '../../utils/Validation';

function BoxRegistrationGeneralInformation() {

    const boxName = Validation();
    const length = Validation();
    const width = Validation();
    const height = Validation();
    const weight = Validation();
    const price = Validation();
    const humidity = Validation();
    const temperature = Validation();

    return (
        <div className='box-registration-general-information'>
            <div className='box-registration-general-information__inputs-container'>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>Название ящика</p>
                    <input
                        type="text"
                        className='box-registration-general-information__input'
                        name="boxName"
                        placeholder=''
                        value={boxName.value}
                        onChange={boxName.onChange}
                    />
                </div>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label'>Габариты, см</p>
                    <div className='box-registration-general-information__dimensions-inputs-container'>
                        <input
                            type="text"
                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                            name="length"
                            placeholder=''
                            value={length.value}
                            onChange={length.onChange}
                        />
                        <div className='box-registration-general-information__dimensions-cross-icon' />
                        <input
                            type="text"
                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                            name="width"
                            placeholder=''
                            value={width.value}
                            onChange={width.onChange}
                        />
                        <div className='box-registration-general-information__dimensions-cross-icon' />
                        <input
                            type="text"
                            className='box-registration-general-information__input box-registration-general-information__input_dimensions'
                            name="height"
                            placeholder=''
                            value={height.value}
                            onChange={height.onChange}
                        />
                    </div>
                </div>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label'>Вес, кг</p>
                    <input
                        type="text"
                        className='box-registration-general-information__input'
                        name="weight"
                        placeholder=''
                        value={weight.value}
                        onChange={weight.onChange}
                    />
                </div>
            </div>
            <div className='box-registration-general-information__inputs-container'>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label box-registration-general-information__input-label_first'>Стоимость, ₽</p>
                    <input
                        type="text"
                        className='box-registration-general-information__input'
                        name="price"
                        placeholder=''
                        value={price.value}
                        onChange={price.onChange}
                    />
                </div>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label'>Влажность</p>
                    <input
                        type="text"
                        className='box-registration-general-information__input'
                        name="humidity"
                        placeholder=''
                        value={humidity.value}
                        onChange={humidity.onChange}
                    />
                </div>
                <div className='box-registration-general-information__input-container'>
                    <p className='box-registration-general-information__input-label'>Температура</p>
                    <input
                        type="text"
                        className='box-registration-general-information__input'
                        name="temperature"
                        placeholder=''
                        value={temperature.value}
                        onChange={temperature.onChange}
                    />
                </div>
            </div>
        </div>
    );

}

export default BoxRegistrationGeneralInformation;
