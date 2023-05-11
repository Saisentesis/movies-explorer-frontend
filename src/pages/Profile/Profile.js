import './Profile.css';
import MainApi from '../../utils/MainApi';
import useAuthContext from '../../hooks/useAuthContext';
import { useFormWithValidation } from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useAuthContext();
  const { values, handleChange, isValid } = useFormWithValidation({ name: user.name, email: user.email });
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const isSame = (user.email === values.email) && (user.name === values.name);

  function handleEdit(e) {
    e.preventDefault();
    setEditButtonClicked(!editButtonClicked);
    setMessage('');
  }

  function handleSave(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading('');
    MainApi.setUserInfo(values.name, values.email)
      .then(user => {
        setUser(user);
        setEditButtonClicked(!editButtonClicked);
        setMessage("Изменения успешно сохранены");
      })
      .catch((err) => {
        if (err === "Ошибка: 400") {
          setMessage("Заполненные поля не валидны");
        } else if (err === "Ошибка: 409") {
          setMessage("E-mail уже используется");
        } else {
          setMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
        }
      })
      .finally(() => setIsLoading(false))
  }

  function signOut(e) {
    e.preventDefault();
    setUser(null);
    localStorage.clear();
    navigate('/');
  }

  return (
    <main className="profile">
      <form className="profile__form">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        {!editButtonClicked && <>
          <div className="profile__info">
            <p className="profile__text">Имя</p><p className="profile__text">{user.name}</p>
          </div>
          <div className="profile__info">
            <p className="profile__text">E-mail</p> <p className="profile__text">{user.email}</p>
          </div>
        </>}
        {editButtonClicked && <>
          <input
            className="profile__input"
            type="text"
            placeholder="Имя"
            name="name"
            value={values.name}
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            required
          />
          <input
            className="profile__input"
            type="email"
            placeholder="E-mail"
            name="email"
            pattern="[A-z0-9._%+-]+@[a-z0-9.-]+\.[A-z]{2,8}$"
            value={values.email}
            onChange={handleChange}
            required
          />
        </>
        }

        {message && <span className="profile__message">{message}</span>}
        {!editButtonClicked &&
          <button
            className="profile__button-edit"
            onClick={handleEdit}>
            Редактировать
          </button>}
        {editButtonClicked &&
          <button
            className={"profile__button-edit" + ((!isValid || isSame || isLoading) ? " profile__button-edit_disabled" : "")}
            onClick={handleSave}
            disabled={!isValid || isSame || isLoading}>
            {isLoading ? "Сохранение..." : "Сохранить"}
          </button>
        }
        <button className="profile__button-exit" onClick={signOut}>Выйти из аккаунта</button>
      </form>
    </main>
  )
}

export default Profile;