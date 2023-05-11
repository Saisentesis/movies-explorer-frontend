import './SavedMovies.css';
import SearchForm from '../../components/SearchForm/SearchForm';
import SearchCheckbox from '../../components/SearchCheckbox/SearchCheckbox';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';
import { useState, useEffect } from 'react';
import MainApi from '../../utils/MainApi';

const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [shortFilmCheckbox, setShortFilmCheckbox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    MainApi.getCards()
      .then((movies) => {
        setSavedMovies(movies);
        setFilteredMovies(movies);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, []);

  const handleSearch = (checkbox=shortFilmCheckbox) => {
    let films = savedMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1);
    if (checkbox) {
      films = films.filter((movie) => movie.duration <= 40)
    }
    setFilteredMovies(films);
  }

  const handleDelete = (id) => {
    setIsError(false);
    MainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== id))
        setFilteredMovies(savedMovies.filter((movie) => movie._id !== id))
      })
      .catch(() => setIsError(true));
  };

  return (
    <main className="savedMovies">
      <SearchForm
        handleSearch={handleSearch}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      <SearchCheckbox
        shortFilmCheckbox={shortFilmCheckbox}
        setShortFilmCheckbox={setShortFilmCheckbox}
        handleSearch={handleSearch}
      />
      {isLoading && <Preloader />}
      {isError && <p>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>}
      {filteredMovies.length > 0 && !isLoading && !isError &&
        <MoviesCardList
          movies={filteredMovies}
          handleDelete={handleDelete}
        />
      }
    </main>
  )
}

export default SavedMovies;