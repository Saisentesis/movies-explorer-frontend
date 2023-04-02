import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import MoreButton from '../../components/MoreButton/MoreButton';

const Movies = () => {
  return (<>
      <SearchForm />
      <MoviesCardList />
      <MoreButton />
      </>
  )
}

export default Movies;