import React, { useState, useEffect } from "react";
import defaultBoxPhoto from '../../images/box-img.svg';
import * as FixationApi from "../../Api/FixationApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import avatar from '../../images/avatar.svg';

function FixationGeneralInformation(props) {

    const {
        box,
        handleShowMore,
        hideComments,
        currentRow,
        comments,
        comment,
        getFixation,
        isFixationPage
    } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const [restrictions, setRestrictions] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temperatureRangeIn, setTemperatureRangeIn] = useState('');
    const [temperatureRangeOf, setTemperatureRangeOf] = useState('');
    const [mainPhoto, setMainPhoto] = useState('');
    const [status, setStatus] = useState('В пути, промежуточный пункт');

    const commentsPerRow = 3;
    const commentsToRender = comments.slice(0, (currentRow + 1) * commentsPerRow);
    const isMoreComments = commentsToRender.length !== comments.length;

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

    function onFixBoxClick() {
        comment.setValue('');

        const fixData = {
            userId: currentUser.id,
            boxId: box.box.id,
            comment: comment.value,
            photo: [''],
            status: status
        }

        console.log(fixData);

        FixationApi.addFixation(fixData)
            .then((data) => {
                console.log(data);
                getFixation();
            })
            .catch((err) => {
                console.log(`Ошибка при загрузке ящиков: ${err}`);
            });
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
                    {isFixationPage && (
                        <div className='fixation-general-information__img-add-container' onClick={onAddPhotoButtonClick}>
                            <div className='fixation-general-information__img-add-cross' />
                            <p className='fixation-general-information__img-add-text'>Добавить фото</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="fixation-general-information__main-container">
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
                    {isFixationPage && (
                        <input
                            type="text"
                            className='fixation-general-information__comment-imput'
                            name="comment"
                            placeholder='Напишите текст здесь...'
                            value={comment.value}
                            onChange={comment.onChange}
                        />
                    )}
                </div>
                {isFixationPage && (
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
            </div>
            {isFixationPage && (
                <button className="fixation-general-information__save-button" onClick={onFixBoxClick}>Сохранить изменения</button>
            )}
        </section>
    );
}

export default FixationGeneralInformation;
