import './Movies.css';
import SearchForm from '../../components/SearchForm/SearchForm';
import SearchCheckbox from '../../components/SearchCheckbox/SearchCheckbox';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import MoreButton from '../../components/MoreButton/MoreButton';
import Preloader from '../../components/Preloader/Preloader';
import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import { width, startFilmsCount, addMoreMoviesMaxValue, addMoreMoviesMinValue, shortMovieDuration } from '../../utils/constants';
import { useState, useEffect } from 'react';

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [shortFilmCheckbox, setShortFilmCheckbox] = useState(false);
  const [currentMoviesCount, setCurrentMoviesCount] = useState(0);
  const [startMoviesCount, setStartMoviesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    Promise.all([
      MoviesApi.getCards(),
      MainApi.getCards()
    ])
      .then((value) => {
        let [moviesApiMovies, mainApiMovies] = value;
        moviesApiMovies = moviesApiMovies.map((movie) => {
          movie.image = "https://api.nomoreparties.co" + movie.image.url;
          return movie;
        });
        setAllMovies(moviesApiMovies);
        setSavedMovies(mainApiMovies);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    const search = localStorage.getItem("searchWord");
    const short = localStorage.getItem("shortFilmCheckbox");
    const films = localStorage.getItem("filteredMovies");
    search && setSearchWord(JSON.parse(search));
    short && setShortFilmCheckbox(JSON.parse(short));
    films && setFilteredMovies(JSON.parse(films));
  }, []);

  useEffect(() => {
    const moviesStartCount = () => {
      switch (true) {
        case window.innerWidth >= width.max:
          setStartMoviesCount(startFilmsCount.maxWidth);
          break;
        case window.innerWidth >= width.med:
          setStartMoviesCount(startFilmsCount.medWidth);
          break;
        case window.innerWidth >= width.min:
          setStartMoviesCount(startFilmsCount.minWidth);
          break;
        default:
      }
    }
    moviesStartCount();
    window.addEventListener("resize", moviesStartCount);
    return () => {
      window.removeEventListener("resize", moviesStartCount);
    }
  }, []);

  useEffect(() => {
    setCurrentMoviesCount(startMoviesCount);
  }, [startMoviesCount]);

  const handleSearch = (checkbox = shortFilmCheckbox) => {
    if (searchWord) {
      let films = allMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1);
      if (checkbox) {
        films = films.filter((movie) => movie.duration <= shortMovieDuration)
      }
      localStorage.setItem('filteredMovies', JSON.stringify(films));
      localStorage.setItem('shortFilmCheckbox', JSON.stringify(checkbox));
      localStorage.setItem('searchWord', JSON.stringify(searchWord));
      setFilteredMovies(films);
    }
  }

  const moreButtonOnClick = () => {
    if (startMoviesCount > currentMoviesCount) {
      setCurrentMoviesCount(startMoviesCount);
    }
    if (startMoviesCount === 12) {
      setCurrentMoviesCount(currentMoviesCount + addMoreMoviesMaxValue);
    } else {
      setCurrentMoviesCount(currentMoviesCount + addMoreMoviesMinValue);
    }
  }

  const handleSave = (movie) => {
    setIsError(false);
    MainApi.addMovie(movie)
      .then((res) => setSavedMovies([...savedMovies, res]))
      .catch(() => setIsError(true));
  };

  const handleDelete = (id) => {
    setIsError(false);
    MainApi.deleteMovie(id)
      .then((res) => setSavedMovies(savedMovies.filter((movie) => movie._id !== id)))
      .catch(() => setIsError(true));
  };


  return (
    <main className="movies">
      <SearchForm
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        handleSearch={handleSearch}
      />
      <SearchCheckbox
        shortFilmCheckbox={shortFilmCheckbox}
        setShortFilmCheckbox={setShortFilmCheckbox}
        handleSearch={handleSearch}
      />
      {isLoading && <Preloader />}
      {filteredMovies.length === 0 && !isLoading && localStorage.getItem("filteredMovies") && <p>Ничего не найдено</p>}
      {isError && <p>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>}
      {filteredMovies.length > 0 && !isLoading && !isError &&
        <MoviesCardList
          movies={filteredMovies.slice(0, currentMoviesCount)}
          savedMovies={savedMovies}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      }

      {currentMoviesCount < filteredMovies.length &&
        <MoreButton
          onClick={moreButtonOnClick}
        />
      }
    </main>
  )
}

export default Movies;