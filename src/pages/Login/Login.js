import { Link } from "react-router-dom";
import './Login.css';
import logoPath from '../../images/logo.svg';

const Login = () => {
  return (
    <main className="login">
      <img className="login__logo" src={logoPath} alt="логотип"></img>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <p className="login__placeholder">E-mail</p>
        <input className="login__input" type="email" />
        <span className="login__error"></span>
        <p className="login__placeholder">Пароль</p>
        <input className="login__input" type="password" />
        <span className="login__error"></span>
        <button className="login__button">Войти</button>
        <p className="login__text">Еще не зарегистрированы? <Link className="login__link" to={'/signup'}>Регистрация</Link></p>
      </form>
    </main>
  )
}

export default Login;