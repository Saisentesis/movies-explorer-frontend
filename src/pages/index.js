import { Route, Routes, Navigate, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainApi from '../utils/MainApi';
import Header from '../components/Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import Login from './Login/Login';
import Footer from '../components/Footer/Footer';
import useAuthContext from '../hooks/useAuthContext';
import Preloader from '../components/Preloader/Preloader';

const Routing = () => {
  
  const SessionLayout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        MainApi.setToken(token);
        MainApi.checkToken(token)
          .then((user) => {
            setUser(user);
            navigate(location.pathname);
          })
          .finally(() => setIsLoading(false))
      } else {
        setIsLoading(false);
      }
    }, []);

    if (isLoading) {
      return <Preloader></Preloader>
    }
    return <Outlet/>
  }

  const ProtectedRoute = ({auth=false, to="/signin"}) => {
    const {user} = useAuthContext();
    if (!user === auth) {
      return <Navigate to={to} />;
    }
    return <Outlet/>;
  };

  return (
    <Routes>
      <Route element={<SessionLayout />}>
        <Route element={<Header />}>
        <Route element={<ProtectedRoute auth={true}/>}>
          <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<Footer />}>
            <Route path="/" element={<Main />} />
            <Route element={<ProtectedRoute auth={true}/>}>
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            </Route>
          </Route>
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default Routing;