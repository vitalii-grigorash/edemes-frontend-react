import React, { useEffect, useState } from 'react';
import defaultBoxPhoto from '../../images/box-img.svg';

function Information(props) {

    const {
        box,
        boxArtObject
    } = props;

    const [restrictions, setRestrictions] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temperatureRangeIn, setTemperatureRangeIn] = useState('');
    const [temperatureRangeOf, setTemperatureRangeOf] = useState('');
    const [mainPhoto, setMainPhoto] = useState('');

    useEffect(() => {
        if (box.requirementsList.length !== 0) {
            box.requirementsList.forEach((requirement) => {
                if (requirement.type === 'Влажность') {
                    setHumidity(requirement.rangeIn);
                } else if (requirement.type === 'Температура') {
                    setTemperatureRangeIn(requirement.rangeIn);
                    setTemperatureRangeOf(`- ${requirement.rangeOf}`);
                } else {
                    setRestrictions(requirement.type);
                }
            })
        }
    })

    useEffect(() => {
        if (box.photo !== null) {
            setMainPhoto(box.photo[0]);
        } else {
            setMainPhoto(defaultBoxPhoto);
        }
    }, [box.photo])

    function showPhoto(photo) {
        setMainPhoto(photo);
    }

    function onAddPhotoButtonClick() {
        console.log('on add photo click');
    }

    return (
        <section className="information">
            <div className='information__table-container'>
                <div className='information__table-row'>
                    <p className='information__table-heading'>Название</p>
                    <p className='information__table-value'>{box.name}</p>
                </div>
                <div className='information__table-row'>
                    <p className='information__table-heading'>Вес, кг</p>
                    <p className='information__table-value'>{box.weight}</p>
                </div>
                <div className='information__table-row'>
                    <p className='information__table-heading'>Экспонаты, шт</p>
                    <p className='information__table-value'>{boxArtObject.length}</p>
                </div>
                <div className='information__table-row'>
                    <p className='information__table-heading'>Габариты, cм</p>
                    <p className='information__table-value'>{box.depth} * {box.width} * {box.height}</p>
                </div>
                <div className='information__table-row'>
                    <p className='information__table-heading'>Ограничения</p>
                    <p className='information__table-value'>{restrictions}</p>
                </div>
                <div className='information__table-row'>
                    <p className='information__table-heading'>Стоимость,  ₽</p>
                    <p className='information__table-value'>{box.price}</p>
                </div>
                <div className='information__table-row'>
                    <p className='information__table-heading'>Температура,  °С</p>
                    <p className='information__table-value'>{temperatureRangeIn} {temperatureRangeOf}</p>
                </div>
                <div className='information__table-row'>
                    <p className='information__table-heading'>Влажность,  %</p>
                    <p className='information__table-value'>{humidity}</p>
                </div>
            </div>
            <div className='information__img-container'>
                <img className='information__img-main' src={mainPhoto} alt="Фотография ящика" />
                <div className='information__grid-container'>
                    {box.photo !== null && (
                        <>
                            {box.photo.map((photo, index) => (
                                <div key={index} className='information__grid-img-container'>
                                    <img className='information__img' src={photo} alt="Фотография ящика" />
                                    <div
                                        className={`information__img-overlay ${photo === mainPhoto && 'information__img-overlay_active'}`}
                                        onClick={() => showPhoto(photo)}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className='information__img-add-container' onClick={onAddPhotoButtonClick}>
                    <div className='information__img-add-cross' />
                    <p className='information__img-add-text'>Добавить фото</p>
                </div>
            </div>
        </section>
    );
}

export default Information;
