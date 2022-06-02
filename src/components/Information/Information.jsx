import React, { useEffect, useState } from 'react';
import defaultBoxPhoto from '../../images/box-img.svg';
import avatar from '../../images/avatar.svg';

function Information(props) {

    const {
        box,
        boxArtObject,
        handleShowMore,
        hideComments,
        comments,
        currentRow,
    } = props;

    const [restrictions, setRestrictions] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temperatureRangeIn, setTemperatureRangeIn] = useState('');
    const [temperatureRangeOf, setTemperatureRangeOf] = useState('');
    const [mainPhoto, setMainPhoto] = useState('');

    const commentsPerRow = 3;
    const commentsToRender = comments.slice(0, (currentRow + 1) * commentsPerRow);
    const isMoreComments = commentsToRender.length !== comments.length;

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

    function fixDate(date) {
        const dateArray = date.split(' ');
        const time = dateArray[3].split(':');
        return `${dateArray[0] + '.' + dateArray[1] + '.' + dateArray[2] + ' ' + time[0] + ':' + time[1]}`;
    }

    function userFixName(userArray) {
        const userName = {
            lastName: '',
            firstName: ''
        }
        userArray.forEach((user) => {
            userName.lastName = user.lastName
            userName.firstName = user.firstName
        })
        return `${userName.lastName + ' ' + userName.firstName}`
    }

    return (
        <section className="information">
            <div className='information__main-container'>
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
                </div>
            </div>
            <div className='information__main-container'>
                <div className="fixation-general-information__comments-container">
                    <p className="fixation-general-information__comments-heading">Комментарии</p>
                    {commentsToRender.map((comment, index) => (
                        <div key={index} className="fixation-general-information__comment-container">
                            <div className="fixation-general-information__comment-heading-container">
                                <img src={avatar} alt="Аватар" className="fixation-general-information__comment-avatar" />
                                <p className="fixation-general-information__comment-name">{userFixName(comment.Users)}</p>
                                <p className="fixation-general-information__comment-date">{fixDate(comment.createdAt)}</p>
                            </div>
                            <p className="fixation-general-information__comment">{comment.comment === '' ? ('Отправитель') : (comment.comment)}</p>
                        </div>
                    ))}
                    {isMoreComments ? (
                        <p className="fixation-general-information__more-comments" onClick={handleShowMore}>Показать ещё комментарии</p>
                    ) : (
                        <>
                            {comments.length > 3 && (
                                <p className="fixation-general-information__more-comments" onClick={hideComments}>Свернуть комментарии</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Information;
