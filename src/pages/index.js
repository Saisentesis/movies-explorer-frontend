import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import Login from './Login/Login';
import Footer from '../components/Footer/Footer';

const Routing = () => {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/profile" element={<Profile />} />
        <Route element={<Footer />}>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
        </Route>
      </Route>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Routing;