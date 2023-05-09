import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  
  function editButtonClick (e) {
    e.preventDefault()
    setEditButtonClicked(!editButtonClicked);
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <div className="profile__info">
        {!editButtonClicked && <><p className="profile__text">Имя</p><p className="profile__text">Виталий</p></>} 
        {editButtonClicked && <input className="profile__input" type="text" placeholder="Имя"></input>}
      </div>
      <div className="profile__info">
        {!editButtonClicked && <><p className="profile__text">E-mail</p> <p className="profile__text">pochta@yandex.ru</p></>}
        {editButtonClicked && <input className="profile__input" type="email" placeholder="E-mail"></input>}
      </div>
      <button className="profile__button-edit" onClick={editButtonClick}> {editButtonClicked ? "Сохранить" : "Редактировать"}</button>
      <button className="profile__button-exit">Выйти из аккаунта</button>
    </main>
  )
}

export default Profile;