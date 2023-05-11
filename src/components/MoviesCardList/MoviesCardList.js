import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
  return (
    <ul className="movies-cardlist">
      {props.movies.map((card) =>
        <MoviesCard
          key={card.id||card._id}
          card={card}
          handleDelete={props.handleDelete}
          handleSave={props.handleSave}
          savedMovies={props.savedMovies}
        />)}
    </ul>
  )
}

export default MoviesCardList;