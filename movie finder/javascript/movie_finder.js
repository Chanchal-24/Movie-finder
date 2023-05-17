const API_URL=" http://www.omdbapi.com/?apikey=f1aac93f&s=";
const API_URL_SEARCH=" http://www.omdbapi.com/?apikey=f1aac93f&i=";

var search_input=document.getElementById("search-input");
var card=document.getElementsByClassName("movie-cards")[0];
console.log(card);


document.getElementsByClassName("search")[0].addEventListener("click",function(){

    const query=search_input.value;
    if(query){
        getMovies(API_URL+query);
    }
  
});

async function getMovies(url){
    const resp=await fetch(url);
    const respData=await resp.json(); 
    console.log(respData.Response);
    if(respData.Response=="True"){
        showMovies(respData.Search);
    }
    else{
        card.innerHTML=`<div>Movie not found</div>`;
        console.log("movie not found")
    }
}

function showMovies(movies){
   card.innerHTML="";
    movies.forEach(async function(movie){
        const movieData=await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj=await movieData.json();
        movie_display(movieDataobj);
    });
}
function movie_display(imovie){
    const movieElm=document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML=`
    <div class="card">
    <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px"/>
    <br />
    <div class="movie-description" >
        <div className="movie-title"><b>Title :</b><span className="value">${imovie.Title}</span></div>
        <div className="movie-title"><b>Rating :</b><span className="value">${imovie.imdbRating}</span></div>
        <div className="movie-title"><b>Director :</b><span className="value">${imovie.Director}</span></div>
        <div className="movie-title"><b>Release Date :</b><span className="value">${imovie.Released}</span></div>
        <div className="movie-title"><b>Genre : </b><span className="value">${imovie.Genre}</span></div>
    </div>
    </div>`
    ;
    card.appendChild(movieElm);
}