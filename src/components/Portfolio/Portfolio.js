import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/Saisentesis/how-to-learn" target="_blank" rel="noreferrer">
            Статичный сайт</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/Saisentesis/russian-travel" target="_blank" rel="noreferrer">
            Адаптивный сайт</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/Saisentesis/react-mesto-api-full" target="_blank" rel="noreferrer">
            Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;