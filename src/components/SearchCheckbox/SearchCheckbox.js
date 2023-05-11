import './SearchCheckbox.css';

const SearchCheckbox = (props) => {
  
  function handleChange() {
    props.setShortFilmCheckbox(!props.shortFilmCheckbox);
    props.handleSearch(!props.shortFilmCheckbox);
  }

  return (
    <div className="search-tumbler">
      <input type="checkbox" className="search-tumbler__checkbox" id="search-tumbler__checkbox" checked={props.shortFilmCheckbox} onChange={handleChange}></input>
      <label htmlFor="search-tumbler__checkbox" className="search-tumbler__label">Короткометражки</label>
    </div>
  )
}



export default SearchCheckbox;