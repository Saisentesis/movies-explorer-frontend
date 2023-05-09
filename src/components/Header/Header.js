import './Header.css';
import logoPath from '../../images/logo.svg';
import accountImagePath from '../../images/header-account-image.svg';
import useAuthContext from '../../hooks/useAuthContext';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { user } = useAuthContext();
  const currentUrl = useLocation().pathname;

  function handleChangeCheckboxValue(e) {
    setIsClicked(e.target.checked);
  }

  return (
    <>
      <header className={currentUrl === "/" ? "header" : "header header__authorized"}>
      <NavLink to="/" className="header__link"><img className="header__logo" src={logoPath} alt="логотип" /></NavLink>
        {
          !user ?
            <nav className="header__links">
              <NavLink to="/signup" className="header__signup">Регистрация</NavLink>
              <NavLink to="/signin" className="header__signin">Войти</NavLink>
            </nav>
            : 
            <>
              <nav className="header__links-authorized">
                <NavLink to="/movies" className={({isActive}) => `header__movies ${isActive ? "header__link_active" : ""}`}>Фильмы</NavLink>
                <NavLink to="/saved-movies" className={({isActive}) => `header__saved-movies ${isActive ? "header__link_active" : ""}`}>Сохраненные фильмы</NavLink>
                <NavLink to="/profile" className={({isActive}) => `header__account ${isActive ? "header__link_active" : ""}`}>Аккаунт
                  <img className="header__account-image" alt="иконка аккаунта" src={accountImagePath}></img>
                </NavLink>
              </nav>

              <nav className={`header__links-mobile` + (isClicked ? " header__info-mobile_open" : "")}>
                <NavLink to="/" className="header__link-mobile">Главная</NavLink>
                <NavLink to="/movies" className="header__link-mobile">Фильмы</NavLink>
                <NavLink to="/saved-movies" className="header__link-mobile">Сохраненные фильмы</NavLink>
                <NavLink to="/profile" className="header__account-mobile">Аккаунт
                  <img className="header__account-image" alt="иконка аккаунта" src={accountImagePath}></img>
                </NavLink>
              </nav>

              <input
                id="header__checkbox"
                className="header__checkbox"
                type="checkbox"
                value={isClicked}
                onChange={handleChangeCheckboxValue}
              />
              <label className="header__label" htmlFor="header__checkbox">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </>
        }
      </header>
      <Outlet />
    </>
  )
}

export default Header;