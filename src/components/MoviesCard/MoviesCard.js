import { useState } from 'react';
import './MoviesCard.css';
import likeImg from '../../images/button-liked.svg';

const MoviesCard = (props) => {
  const [isLiked, setIsLiked] = useState(true);

  const toggleLike = () => {
    isLiked ? setIsLiked(false) : setIsLiked(true);
  }

  return (
    <li className="movies-card">
     <img className="movies-card__image" src={props.image} alt={props.title}></img>
      <div className="movies-card__caption">
        <p className="movies-card__title">{props.title}</p>
        <p className="movies-card__duration">{props.duration}</p>
      </div>
      <img className={`movies-card__like`+ (isLiked ? "" : " movies-card__like_visible")} src={likeImg} alt="значок лайка"></img>
      {isLiked && <button type="button" className="movies-card__like-button" onClick={toggleLike}></button>}
      {!isLiked && <button type="button" className="movies-card__remove-like-button" onClick={toggleLike}></button>}  
    </li>
  )
}

export default MoviesCard;