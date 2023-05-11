import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { hour } from '../../utils/constants';
import './MoviesCard.css';
import likeImg from '../../images/button-liked.svg';

const MoviesCard = (props) => {
  const currentUrl = useLocation().pathname;
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
    isLiked ? props.handleDelete(id || props.card._id) : props.handleSave(props.card);
  };

  return (
    <li className="movies-card">
      <a href={props.card.trailerLink} target="_blank" rel="noreferrer" className="movies-card__link">
        <img className="movies-card__image" src={props.card.image} alt={props.card.description}></img>
        <div className="movies-card__caption">
          <p className="movies-card__title">{props.card.nameRU}</p>
          <p className="movies-card__duration">{props.card.duration / hour >= 0 ? Math.floor(props.card.duration / hour) + 'ч ' + props.card.duration % hour + 'м' : props.card.duration % hour + 'м'}</p>
        </div>
      </a>
      {isLiked && currentUrl === '/movies' && <img className="movies-card__like" src={likeImg} alt="значок лайка"></img>}
      {!isLiked && <button type="button" className="movies-card__like-button" onClick={toggleLike}></button>}
      {isLiked && <button type="button" className="movies-card__remove-like-button" onClick={toggleLike}></button>}
    </li>
  )
}

export default MoviesCard;