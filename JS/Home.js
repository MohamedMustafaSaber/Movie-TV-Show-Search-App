var movies = [
    { title: "The Devil All the Time", img: "img/devil.jpg", rating: 7.6 },
    { title: "Antebellum", img: "img/antebellum.jpg", rating: 5.9 },
    { title: "Mulan", img: "img/mulan.jpg", rating: 7.5 },
    { title: "The Paramedic", img: "img/paramedic.jpg", rating: 6.1 },
    { title: "Lost Girls and Love Hotels", img: "img/lostgirls.jpg", rating: 5.0 },
    { title: "Cats & Dogs 3", img: "img/catsdogs.jpg", rating: 5.0 },
    { title: "Tenet", img: "img/tenet.jpg", rating: 7.5 },
    { title: "Follow Me", img: "img/followme.jpg", rating: 6.2 },
    { title: "The Babysitter", img: "img/babysitter.jpg", rating: 6.7 },
    { title: "Pets United", img: "img/pets.jpg", rating: 6.4 },
  ];
  
  var tvShows = [
    { title: "Ratched", img: "img/ratched.jpg", rating: 7.9 },
    { title: "Jurassic World Camp", img: "img/jurassic.jpg", rating: 8.9 },
    { title: "Raised by Wolves", img: "img/wolves.jpg", rating: 7.5 },
    { title: "The Boys", img: "img/boys.jpg", rating: 8.4 },
    { title: "Dragon’s Dogma", img: "img/dragons.jpg", rating: 6.3 },
    { title: "The Third Day", img: "img/third.jpg", rating: 7.2 },
    { title: "The Last Word", img: "img/lastword.jpg", rating: 6.0 },
    { title: "Challenger", img: "img/challenger.jpg", rating: 10 },
    { title: "The 100", img: "img/100.jpg", rating: 7.7 },
    { title: "Baby", img: "img/baby.jpg", rating: 7.0 },
  ];
  
  function renderCards(data, containerId) {
    var container = document.getElementById(containerId);
    container.innerHTML = '';
    data.forEach(item => {
      var card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="card-rating">${item.rating}</div>
        <div class="card-title">${item.title}</div>
      `;
      container.appendChild(card);
    });
  }


  function search(){
    var searchWord = document.getElementById('search').value.toLowerCase();
    var filteredMovies = movies.filter(o => o.title.toLowerCase().includes(searchWord));
    var filteredTV = tvShows.filter(c => c.title.toLowerCase().includes(searchWord));

    renderCards(filteredMovies, 'movie-list');
    renderCards(filteredTV, 'tv-list');
  }
  
  renderCards(movies, 'movie-list');
  renderCards(tvShows, 'tv-list');
  document.getElementById('search').addEventListener('input', search);