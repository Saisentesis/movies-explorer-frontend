import { Link } from "react-router-dom";
import './Register.css';
import logoPath from '../../images/logo.svg';

const Register = () => {
  return (
    <main className="register">
      <img className="register__logo" src={logoPath} alt="логотип"></img>
      <h1 className="register__title"> Добро пожаловать!</h1>
      <form className="register__form">
        <p className="register__placeholder">Имя</p>
        <input className="register__input" type="text"/>
        <span className="register__error"></span>
        <p className="register__placeholder">E-mail</p>
        <input className="register__input" type="email"/>
        <span className="register__error"></span>
        <p className="register__placeholder">Пароль</p>
        <input className="register__input" type="password"/>
        <span className="register__error">Что-то пошло не так</span>
        <button className="register__button"> Зарегистрироваться </button>
        <p className="register__text">Уже зарегистрированы? <Link className="register__link" to={'/signin'}>Войти</Link></p>
      </form>
    </main>
  )
}

export default Register;