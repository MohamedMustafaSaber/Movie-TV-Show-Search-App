document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    hamburgerBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active'); 
      this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  });

const params = new URLSearchParams(window.location.search);
const Id = params.get('id');
var type = params.get('type');
const backButton = document.getElementById('back-button');

if (type === "People") {
    type = 'person'
}



async function fetchDetails() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${Id}?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQyNDE1ZDMxOWIzOTgwODdmODlkZTFiMDI3NDc1NCIsIm5iZiI6MTY2NDc4MjAwNy4xMDMwMDAyLCJzdWIiOiI2MzNhOGViNzRmMzNhZDAwODVhZDExNTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xa73zfFcIae9R7iXVPCRiDg2dJzAJQhdgYNnVe1eQw8'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch details');
        }
        
        const data = await response.json();
        // console.log(data);
        
        renderDetails(data);
        
    } catch (error) {
        console.error('Error:', error);
        renderError();
    }
}

function renderDetails(data) {
    const detailsImage = document.getElementById('detailsImage');
    const detailsContent = document.getElementById('detailsContent');

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500${data.poster_path || data.profile_path}`;
    image.alt = data.title || data.name;
    image.loading = 'lazy';
    image.onerror = function () {
        this.src = 'path/to/fallback-image.jpg';
        this.alt = 'Image not available';
    };

    detailsImage.innerHTML = '';
    detailsImage.appendChild(image);


    if (type === 'person') {
        // معلومات شخص
        const birthDate = data.birthday ? new Date(data.birthday).toLocaleDateString('en-US') : 'Unknown';
        const deathDate = data.deathday ? new Date(data.deathday).toLocaleDateString('en-US') : null;

        detailsContent.innerHTML = `
            <h1>${data.name}</h1>
            <h4><span>Department:</span> ${data.known_for_department}</h4>
            <h4><span>Born:</span> ${birthDate}</h4>
            ${deathDate ? `<h4><span>Died:</span> ${deathDate}</h4>` : ''}
            <h4><span>Place of Birth:</span> ${data.place_of_birth || 'Unknown'}</h4>
            <h4><span>Popularity:</span> ${Math.round(data.popularity)}</h4>
            ${data.biography ? `<p class="overview">${getFirstSentences(data.biography, 5)}</p>` :
            data.overview ? `<p class="overview">${data.overview}</p>` :
            '<p class="overview">No overview available.</p>'}
            <button class="back-button" id="back-button" onclick="window.history.back()"><i class="fas fa-arrow-left"></i> Back</button>
        `;
    } else {
        // معلومات فيلم أو مسلسل
        const releaseDate = data.release_date || data.first_air_date;
        const formattedDate = releaseDate ? new Date(releaseDate).toLocaleDateString('en-US') : 'Unknown';

        const voteAverage = data.vote_average ? data.vote_average.toFixed(1) : 'N/A';

        detailsContent.innerHTML = `
            <h1>${data.title || data.name}</h1>
            ${data.tagline ? `<h2>"${data.tagline}"</h2>` : ''}
            <div class="detCards">
                ${(data.genres || []).map(genre => `<h3 class="detCard">${genre.name}</h3>`).join('')}
            </div>
            <h4 class="vote"><span>Rating:</span> ${voteAverage} / 10</h4>
            <h4 class="voteCount"><span>Vote Count:</span> ${data.vote_count?.toLocaleString() || 'N/A'}</h4>
            <h4 class="popularity"><span>Popularity:</span> ${Math.round(data.popularity)}</h4>
            <h4 class="releaseDate"><span>Release Date:</span> ${formattedDate}</h4>
            ${data.overview ? `<p class="overview">${data.overview}</p>` : '<p class="overview">No overview available.</p>'}
            <button class="back-button" id="back-button" onclick="window.history.back()"><i class="fas fa-arrow-left"></i> Back</button>
        `;
    }
}

function getFirstSentences(text, count) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.slice(0, count).join(' ');
}


function renderError() {
    const detailsContent = document.getElementById('detailsContent');
    detailsContent.innerHTML = `
        <h1>Error Loading Content</h1>
        <p class="overview">We couldn't load the details for this item. Please try again later.</p>
    `;
}

fetchDetails();

function logout() {
    sessionStorage.removeItem("sessionUserName");
    window.location.href = "loginPage.html";
}