import './Footer.css';
import { Outlet } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <Outlet/>
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm</p>
      <div className="footer__info">
        <p className="footer__date">&copy; <span>2023</span></p>
        <div className="footer__links">
          <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/Saisentesis" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer;