const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280/';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const img = document.querySelector('img');

// Trouver les films fav à l'initialisation
getMovies(APIURL);

async function getMovies(url) {
    const reponse = await fetch(url);
    const reponseDonnees = await reponse.json();
    
    showMovies(reponseDonnees.results);
}

function showMovies(movies){
    // Effacer main
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');

        movieE1.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="title">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview:</h4>
                ${overview}
            </div> 
        `;

        main.appendChild(movieE1);
    });    
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
});