import './SearchCheckbox.css';
import { useState } from 'react';

const SearchCheckbox = () => {
  const [isChecked, setIsChecked] = useState(true);

  function handleChange() {
    setIsChecked(!isChecked);
  }

  return (
    <div className="search__tumbler">
      <input type="checkbox" className="search__checkbox" id="search__checkbox" value={isChecked} onChange={handleChange}></input>
      <label htmlFor="search__checkbox" className="search__label">Короткометражки</label>
    </div>
  )
}



export default SearchCheckbox;