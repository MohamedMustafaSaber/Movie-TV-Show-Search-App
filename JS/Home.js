document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  hamburgerBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active'); 
    this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });
});
if (!sessionStorage.getItem("sessionUserName")) {
  window.location.href = "loginPage.html";
}
else{
  let movies = [];
  let tvShows = [];
  let people = [];
  async function fetchTrendingMovies() {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQyNDE1ZDMxOWIzOTgwODdmODlkZTFiMDI3NDc1NCIsIm5iZiI6MTY2NDc4MjAwNy4xMDMwMDAyLCJzdWIiOiI2MzNhOGViNzRmMzNhZDAwODVhZDExNTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xa73zfFcIae9R7iXVPCRiDg2dJzAJQhdgYNnVe1eQw8'
      }
    });
    const data = await response.json();
    movies = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating:  movie.vote_average
    }));
    renderCards(movies, 'movie-list');
  }
  async function fetchTrendingTvShow() {
    const response = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQyNDE1ZDMxOWIzOTgwODdmODlkZTFiMDI3NDc1NCIsIm5iZiI6MTY2NDc4MjAwNy4xMDMwMDAyLCJzdWIiOiI2MzNhOGViNzRmMzNhZDAwODVhZDExNTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xa73zfFcIae9R7iXVPCRiDg2dJzAJQhdgYNnVe1eQw8'
      }
    });
    const data = await response.json();
    tvShows = data.results.map(tvShow => ({
      id: tvShow.id,
      title: tvShow.name,
      img: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`,
      rating: tvShow.vote_average
    }));
    renderCards(tvShows, 'tv-list');
  }
  async function fetchTrendingPeople() {
    const response = await fetch('https://api.themoviedb.org/3/trending/person/day?language=en-US', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQyNDE1ZDMxOWIzOTgwODdmODlkZTFiMDI3NDc1NCIsIm5iZiI6MTY2NDc4MjAwNy4xMDMwMDAyLCJzdWIiOiI2MzNhOGViNzRmMzNhZDAwODVhZDExNTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xa73zfFcIae9R7iXVPCRiDg2dJzAJQhdgYNnVe1eQw8'
      }
    });
    const data = await response.json();
    const people = data.results
      .filter(person =>  person.profile_path ) 
      .map(person => ({
        id: person.id,
        title: person.name,
        img: `https://image.tmdb.org/t/p/w500${person.profile_path}`,
        rating: person.popularity
      }));
  
    renderCards(people, 'People-list');
  }
  
  function renderCards(data, containerId) {
    var container = document.getElementById(containerId);
    container.innerHTML = '';
    data.forEach(item => {
      var card = document.createElement('div');
      if (item.rating < 1) {
        item.rating *= 10;
      }else if (item.rating > 10) {
        item.rating /= 10;
        item.rating += 5;
      }
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="card-rating">${Math.round(item.rating * 10)/10}</div>
        <div class="card-title">${item.title}</div>
      `;
      const type= containerId.split('-')[0];
      card.addEventListener('click',()=>{
        window.location.href = `details.html?id=${item.id}&type=${type}`
      })
      container.appendChild(card);
    });
  }
  function search(){
    var searchWord = document.getElementById('search').value.toLowerCase();
    var filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchWord));
    var filteredTV = tvShows.filter(tvShow => tvShow.title.toLowerCase().includes(searchWord));
    var filteredPeople = people.filter(person => person.title.toLowerCase().includes(searchWord));
    renderCards(filteredMovies, 'movie-list');
    renderCards(filteredTV, 'tv-list');
    renderCards(filteredPeople, 'People-list');
  }

  fetchTrendingMovies();
  fetchTrendingTvShow();
  fetchTrendingPeople();
  document.getElementById('search').addEventListener('input', search);
}

function logout() {
  sessionStorage.removeItem("sessionUserName");
  window.location.href = "loginPage.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }
});
