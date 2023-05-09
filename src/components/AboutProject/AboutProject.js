import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <article className="about-project__article">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>

      <div className="about-project__time">
        <p className="about-project__period">1 неделя</p>
        <p className="about-project__period">4 недели</p>
      </div>
      <div className="about-project__themes">
        <p className="about-project__theme">Back-end</p>
        <p className="about-project__theme">Front-end</p>
      </div>
    </section>

  );
};

export default AboutProject;