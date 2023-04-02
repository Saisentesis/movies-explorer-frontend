import './NavTab.css';

const NavTab = () => {
  return (
    <section className="navtab">
      <nav className="navtab__container">
        <a href="#about-project" className="navtab__link">О проекте</a>
        <a href="#techs" className="navtab__link">Технологии</a>
        <a href="#about-me" className="navtab__link">Студент</a>
      </nav>
    </section>
  )
}

export default NavTab;