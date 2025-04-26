if (!sessionStorage.getItem("sessionUserName")) {
    window.location.href = "loginPage.html";
}else{
  document.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const container = document.getElementById('favorites-list');
    
    if (favorites.length === 0) {
      container.innerHTML = '<p>No favorites yet.</p>';
    } else {
      favorites.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${item.img}" alt="${item.title}">
          <div class="card-rating">${item.rating}</div>
          <div class="card-title">${item.title}</div>
         <button class="favorite-btn" onclick="toggleFavorite(event, '${item.id}', '${item.type}')">
            <i class="fas fa-heart"></i>
         </button>

        `;
        card.addEventListener('click', (e) => {
          if (!e.target.closest('.favorite-btn')) {
              window.location.href = `details.html?id=${item.id}&type=${item.type}`;
          }
      });
        container.appendChild(card);
      });
    }
  });

function toggleFavorite(event, id, type) {
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const favIndex = favorites.findIndex(item => item.id == id && item.type == type);

if (favIndex !== -1) {
  // Remove from favorites
  favorites.splice(favIndex, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Remove card from DOM
  const card = event.currentTarget.closest('.card');
  if (card) {
    card.remove();
  }

  // Check if no favorites left
  if (favorites.length === 0) {
    const container = document.getElementById('favorites-list');
    container.innerHTML = '<p>No favorites yet.</p>';
  }
}
}

function logout() {
    localStorage.removeItem("sessionUserName");
    window.location.href = "loginPage.html";
  }

}