import './Register.css';
import useAuthContext from '../../hooks/useAuthContext';
import { useFormWithValidation } from '../../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logoPath from '../../images/logo.svg';
import MainApi from '../../utils/MainApi';

const Register = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await MainApi.signUp(values.name, values.email, values.password);
      const { token } = await MainApi.signIn(values.email, values.password);
      MainApi.setToken(token);
      const user = await MainApi.checkToken(token);
      setUser(user);
      navigate('/movies');
    }
    catch (err) {
      if (err === "Ошибка: 400") {
        setRegisterError("Заполненные поля не валидны");
      } else if (err === "Ошибка: 409") {
        setRegisterError("E-mail уже занят");
      } else {
        setRegisterError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
      }
      setIsLoading(false);
    }
  }

  return (
    <main className="register">
      <img className="register__logo" src={logoPath} alt="логотип"></img>
      <h1 className="register__title"> Добро пожаловать!</h1>
      <form className="register__form" onSubmit={onSubmit}>
        <p className="register__placeholder">Имя</p>
        <input
          className="register__input"
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          value={values.name || ''}
          onChange={handleChange}
          required
        />
        <span className="register__error">{errors.name}</span>
        <p className="register__placeholder">E-mail</p>
        <input
          className="register__input"
          type="email"
          name="email"
          pattern="[A-z0-9._%+-]+@[a-z0-9.-]+\.[A-z]{2,8}$"
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        <span className="register__error">{errors.email}</span>
        <p className="register__placeholder">Пароль</p>
        <input
          className="register__input"
          type="password"
          name="password"
          value={values.password || ''}
          onChange={handleChange}
          required
        />
        <span className="register__error">{errors.password}</span>
        <span className="register__server-error">{registerError}</span>
        <button
          className={"register__button" + ((!isValid || isLoading) ? " register__button_disabled" : "")}
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
        <p className="register__text">Уже зарегистрированы? <Link className="register__link" to={'/signin'}>Войти</Link></p>
      </form>
    </main>
  )
}

export default Register;