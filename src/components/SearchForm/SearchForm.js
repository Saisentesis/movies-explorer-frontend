import './SearchForm.css';
import SearchCheckbox from '../SearchCheckbox/SearchCheckbox';

const SearchForm = () => {
  return (
    <section className="search">
    <form className="search__form">
      <input className="search__input" placeholder="Фильм"  name="movie" type="text" required></input>
      <button type="submit" className="search__button"></button>
    </form>
      <SearchCheckbox/>
  </section>
  )
}

export default SearchForm;