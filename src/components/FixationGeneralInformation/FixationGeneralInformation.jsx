import React, { useState, useEffect } from "react";
import defaultBoxPhoto from '../../images/box-img.svg';

function FixationGeneralInformation(props) {

    const {
        box
    } = props;

    const [restrictions, setRestrictions] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temperatureRangeIn, setTemperatureRangeIn] = useState('');
    const [temperatureRangeOf, setTemperatureRangeOf] = useState('');
    const [mainPhoto, setMainPhoto] = useState('');

    useEffect(() => {
        if (box.requirements.length !== 0) {
            box.requirements.forEach((requirement) => {
                if (requirement.Requirement.type === 'Влажность') {
                    setHumidity(requirement.Requirement.rangeIn);
                } else if (requirement.Requirement.type === 'Температура') {
                    setTemperatureRangeIn(requirement.Requirement.rangeIn);
                    setTemperatureRangeOf(`- ${requirement.Requirement.rangeOf}`);
                } else {
                    setRestrictions(requirement.Requirement.type);
                }
            })
        }
    })

    useEffect(() => {
        if (box.box.photo !== null) {
            setMainPhoto(box.box.photo[0]);
        } else {
            setMainPhoto(defaultBoxPhoto);
        }
    }, [box.box.photo])

    function showPhoto(photo) {
        setMainPhoto(photo);
    }

    function onAddPhotoButtonClick() {
        console.log('on add photo click');
    }

    return (
        <section className="fixation-general-information">
            <div className='fixation-general-information__table-container'>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-heading'>Название</p>
                    <p className='fixation-general-information__table-value'>{box.box.name}</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-heading'>Вес, кг</p>
                    <p className='fixation-general-information__table-value'>{box.box.weight}</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-heading'>Экспонаты, шт</p>
                    <p className='fixation-general-information__table-value'>{box.count}</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-heading'>Габариты, cм</p>
                    <p className='fixation-general-information__table-value'>{box.box.depth} * {box.box.width} * {box.box.height}</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-heading'>Ограничения</p>
                    <p className='fixation-general-information__table-value'>{restrictions}</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-heading'>Стоимость,  ₽</p>
                    <p className='fixation-general-information__table-value'>{box.box.price}</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-heading'>Температура,  °С</p>
                    <p className='fixation-general-information__table-value'>{temperatureRangeIn} {temperatureRangeOf}</p>
                </div>
                <div className='fixation-general-information__table-row'>
                    <p className='fixation-general-information__table-heading'>Влажность,  %</p>
                    <p className='fixation-general-information__table-value'>{humidity}</p>
                </div>
            </div>
            <div className='fixation-general-information__img-container'>
                <img className='fixation-general-information__img-main' src={mainPhoto} alt="Фотография ящика" />
                <div className='fixation-general-information__grid-container'>
                    {box.box.photo !== null && (
                        <>
                            {box.box.photo.map((photo, index) => (
                                <div key={index} className='fixation-general-information__grid-img-container'>
                                    <img className='fixation-general-information__img' src={photo} alt="Фотография ящика" />
                                    <div
                                        className={`fixation-general-information__img-overlay ${photo === mainPhoto && 'fixation-general-information__img-overlay_active'}`}
                                        onClick={() => showPhoto(photo)}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className='fixation-general-information__img-add-container' onClick={onAddPhotoButtonClick}>
                    <div className='fixation-general-information__img-add-cross' />
                    <p className='fixation-general-information__img-add-text'>Добавить фото</p>
                </div>
            </div>
        </section>
    );
}

export default FixationGeneralInformation;
