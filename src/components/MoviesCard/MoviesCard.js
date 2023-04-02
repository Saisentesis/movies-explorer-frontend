import { useState } from 'react';
import './MoviesCard.css';
import likeImg from '../../images/button-liked.svg';
import deleteImg from '../../images/delete-button.svg';
import saveImg from '../../images/save-button.svg';

const MoviesCard = (props) => {
  const [isLiked, setIsLiked] = useState(true);

  const toggleLike = () => {
    isLiked ? setIsLiked(false) : setIsLiked(true);
  }

  return (
    <div className="movies-card">
      <img className="movies-card__image" src={props.image}></img>
      <div className="movies-card__caption">
        <p className="movies-card__title">{props.title}</p>
        <p className="movies-card__duration">{props.duration}</p>
      </div>
      <img className={`movies-card__like`+ (isLiked ? "" : " movies-card__like_visible")} src={likeImg}></img>
      <button type="button" className="movies-card__toggle-button" onClick={toggleLike}>
        <img className="movies-card__button-image" src={ isLiked ? deleteImg : saveImg }></img>
      </button>
    </div>
  )
}

export default MoviesCard;