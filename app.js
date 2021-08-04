const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
let trending;
let series;
let details;
const form = document.querySelector('.form');
const loading = document.querySelector('.loading');
const favBtn = document.querySelector('.btn');
const detailSec = document.querySelector('.movieDetails');
const backBtn = document.querySelector('.back');
var count = 1;
const fav = document.querySelector('.fave');

//   event listeners
window.addEventListener('load', (event) => {
    generateMovie(trending);
    generateSeries(series);
   document.querySelector('.nav-details').classList.add('hidden');
    detailSec.classList.add('hidden');
});

form.addEventListener('submit', submitSearch);
searchBtn.addEventListener('click', () => {searchInput.classList.toggle('show-input'); });

backBtn.addEventListener('click', () => {
    location.reload()
 });

 function favCounter(){
    document.querySelector('#count').innerHTML = count;
     if(fav.classList.contains('favorite')){
        count --;
     } else {
        count ++;
     }
};

favBtn.addEventListener('click', () => {
    fav.classList.toggle('favorite');
    favCounter();
});


// for searching movies
async function submitSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-input').value;
    const searchResponse = searchInput.trim();
   
    const section = document.querySelector('.trending-movies');
    const sectionSearch = document.querySelector('.search-movies');
    section.innerHTML = ' ';
    sectionSearch.innerHTML = ' ';
    document.querySelector('.nav-details').innerHTML = ' ';
    detailSec.classList.add('hidden');

    loading.classList.remove('hide');
    try {
        const results = await getMovie(searchResponse);
        displaySearch(results);
    } catch (err) {
        console.log(err);
        alert('cant fetch');
    } finally {
        loading.classList.add('hide');
    }
   
}

async function getMovie(searchResponse) {
    const endpoint = `https://api.themoviedb.org/3/search/multi?api_key=02ff4429c7d501cc184aee885b181c4a&language=en-US&page=1&query=${searchResponse}`;
    const movieResponse = await fetch(endpoint);
    const movieJson = await movieResponse.json()
    console.log(movieJson);
    return movieJson;
}

function displaySearch(results){
    const section = document.querySelector('.search-movies');
    results.results.forEach( result => {
        section.insertAdjacentHTML (
            'beforeend',
            `
        <div class='mt-12 flex search-container cursor-pointer flex-col md:flex-row' data-id=${result.id}>
            <img src='https://image.tmdb.org/t/p/w500/${result.poster_path}' alt=${result.title || result.name} class="object-fit  w-auto h-96">
            <div class="text-center my-6 ml-6">
                <p class='text-2xl font-bold'> ${result.title || result.name}</p>
                <p class='mt-3'>${result.overview}</p>
                <p class='mt-2'>Rating: ${result.vote_average}</p>
                <p class='mt-4 font-thin text-red-300'>Release Date: ${result.release_date || result.first_air_date}</p>
            </div>
        </div>
            `
        );
    });
   displaySearchMovie(results);
   displaySearchTv(results);
};

// for search details

function  displaySearchMovie(results) {
    const searchContain = document.querySelectorAll('.search-container');
          searchContain.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            detailSec.classList.remove('hidden');
            const detailee = e.currentTarget.dataset.id;
    
            console.log(detailee);
            const detailsEndpoint =`https://api.themoviedb.org/3/movie/${detailee}?api_key=02ff4429c7d501cc184aee885b181c4a&append_to_response=videos,images`;
            console.log(detailsEndpoint);
            generateDetails(details);
    
                async function generateDetails(details) {
                    loading.classList.remove('hide');
                    form.style.display = 'none';
                    searchBtn.style.display = 'none';
                    try {
                        const results = await fetchDetails(details);
                        display(results);
                    } catch (err) {
                        console.log(err);
                    } finally{
                        loading.classList.add('hide');
                    }
                }
                
                async function fetchDetails(details) {
                    const detailsResponse = await fetch(detailsEndpoint);
                    const json = await detailsResponse.json();
                    console.log(json);
                    return json;
                }
                
                    const section = document.querySelector('.trending-movies');
                   document.querySelector('.search-movies').style.display = 'none';
                    section.style.display = 'none'; 
          
        function display(results) {
            document.querySelector('.detail-img').src =`https://image.tmdb.org/t/p/w500/${results.poster_path}`;
            document.querySelector('.detail-img').alt =`${results.title || results.name || results.original_title}`;
            document.querySelector('.detail-title').textContent =` ${results.title || results.name}`;
            document.querySelector('.detail-tagline').textContent =` ${results.tagline}`;
            document.querySelector('.detail-link').href =`${results.homepage}`;
            document.querySelector('.detail-link').textContent =`${results.homepage}`;
            document.querySelector('.detail-overview').textContent =`${results.overview}`;
            document.querySelector('.detail-rating').textContent =`Rating: ${results.vote_average}`;
            document.querySelector('.detail-date').textContent =`Release Date: ${results.release_date || results.first_air_date}`;

            let genreDoc = results.genres.map(function(genre){
            return genre.name;
            }); 
            genreDoc = genreDoc.join(' / ');
            document.querySelector('.detail-genre').textContent = `${genreDoc}`
            
            results.videos.results.splice(4);
            let videoDetail = results.videos.results.map(function(vid) {
                return `
                <object data='https://www.youtube.com/embed/${vid.key}' height='315px' class='w-72'></object>
                `;
            });
            videoDetail = videoDetail.join('');
            document.querySelector('.detail-videos').innerHTML = videoDetail;
        }
              });
          });
    };

    // tv
    function  displaySearchTv(results) {
        const searchContain = document.querySelectorAll('.search-container');
              searchContain.forEach((btn) => {
              btn.addEventListener('click', (e) => {
                detailSec.classList.remove('hidden');
                const detailee = e.currentTarget.dataset.id;
                console.log(detailee);

                const detailsSeriesEndpoint =`https://api.themoviedb.org/3/tv/${detailee}?api_key=02ff4429c7d501cc184aee885b181c4a&append_to_response=videos,images`;
                console.log(detailsSeriesEndpoint);
                generateSeriesDetails(details);
        
                    async function generateSeriesDetails(details) {
                        loading.classList.remove('hide');
                        form.style.display = 'none';
                        searchBtn.style.display = 'none';
                        try {
                            const results = await fetchSeriesDetails(details);
                            displayTv(results);
                        } catch (err) {
                            console.log(err);
                        } finally{
                            loading.classList.add('hide');
                        }
                    }
            
                    async function fetchSeriesDetails(details) {
                        const detailsSeriesResponse = await fetch(detailsSeriesEndpoint);
                        const json = await detailsSeriesResponse.json();
                        console.log(json);
                        return json;
                    }
                    
                        const section = document.querySelector('.trending-movies');
                       document.querySelector('.search-movies').style.display = 'none';
                        section.style.display = 'none'; 
              
            function displayTv(results) {
                document.querySelector('.detail-img').src =`https://image.tmdb.org/t/p/w500/${results.poster_path}`;
                document.querySelector('.detail-img').alt =`${results.title || results.name || results.original_title}`;
                document.querySelector('.detail-title').textContent =` ${results.title || results.name}`;
                document.querySelector('.detail-tagline').textContent =` ${results.tagline}`;
                document.querySelector('.detail-link').href =`${results.homepage}`;
                document.querySelector('.detail-link').textContent =`${results.homepage}`;
                document.querySelector('.detail-overview').textContent =`${results.overview}`;
                document.querySelector('.detail-rating').textContent =`Rating: ${results.vote_average}`;
                document.querySelector('.detail-date').textContent =`Release Date: ${results.release_date || results.first_air_date}`;
    
                let genreDoc = results.genres.map(function(genre){
                return genre.name;
                }); 
                genreDoc = genreDoc.join(' / ');
                document.querySelector('.detail-genre').textContent = `${genreDoc}`
                
               
                let seasons = results.seasons.map(function(season) {
                    return `
                    <div class='mt-12' data-id=${season.id}>
                    <img src='https://image.tmdb.org/t/p/w500/${season.poster_path}' alt=${season.name} class="object-fit  w-auto h-72">
                    <div class="my-6 ml-6">
                        <p class='text-xl font-semibold'> ${season.name}</p>
                        <p class='mt-2'>No of episodes: ${season.episode_count}</p>
                        <p class='mt-4 font-thin text-red-300'>Date: ${season.air_date}</p>
                    </div>
                </div>
                    `;

                    // air_date: "2021-06-09"
                    // episode_count: 6
                    // id: 114355
                    // name: "Season 1"
                    // overview: ""
                    // poster_path: "/8uVqe9ThcuYVNdh4O0kuijIWMLL.jpg"
                    // season_number: 1

                });
                seasons = seasons.join('');
                document.querySelector('.detail-seasons').innerHTML = seasons;

                results.videos.results.splice(4);
                let videoDetail = results.videos.results.map(function(vid) {
                    return `
                    <object data='https://www.youtube.com/embed/${vid.key}' height='315px' class='w-72'></object>
                    `;
                });
                videoDetail = videoDetail.join('');
                document.querySelector('.detail-videos').innerHTML = videoDetail;
            }
                  });
              });
        };

// for trending movies
async function generateMovie(trending) {
    loading.classList.remove('hide');
    try {
        const results = await fetchFilm(trending);
        showTrend(results);

    } catch (err) {
        console.log(err)
    } finally{
        loading.classList.add('hide');
    }
}

async function fetchFilm(trending) {
    const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?api_key=02ff4429c7d501cc184aee885b181c4a';
    const trendResponse = await fetch(trendingUrl);
    const trendJson = await trendResponse.json();
    console.log(trendJson);
    return trendJson;
}

function showTrend(results){
    const trendingMovieShow = document.querySelector('.trending-movie');
    results.results.splice(8, 12);
    results.results.forEach(result => {
       
        trendingMovieShow.insertAdjacentHTML(
            'beforeend',
            `<div class='movie-container cursor-pointer' data-id=${result.id}>
            <img src='https://image.tmdb.org/t/p/w500/${result.poster_path}' alt=${result.title} class="object-fit w-72 h-72  mx-auto">
            <div class="text-center my-6">
                <p class='text-xl font-semibold'>
             ${result.title}
                </p>
                <p class='mt-3 hidden sm:block'>${result.overview.substring(0, 100)}...</p>
                <p class='mt-3 text-red-300'>Release Date: ${result.release_date}</p>
            </div>
        </div>`
        ); 
    });  
    displayDetails(results);
};

// trending series

async function generateSeries(series) {
    loading.classList.remove('hide');
    try {
        const results = await fetchSeries(series);
        displaySeries(results);
    } catch (err) {
        console.log(err);
    } finally {
        loading.classList.add('hide');
    }
}

async function fetchSeries(series) {
    const seriesEndpoint ='https://api.themoviedb.org/3/trending/tv/day?api_key=02ff4429c7d501cc184aee885b181c4a';
    const seriesResponse = await fetch(seriesEndpoint);
    const json = await seriesResponse.json();
    console.log(json);
    return json;
}

function displaySeries(results) {
    let seriesSection = document.querySelector('.series');
    results.results.splice(8, 12);
    results.results.forEach(result => {
        seriesSection.insertAdjacentHTML(
            'beforeend', 
            `
            <div class='series-container cursor-pointer' data-id=${result.id}>
            <img src='https://image.tmdb.org/t/p/w500/${result.poster_path}' alt=${result.name} class="object-fit w-72 h-72  mx-auto">
            <div class="text-center my-6">
                <p class='text-xl font-semibold'>
             ${result.name}
                </p>
         <p class='mt-3 hidden sm:block'>${result.overview.substring(0, 100)}...</p>
                <p class='mt-4 font-thin text-red-300'>${result.first_air_date}</p>
            </div>
        </div>
            `
        )
    });
    displaySeriesDetails(results);
};

// for movie details

function displayDetails(results) {
const movieContain = document.querySelectorAll('.movie-container');
      movieContain.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document.querySelector('.season-title').style.display = 'none';
        detailSec.classList.remove('hidden');
        const detailee = e.currentTarget.dataset.id;
        const detailsEndpoint =`https://api.themoviedb.org/3/movie/${detailee}?api_key=02ff4429c7d501cc184aee885b181c4a&append_to_response=videos,images`;
        generateDetails(details)

            async function generateDetails(details) {
                document.querySelector('.detail-buttons').style.display = 'none'
                loading.classList.remove('hide');
                form.style.display = 'none';
                searchBtn.style.display = 'none';
                try {
                    const results = await fetchDetails(details);
                    display(results)
                } catch (err) {
                    console.log(err);
                } finally{
                    document.querySelector('.detail-buttons').style.display = 'flex'
                    loading.classList.add('hide');
                }
            }
            
            async function fetchDetails(details) {
                const detailsResponse = await fetch(detailsEndpoint);
                const json = await detailsResponse.json();
                console.log(json);
                return json;
            }
            
                const section = document.querySelector('.trending-movies');
               document.querySelector('.search-movies').style.display = 'none';
                section.style.display = 'none'; 
      
               function display(results) {
                   document.querySelector('.detail-img').src =`https://image.tmdb.org/t/p/w500/${results.poster_path}`;
                   document.querySelector('.detail-img').alt =`${results.title}`;
                   document.querySelector('.detail-title').textContent =` ${results.title}`;
                   document.querySelector('.detail-tagline').textContent =` ${results.tagline}`;
                   document.querySelector('.detail-link').href =`${results.homepage}`;
                   document.querySelector('.detail-link').textContent =`${results.homepage}`;
                   document.querySelector('.detail-overview').textContent =`${results.overview}`;
                   document.querySelector('.detail-rating').textContent =`Rating: ${results.vote_average}`;
                   document.querySelector('.detail-date').textContent =`Release Date: ${results.release_date}`;

                   let genreDoc = results.genres.map(function(genre){
                    return genre.name;
                   }); 
                   genreDoc = genreDoc.join(' / ');
                   document.querySelector('.detail-genre').textContent = `${genreDoc}`
                   
                   results.videos.results.splice(4);
                   let videoDetail = results.videos.results.map(function(vid) {
                       return `
                       <object data='https://www.youtube.com/embed/${vid.key}' height='315px' class='w-72'></object>
                       `;
                   });
                   videoDetail = videoDetail.join('');
                   document.querySelector('.detail-videos').innerHTML = videoDetail;
               }
          });
      });
};

// for tv details
function displaySeriesDetails(results) {
    const seriesContain = document.querySelectorAll('.series-container');
          seriesContain.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            detailSec.classList.remove('hidden');
            const detailee = e.currentTarget.dataset.id;
            const detailsEndpoint =`https://api.themoviedb.org/3/tv/${detailee}?api_key=02ff4429c7d501cc184aee885b181c4a&append_to_response=videos,images`;
            generateDetails(details)
    
                async function generateDetails(details) {
                    document.querySelector('.detail-buttons').style.display = 'none'
                    loading.classList.remove('hide');
                    form.style.display = 'none';
                    searchBtn.style.display = 'none';
                    try {
                        const results = await fetchDetails(details);
                        display(results)
                    } catch (err) {
                        console.log(err);
                    } finally {
                        document.querySelector('.detail-buttons').style.display = 'flex'
                        loading.classList.add('hide');
                    }
                }
                
                async function fetchDetails(details) {
                    const detailsResponse = await fetch(detailsEndpoint);
                    const json = await detailsResponse.json();
                    console.log(json);
                    return json;
                }
                
                    const section = document.querySelector('.trending-movies');
                   document.querySelector('.search-movies').style.display = 'none';
                    section.style.display = 'none'; 
          
                   function display(results) {
                       document.querySelector('.detail-img').src =`https://image.tmdb.org/t/p/w500/${results.poster_path}`;
                       document.querySelector('.detail-img').alt =`${results.name}`;
                       document.querySelector('.detail-title').textContent =` ${results.name}`;
                       document.querySelector('.detail-tagline').textContent =` ${results.tagline}`;
                       document.querySelector('.detail-link').href =`${results.homepage}`;
                       document.querySelector('.detail-link').textContent =`${results.homepage}`;
                       document.querySelector('.detail-overview').textContent =`${results.overview}`;
                       document.querySelector('.detail-rating').textContent =`Rating: ${results.vote_average}`;
                       document.querySelector('.detail-date').textContent =`Date: ${results.first_air_date}`;
    
                       let genreDoc = results.genres.map(function(genre){
                        return genre.name;
                       }); 
                       genreDoc = genreDoc.join(' / ');
                       document.querySelector('.detail-genre').textContent = `${genreDoc}`
                       
                       let seasons = results.seasons.map(function(season) {
                        return `
                        <div class='mt-12' data-id=${season.id}>
                        <img src='https://image.tmdb.org/t/p/w500/${season.poster_path}' alt=${season.name} class="object-fit  w-auto h-72">
                        <div class="my-6 ml-6">
                            <p class='text-xl font-thin'> ${season.name}</p>
                            <p class='mt-2'>No of episodes: ${season.episode_count}</p>
                            <p class='mt-4 font-thin text-red-300'>Date: ${season.air_date}</p>
                        </div>
                    </div>
                        `;
                    });
                    seasons = seasons.join('');
                    document.querySelector('.detail-seasons').innerHTML = seasons;

                       results.videos.results.splice(4);
                       let videoDetail = results.videos.results.map(function(vid) {
                           return `
                           <object data='https://www.youtube.com/embed/${vid.key}' height='315px' class='w-72'></object>
                           `;
                       });
                       videoDetail = videoDetail.join('');
                       document.querySelector('.detail-videos').innerHTML = videoDetail;
                   }
              });
          });
    };