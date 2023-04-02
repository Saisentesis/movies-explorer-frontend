import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movieCard from '../../images/movieCard.jpg';

const MoviesCardList = () => {
  const arr=[];
  for (let i=0; i<12; i++) {
    arr[i]=<MoviesCard key={i} title={'Баския: Взрыв реальности'} duration={'1ч 47м'} image={movieCard} isLiked={false}/>
  }

  return (
  <section className="movies-cardlist">
     {arr}
  </section>
  )
}

export default MoviesCardList;