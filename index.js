const movieSection = document.querySelector('.trending-movies');
let shows;
let film;


function seriesBtn() {
    movieSection.innerHTML = ' ';
    document.querySelector('.nav-details').classList.remove('hidden');
    getTopRated(shows);
    getPopular(shows);
}

function filmBtn() {
    movieSection.innerHTML = ' ';
    document.querySelector('.nav-details').classList.remove('hidden');
    getTopRatedMovie(film);
    getNowPlayingMovie(film)
}


// get top rated series

async function getTopRated(shows) {
    try {
        const results = await fetchTopRated(shows)
        displayTopRated(results);
    } catch (err) {
        console.log(err);
    }
}

async function fetchTopRated(series) {
    const topRatedEndpoint = 'https://api.themoviedb.org/3/tv/top_rated?api_key=02ff4429c7d501cc184aee885b181c4a&language=en-US&page=1';
    const topRatedResponse = await fetch(topRatedEndpoint);
    const topRatedJson = await topRatedResponse.json();
    return topRatedJson;
}

function displayTopRated(results){
    document.querySelector('.nav-detail1').innerHTML = ' ';
    results.results.splice(8, 12);
    results.results.map(item => {
        document.querySelector('.nav-detail1').insertAdjacentHTML(
            'beforeend', 
        `  
        <div class=''>
            <img src='https://image.tmdb.org/t/p/w500/${item.poster_path}' alt=${item.name} class="object-fit w-72 h-72 mx-auto">
            <div class="text-center my-6">
                <p class='text-xl font-semibold'>
                    ${item.name}
                </p>
                <p class='mt-3'>${item.overview.substring(0, 100)}...</p>
                <p class='mt-3 text-red-300'>Rating: ${item.vote_average}</p>
                <p class='mt-3 text-red-300'>Air Date: ${item.first_air_date}</p>
            </div>
        </div>`
        )
    });
   
};

// get popular series

async function getPopular(shows) {
    try {
        const results = await fetchPopular(shows)
        displayPopular(results);
    } catch (err) {
        console.log(err);
    }
}

async function fetchPopular(series) {
    const popularEndpoint = 'https://api.themoviedb.org/3/tv/popular?api_key=02ff4429c7d501cc184aee885b181c4a&language=en-US';
    const  popularResponse = await fetch(popularEndpoint);
    const  popularJson = await  popularResponse.json();
    return  popularJson;
}

function displayPopular(results){
    document.querySelector('.nav-detail2').innerHTML = ' ';
    results.results.splice(8, 12);
    document.querySelector('.nav-title2').innerHTML = 'Popular Tv Shows'
    results.results.map(item => {
        document.querySelector('.nav-detail2').insertAdjacentHTML(
            'beforeend', 
        `  
        <div class=''>
            <img src='https://image.tmdb.org/t/p/w500/${item.poster_path}' alt=${item.name} class="object-fit w-72 h-72 mx-auto">
            <div class="text-center my-6">
                <p class='text-xl font-semibold'>
                    ${item.name}
                </p>
                <p class='mt-3'>${item.overview.substring(0, 100)}...</p>
                <p class='mt-3 text-red-300'>Rating: ${item.vote_average}</p>
                <p class='mt-3 text-red-300'>Air Date: ${item.first_air_date}</p>
            </div>
        </div>`
        )
    });
};

// get top rated movie
async function getTopRatedMovie(film){
    try {
        const results = await fetchTopRatedMovie(film);
        displayTopRatedMovie(results);
    } catch (err) {
        console.log(err);
    }
}

async function fetchTopRatedMovie(film) {
    const topRatedMovieEndpoint = 'https://api.themoviedb.org/3/movie/top_rated?api_key=02ff4429c7d501cc184aee885b181c4a&language=en-US&page=1';
    const ratedResponse = await fetch(topRatedMovieEndpoint);
    const topRatedJson = await ratedResponse.json();
    console.log(topRatedJson);
    return topRatedJson;
}

function  displayTopRatedMovie(results){
    document.querySelector('.nav-detail1').innerHTML = ' ';
    results.results.splice(8, 12);
    results.results.map(item => {
        document.querySelector('.nav-detail1').insertAdjacentHTML(
            'beforeend', 
        `  
        <div class=''>
            <img src='https://image.tmdb.org/t/p/w500/${item.poster_path}' alt=${item.title} class="object-fit w-72 h-72 mx-auto">
            <div class="text-center my-6">
                <p class='text-xl font-semibold'>
                    ${item.title}
                </p>
                <p class='mt-3'>${item.overview.substring(0, 100)}...</p>
                <p class='mt-3 text-red-300'>Rating: ${item.vote_average}</p>
                <p class='mt-3 text-red-300'>Release Date: ${item.release_date}</p>
            </div>
        </div>`
        )
    });
   
};

// get Now playing movie
async function getNowPlayingMovie(film){
    try {
        const results = await fetchNowPlayingMovie(film);
        displayNowPlayingMovie(results);
    } catch (err) {
        console.log(err);
    }
}

async function fetchNowPlayingMovie(film) {
    const nowPlayingMovieEndpoint = 'https://api.themoviedb.org/3/movie/now_playing?api_key=02ff4429c7d501cc184aee885b181c4a&language=en-US&page=1';
    const playingResponse = await fetch(nowPlayingMovieEndpoint);
    const nowPlayingJson = await playingResponse.json();
    console.log(nowPlayingJson);
    return nowPlayingJson;
}

function displayNowPlayingMovie(results){
    document.querySelector('.nav-detail2').innerHTML = ' ';
    document.querySelector('.nav-title2').innerHTML = 'Now Playing Movies'
    results.results.splice(8, 12);
    results.results.map(item => {
        document.querySelector('.nav-detail2').insertAdjacentHTML(
            'beforeend', 
        `  
        <div class=''>
            <img src='https://image.tmdb.org/t/p/w500/${item.poster_path}' alt=${item.title} class="object-fit w-72 h-72 mx-auto">
            <div class="text-center my-6">
                <p class='text-xl font-semibold'>
                    ${item.title}
                </p>
                <p class='mt-3'>${item.overview.substring(0, 100)}...</p>
                <p class='mt-3 text-red-300'>Rating: ${item.vote_average}</p>
                <p class='mt-3 text-red-300'>Release Date: ${item.release_date}</p>
            </div>
        </div>`
        )
    });
   
};
