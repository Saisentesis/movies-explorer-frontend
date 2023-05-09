import './AboutMe.css';
import aboutMe from '../../images/aboutme.jpg';

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <article className="about-me__info">
        <div>
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text"> Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="about-me__link" href="https://github.com/Saisentesis" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__photo" src={aboutMe} alt="Фото студента." />
      </article>
    </section>
  )
}

export default AboutMe;