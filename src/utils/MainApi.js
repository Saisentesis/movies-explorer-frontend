class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    const token = localStorage.getItem('token');
    if (token) {
      this._headers.authorization = 'Bearer ' + token;
    }
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setToken(token) {
    this._headers.authorization = 'Bearer ' + token;
  }

  signUp(name, email, password) {
    return fetch(`${this._baseUrl}/signup`,  {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "email":  email,
        "password": password,
      })
    }).then(res=> this._checkAnswer(res));
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`,  {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({  
        "email":  email,
        "password": password,
      })
    }).then(res=> this._checkAnswer(res));
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`,  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    }).then(res=> this._checkAnswer(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/movies`,  {headers: this._headers})
    .then(res => this._checkAnswer(res));
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,  {headers: this._headers})
    .then(res=> this._checkAnswer(res));
  }

  setUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`,  {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then(res=> this._checkAnswer(res));
  }

  addMovie(movie) {
    return fetch(`${this._baseUrl}/movies`,  {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.image,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    }).then(res=> this._checkAnswer(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`,  {
      method: 'DELETE',
      headers: this._headers,
    }).then(res=> this._checkAnswer(res));
  }
  
}

export default new MainApi({
  baseUrl: 'https://api.search-movies.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
  }
);