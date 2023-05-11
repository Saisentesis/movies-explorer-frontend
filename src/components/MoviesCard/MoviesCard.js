import { useState, useEffect } from 'react';
import './MoviesCard.css';
import likeImg from '../../images/button-liked.svg';

const MoviesCard = (props) => {
  const [id, setId] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    setIsLiked(false);
    if (props.savedMovies) {
      props.savedMovies.forEach((savedMovie) => {
        if (savedMovie.movieId === props.card.id) {
          setIsLiked(true);
          setId(savedMovie._id);
        }
      })
    } else {
      setIsLiked(true);
    }
  }, [props.savedMovies]);

  const toggleLike = () => {
    isLiked ? props.handleDelete(id||props.card._id) : props.handleSave(props.card);
  };

  return (
    <li className="movies-card">
      <a href={props.card.trailerLink} target="_blank" rel="noreferrer" className="movies-card__link">
        <img className="movies-card__image" src={props.card.image} alt={props.card.description}></img>
        <div className="movies-card__caption">
          <p className="movies-card__title">{props.card.nameRU}</p>
          <p className="movies-card__duration">{props.card.duration/60>=0 ? Math.floor(props.card.duration/60) +'ч '+ props.card.duration%60 +'м' : props.card.duration%60 + 'м'}</p>
        </div>
      </a>
      {isLiked && <img className="movies-card__like" src={likeImg} alt="значок лайка"></img>}
      {!isLiked && <button type="button" className="movies-card__like-button" onClick={toggleLike}></button>}
      {isLiked && <button type="button" className="movies-card__remove-like-button" onClick={toggleLike}></button>}
    </li>
  )
}

export default MoviesCard;