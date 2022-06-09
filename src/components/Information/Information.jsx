import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import avatar from '../../images/avatar.png';

function Information(props) {

    const {
        box,
        boxArtObject,
        handleShowMore,
        hideComments,
        comments,
        currentRow,
        isBoxLoading
    } = props;

    const [restrictions, setRestrictions] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temperatureRangeIn, setTemperatureRangeIn] = useState('');
    const [temperatureRangeOf, setTemperatureRangeOf] = useState('');
    const [mainPhoto, setMainPhoto] = useState('');
    const [photosForRender, setPhotosForRender] = useState([]);
    const [isPhotoAdded, setPhotoAdded] = useState(true);

    const commentsPerRow = 3;
    const commentsToRender = comments.slice(0, (currentRow + 1) * commentsPerRow);
    const isMoreComments = commentsToRender.length !== comments.length;

    useEffect(() => {
        setPhotosForRender([]);
        if (box.photo !== null) {
            setPhotosForRender(box.photo)
        }
        if (comments.length !== 0) {
            comments.forEach((comment) => {
                if (comment.photo !== null) {
                    if (comment.photo.length !== 0) {
                        comment.photo.forEach((photo) => {
                            if (photo !== '') {
                                setPhotosForRender(photosForRender => [...photosForRender, photo]);
                            }
                        })
                    }
                }
            })
        }
    }, [box.photo, comments])

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
        if (photosForRender.length !== 0) {
            setMainPhoto(photosForRender[0]);
            setPhotoAdded(true);
        } else {
            setPhotoAdded(false);
        }
    }, [photosForRender])

    function showPhoto(photo) {
        setMainPhoto(photo);
    }

    function fixDate(date) {
        const dateArray = date.split(' ');
        const time = dateArray[3].split(':');
        const hours = +time[0] + 3
        return `${dateArray[0] + '.' + dateArray[1] + '.' + dateArray[2] + ' ' + hours + ':' + time[1]}`;
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

    function userFixAvatar(userArray) {
        const userAvatar = {
            avatar: ''
        }
        userArray.forEach((user) => {
            if (user.avatar === '') {
                userAvatar.avatar = avatar
            } else {
                userAvatar.avatar = user.avatar
            }
        })
        return `${userAvatar.avatar}`
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
                {!isBoxLoading ? (
                    <div className='information__img-container'>
                        {isPhotoAdded ? (
                            <img className='information__img-main' src={mainPhoto} alt="Фотография ящика" />
                        ) : (
                            <div className="fixation-general-information__no-photo-container">
                                <p className="fixation-general-information__no-photo-text">Нет добавленных фотографий</p>
                            </div>
                        )}
                        <div className='information__grid-container'>
                            {photosForRender !== null && (
                                <>
                                    {photosForRender.map((photo, index) => (
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
                ) : (
                    <div className='fixation-general-information__preloader-container'>
                        <Preloader />
                    </div>
                )}
            </div>
            <div className='information__main-container'>
                <div className="fixation-general-information__comments-container">
                    <p className="fixation-general-information__comments-heading">Комментарии</p>
                    {commentsToRender.map((comment, index) => (
                        <div key={index} className="fixation-general-information__comment-container">
                            <div className="fixation-general-information__comment-heading-container">
                                <img src={userFixAvatar(comment.Users)} alt="Аватар" className="fixation-general-information__comment-avatar" />
                                <p className="fixation-general-information__comment-name">{userFixName(comment.Users)}</p>
                                <p className="fixation-general-information__comment-date">{fixDate(comment.createdAt)}</p>
                            </div>
                            <p className="fixation-general-information__comment">{comment.comment === null ? ('Отправитель') : (comment.comment === '' ? ('Отправитель') : (comment.comment))}</p>
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
