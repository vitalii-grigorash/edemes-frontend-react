import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Validation } from '../../utils/Validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

    const {
        handleMobileHeaderNavText,
        editUser,
        isProfileReload,
        profileRealoadCancel,
    } = props;

    const currentUser = React.useContext(CurrentUserContext);

    const firstName = Validation();
    const lastName = Validation();
    const middleName = Validation();
    const newPassword = Validation();
    const repeatNewPassword = Validation();

    const [isNewPasswordShow, setNewPasswordShow] = useState(false);
    const [isNewPassword, setNewPassword] = useState('password');
    const [isNewPasswordValue, setNewPasswordValue] = useState(false);
    const [isRepeatNewPasswordShow, setRepeatNewPasswordShow] = useState(false);
    const [isRepeatNewPassword, setRepeatNewPassword] = useState('password');
    const [isRepeatNewPasswordValue, setRepeatNewPasswordValue] = useState(false);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (isProfileReload) {
            setNewPasswordShow(false);
            setNewPassword('password');
            setNewPasswordValue(false);
            setRepeatNewPasswordShow(false);
            setRepeatNewPassword('password');
            setRepeatNewPasswordValue(false);
            firstName.setValue(currentUser.firstName);
            lastName.setValue(currentUser.lastName);
            middleName.setValue(currentUser.middleName);
            newPassword.setValue('');
            repeatNewPassword.setValue('');
            newPassword.setErrorMessage('');
            repeatNewPassword.setErrorMessage('');
            profileRealoadCancel();
            setAvatar('');
        }
    }, [
        isProfileReload,
        profileRealoadCancel,
        currentUser.firstName,
        currentUser.lastName,
        currentUser.middleName,
        firstName,
        lastName,
        middleName,
        newPassword,
        repeatNewPassword
    ]);

    useEffect(() => {
        handleMobileHeaderNavText('Профиль');
    });

    useEffect(() => {
        firstName.setValue(currentUser.firstName);
        lastName.setValue(currentUser.lastName);
        middleName.setValue(currentUser.middleName);
        // eslint-disable-next-line
    }, [])

    function clearPasswordInputs() {
        newPassword.setValue('');
        repeatNewPassword.setValue('');
        newPassword.setErrorMessage('');
        repeatNewPassword.setErrorMessage('');
    }

    function isFormValid() {
        if (newPassword.value !== repeatNewPassword.value) {
            newPassword.setErrorMessage('Пароли не совпадают');
            repeatNewPassword.setErrorMessage('Пароли не совпадают');
        } else {
            const userData = {
                id: currentUser.id,
                firstName: `${firstName.value === '' ? currentUser.firstName : firstName.value}`,
                lastName: `${lastName.value === '' ? currentUser.lastName : lastName.value}`,
                middleName: middleName.value,
                password: newPassword.value,
            }
            if (avatar !== '') {
                userData.avatar = avatar;
            }
            editUser(userData);
            clearPasswordInputs();
            setAvatar('');
        }
    }

    function submitForm(evt) {
        evt.preventDefault();
        isFormValid();
    }

    function handleNewPasswordShow() {
        if (isNewPasswordShow) {
            setNewPasswordShow(false)
            setNewPassword('password')
        } else {
            setNewPasswordShow(true)
            setNewPassword('view')
        }
    }

    useEffect(() => {
        if (newPassword.value.length < 1) {
            setNewPasswordValue(false);
            setNewPassword('password');
            setNewPasswordShow(false);
        } else {
            setNewPasswordValue(true);
        }
    }, [newPassword.value]);

    function handleRepeatNewPasswordShow() {
        if (isRepeatNewPasswordShow) {
            setRepeatNewPasswordShow(false)
            setRepeatNewPassword('password')
        } else {
            setRepeatNewPasswordShow(true)
            setRepeatNewPassword('view')
        }
    }

    useEffect(() => {
        if (repeatNewPassword.value.length < 1) {
            setRepeatNewPasswordValue(false);
            setRepeatNewPassword('password');
            setRepeatNewPasswordShow(false);
        } else {
            setRepeatNewPasswordValue(true);
        }
    }, [repeatNewPassword.value]);

    // const onSelectImageHandler = (files) => {
    //     var file = files[0];
    //     var reader = new FileReader();
    //     reader.onloadend = function () {
    //         console.log(reader.result)
    //         setAvatar(reader.result)
    //     }
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     } else {
    //         setAvatar('');
    //     }
    // }

    const onSelectImageHandler = (files) => {
        var file = files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            compressImage(reader.result)
            // Если не использовать сжатие, то расскомментировать setAvatar(reader.result) и закомментировать compressImage(reader.result)
            // setAvatar(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setAvatar('');
        }
    }

    function compressImage(base64) {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = base64
        img.onload = function () {
            let width = img.width
            let height = img.height
            const maxHeight = 150
            const maxWidth = 240
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height *= maxWidth / width))
                    width = maxWidth
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width *= maxHeight / height))
                    height = maxHeight
                }
            }
            canvas.width = width
            canvas.heght = height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            var comressData = canvas.toDataURL('image/jpeg', 0.7)
            setAvatar(comressData);
        }
        img.onerror = function (err) {
            console.log(err);
        }
    }

    function onRemovePhotoClick() {
        setAvatar('');
    }

    return (
        <div className="profile">
            <Helmet
                title='Профиль'
            />
            <h1 className='profile__heading'>Профиль</h1>
            <form className='profile__container' onSubmit={submitForm}>
                <div className='profile__inputs-main-container'>
                    <div className='profile__inputs-container'>
                        <div className='profile__input-container'>
                            <p className='profile__input-label'>Фамилия</p>
                            <input
                                type="text"
                                className='profile__input'
                                id="profile-last-name-input"
                                name="lastName"
                                placeholder='Введите фамилию'
                                minLength="2"
                                maxLength="30"
                                value={lastName.value}
                                onChange={lastName.onChange}
                            />
                            <span id="profile-last-name-input" className="profile__input_error-span">{lastName.errorMessage}</span>
                        </div>
                        <div className='profile__input-container'>
                            <p className='profile__input-label'>Имя</p>
                            <input
                                type="text"
                                className='profile__input'
                                id="profile-first-name-input"
                                name="firstName"
                                placeholder='Введите имя'
                                minLength="2"
                                maxLength="30"
                                value={firstName.value}
                                onChange={firstName.onChange}
                            />
                            <span id="profile-first-name-input" className="profile__input_error-span">{firstName.errorMessage}</span>
                        </div>
                        <div className='profile__input-container'>
                            <p className='profile__input-label'>Отчество</p>
                            <input
                                type="text"
                                className='profile__input'
                                id="profile-middle-name-input"
                                name="middleName"
                                placeholder='Введите отчество'
                                minLength="2"
                                maxLength="30"
                                value={middleName.value}
                                onChange={middleName.onChange}
                            />
                            <span id="profile-middle-name-input" className="profile__input_error-span">{middleName.errorMessage}</span>
                        </div>
                    </div>
                    <div className='profile__inputs-container'>
                        <div className='profile__input-container'>
                            <p className='profile__input-label'>Почта</p>
                            <div className='profile__email-container'>
                                <p className='profile__email'>{currentUser.email}</p>
                            </div>
                        </div>
                        <div className='profile__input-container'>
                            <p className='profile__input-label'>Новый пароль</p>
                            <input
                                type={isNewPassword}
                                className='profile__input'
                                id="profile-new-password-input"
                                name="newPassword"
                                placeholder='Введите новый пароль'
                                minLength="6"
                                maxLength="40"
                                value={newPassword.value}
                                onChange={newPassword.onChange}
                                autoComplete="new-password"
                            />
                            {isNewPasswordValue &&
                                (
                                    <div className='profile-show-password-button' onClick={handleNewPasswordShow} />
                                )
                            }
                            <span id="profile-new-password-input" className="profile__input_error-span">{newPassword.errorMessage}</span>
                        </div>
                        <div className='profile__input-container'>
                            <p className='profile__input-label'>Повторите пароль</p>
                            <input
                                type={isRepeatNewPassword}
                                className='profile__input'
                                id="profile-repeat-new-password-input"
                                name="repeatNewPassword"
                                placeholder='Повторите новый пароль'
                                minLength="6"
                                maxLength="40"
                                value={repeatNewPassword.value}
                                onChange={repeatNewPassword.onChange}
                            />
                            {isRepeatNewPasswordValue &&
                                (
                                    <div className='profile-show-password-button' onClick={handleRepeatNewPasswordShow} />
                                )
                            }
                            <span id="profile-repeat-new-password-input" className="profile__input_error-span">{repeatNewPassword.errorMessage}</span>
                        </div>
                    </div>
                </div>
                <div className='profile__avatar-add-container'>
                    <div className='profile__avatar-add-button-container'>
                        <input
                            className="profile__avatar-add-input"
                            id="avatar__input__file"
                            type="file"
                            accept="image/*"
                            onChange={(e) => onSelectImageHandler(e.target.files)}
                        />
                        <label htmlFor="avatar__input__file" className="profile__avatar-add-button">
                            <div className='profile__avatar-add-button-cross' />
                            <p className='profile__avatar-add-button-text'>Сменить аватар</p>
                        </label>
                    </div>
                    {avatar !== '' && (
                        <div className='profile__avatar-preview-container'>
                            <img className='profile__preview-img' src={avatar} alt="Аватар" />
                            <div className="profile__preview-img-remove-container">
                                <p className="profile__preview-img-remove-container-text" onClick={onRemovePhotoClick}>Удалить</p>
                            </div>
                        </div>
                    )}
                </div>
                <button type='submit' className='profile__save-button'>Сохранить</button>
            </form>
        </div>
    );
}

export default Profile;
