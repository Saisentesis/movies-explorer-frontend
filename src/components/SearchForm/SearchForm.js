import './SearchForm.css';
import { useState } from 'react';

const SearchForm = (props) => {
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      props.handleSearch();
      setError(false);
    } else {
      setError(true);
    }
  }

  const onInputChange = (e) => {
    props.setSearchWord(e.target.value);
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={onSubmit} noValidate>
        <input
          className="search__input"
          placeholder={error ? "Введите ключевое слово" : "Фильм"}
          name="movie"
          type="text"
          value={props.searchWord}
          onChange={onInputChange}
          required
        />
        <button type="submit" className="search__button"></button>
      </form>
    </section>
  )
}

export default SearchForm;