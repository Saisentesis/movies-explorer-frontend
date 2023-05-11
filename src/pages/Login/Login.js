import './Login.css';
import useAuthContext from '../../hooks/useAuthContext';
import logoPath from '../../images/logo.svg';
import MainApi from '../../utils/MainApi';
import { useFormWithValidation } from '../../hooks/useForm';
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from 'react';

const Login = () => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token } = await MainApi.signIn(values.email, values.password);
      localStorage.setItem('token', token);
      MainApi.setToken(token);
      const user = await MainApi.checkToken(token);
      setUser(user);
      navigate('/movies');
    }
    catch (err) {
        if (err === "Ошибка: 400") {
          setLoginError("Заполненные поля не валидны");
        } else if (err === "Ошибка: 401") {
          setLoginError("Неверный E-mail или пароль");
        } else {
          setLoginError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
        }
      setIsLoading(false);
    }
  }

  return (
    <main className="login">
      <NavLink to="/"><img className="login__logo" src={logoPath} alt="логотип"></img></NavLink>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={onSubmit}>
        <p className="login__placeholder">E-mail</p>
        <input
          className="login__input"
          type="email"
          name="email"
          pattern="[A-z0-9._%+-]+@[a-z0-9.-]+\.[A-z]{2,8}$"
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        <span className="login__error">{errors.email}</span>
        <p className="login__placeholder">Пароль</p>
        <input
          className="login__input"
          type="password"
          name="password"
          value={values.password || ''}
          onChange={handleChange}
          required
        />
        <span className="login__error">{errors.password}</span>
        <span className="login__server-error">{loginError}</span>
        <button
          className={"login__button" + ((!isValid || isLoading) ? " login__button_disabled" : "")}
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
        <p className="login__text">Еще не зарегистрированы? <Link className="login__link" to={'/signup'}>Регистрация</Link></p>
      </form>
    </main>
  )
}

export default Login;