import React, { useState, useEffect } from "react";
import * as FixationApi from "../../Api/FixationApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import avatar from '../../images/avatar.png';

function FixationGeneralInformation(props) {

    const {
        box,
        handleShowMore,
        hideComments,
        currentRow,
        comments,
        comment,
        getFixation,
        isFixationPage,
        isBoxLoading
    } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const [restrictions, setRestrictions] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temperatureRangeIn, setTemperatureRangeIn] = useState('');
    const [temperatureRangeOf, setTemperatureRangeOf] = useState('');
    const [mainPhoto, setMainPhoto] = useState('');
    const [status, setStatus] = useState('В пути, промежуточный пункт');
    const [photos, setPhotos] = useState([]);
    const [photosForRender, setPhotosForRender] = useState([]);
    const [isPhotoAdded, setPhotoAdded] = useState(true);

    const commentsPerRow = 3;
    const commentsToRender = comments.slice(0, (currentRow + 1) * commentsPerRow);
    const isMoreComments = commentsToRender.length !== comments.length;

    useEffect(() => {
        setPhotosForRender([]);
        if (box.box.photo !== null) {
            setPhotosForRender(box.box.photo)
        }
        if (comments.length !== 0) {
            comments.forEach((comment) => {
                if (comment.photo.length !== 0) {
                    comment.photo.forEach((photo) => {
                        if (photo !== '') {
                            setPhotosForRender(photosForRender => [...photosForRender, photo]);
                        }
                    })
                }
            })
        }
    }, [box.box.photo, comments])

    function onRadioСhange(evt) {
        setStatus(evt.target.value);
    };

    useEffect(() => {
        if (isFixationPage) {
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
        } else {
            if (box.box.Requirements.length !== 0) {
                box.box.Requirements.forEach((requirement) => {
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

    function onFixBoxClick() {
        comment.setValue('');

        const fixData = {
            userId: currentUser.id,
            boxId: box.box.id,
            comment: comment.value,
            photo: photos,
            status: status
        }

        FixationApi.addFixation(fixData)
            .then(() => {
                getFixation();
                setPhotos([]);
            })
            .catch((err) => {
                console.log(`Ошибка при загрузке ящиков: ${err}`);
            });
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

    function onSelectImageHandler(files) {
        if (files.length !== 0) {
            const reader = [];
            for (var i in files) {
                if (files.hasOwnProperty(i)) {
                    reader[i] = new FileReader();
                    reader[i].readAsDataURL(files[i]);
                    reader[i].onload = function (e) {
                        setPhotos(photos => [...photos, e.target.result]);
                    }
                }
            }
        }
    }

    function onRemovePhotoClick(photoForRemove) {
        const filteredPhotos = photos.filter(photo => photo !== photoForRemove);
        if (filteredPhotos.length === 0) {
            setPhotos([]);
        } else {
            setPhotos(filteredPhotos);
        }
    }

    return (
        <section className="fixation-general-information">
            <div className="fixation-general-information__main-container">
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
                {!isBoxLoading ? (
                    <div className='fixation-general-information__img-container'>
                        {isPhotoAdded ? (
                            <img className='fixation-general-information__img-main' src={mainPhoto} alt="Фотография ящика" />
                        ) : (
                            <div className="fixation-general-information__no-photo-container">
                                <p className="fixation-general-information__no-photo-text">Нет добавленных фотографий</p>
                            </div>
                        )}
                        <div className='fixation-general-information__grid-container'>
                            {photosForRender !== null && (
                                <>
                                    {photosForRender.map((photo, index) => (
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
                        {isFixationPage && (
                            <>
                                {box.box.status !== 'Отмена отправки' && (
                                    <>
                                        <div className='fixation-general-information__img-add-container'>
                                            <input
                                                className="fixation-general-information__img-add-input"
                                                id="input__file"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => onSelectImageHandler(e.target.files)}
                                            />
                                            <label htmlFor="input__file" className="fixation-general-information__img-add-input-button">
                                                <div className='fixation-general-information__img-add-cross' />
                                                <p className='fixation-general-information__img-add-text'>Добавить фотографии</p>
                                            </label>
                                        </div>
                                        <div className='fixation-general-information__grid-container'>
                                            {photos.length !== 0 && (
                                                <>
                                                    {photos.map((photo, index) => (
                                                        <div key={index} className='fixation-general-information__grid-img-container'>
                                                            <img className='fixation-general-information__img' src={photo} alt="Фотография ящика" />
                                                            <div className="fixation-general-information__img-remove-container">
                                                                <p className="fixation-general-information__img-remove-text" onClick={() => onRemovePhotoClick(photo)}>Удалить</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    <div className='fixation-general-information__preloader-container'>
                        <Preloader />
                    </div>
                )}
            </div>
            <div className="fixation-general-information__main-container">
                <div className="fixation-general-information__comments-container">
                    <p className="fixation-general-information__comments-heading">Комментарии</p>
                    {commentsToRender.map((comment, index) => (
                        <div key={index} className="fixation-general-information__comment-container">
                            <div className="fixation-general-information__comment-heading-container">
                                <img src={userFixAvatar(comment.Users)} alt="Аватар" className="fixation-general-information__comment-avatar" />
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
                    {isFixationPage && (
                        <>
                            {box.box.status !== 'Отмена отправки' && (
                                <input
                                    type="text"
                                    className='fixation-general-information__comment-imput'
                                    name="comment"
                                    placeholder='Напишите текст здесь...'
                                    value={comment.value}
                                    onChange={comment.onChange}
                                />
                            )}
                        </>
                    )}
                </div>
                {isFixationPage && (
                    <>
                        {box.box.status !== 'Отмена отправки' && (
                            <div className="fixation-general-information__status-container">
                                <p className="fixation-general-information__status-heading">Статус</p>
                                <div className="fixation-general-information__status-radio">
                                    <input
                                        id="onWay"
                                        type="radio"
                                        name="status"
                                        value="В пути, промежуточный пункт"
                                        onChange={onRadioСhange}
                                        defaultChecked
                                    />
                                    <label htmlFor="onWay">В пути, промежуточный пункт</label>
                                </div>
                                <div className="fixation-general-information__status-radio">
                                    <input
                                        id="arrival"
                                        type="radio"
                                        name="status"
                                        value="Прибытие в пункт назначения"
                                        onChange={onRadioСhange}
                                    />
                                    <label htmlFor="arrival">Прибытие в пункт назначения</label>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {isFixationPage && (
                <>
                    {box.box.status !== 'Отмена отправки' && (
                        <button className="fixation-general-information__save-button" onClick={onFixBoxClick}>Сохранить изменения</button>
                    )}
                </>
            )}
        </section>
    );
}

export default FixationGeneralInformation;
