import react, { useEffect, useState } from "react";
import axios from "./axios";
import youtube from "./youtube";
import "./Row.css";
import YouTube from "react-youtube";
import Traielr from "movie-trailer";
import movieTrailer from "movie-trailer";

const base_url = "https://themoviedb.org/t/p/original/";
// https://themoviedb.org/t/p/w600_and_h900_bestv2
function Row({ title, fetchUrl,isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState('')

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);
  // console.log(movies);
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick=(movie)=>{
    if(trailerUrl)
    {
      setTrailerUrl('')
    }else{
      async function fetchYoutube(search) {
        search=search+" trailer";
        const video = await youtube.get('/search',{
          params: {
            q: search
        }
        });

        // console.log("this is resp",video.data.items[0].id.videoId);
        setTrailerUrl(video.data.items[0].id.videoId);
      }
      async function trailer() {
         movieTrailer(movie?.title || movie?.name || movie?.orginal_name || "")
       .then((url) => {
         const urlParams = new URLSearchParams(new URL(url).search);
         setTrailerUrl(urlParams.get('v'));
       }).catch((error)=>console.log('error'))
      }
      
    //   const title=movie?.title || movie?.name || movie?.orginal_name;
    //    console.log(title);
    //    movieTrailer( title, {tmdbId: movie?.id,multi: false} )
    // .then( response => response==null||"" ? console.log('null'):title ).catch((error)=>console.log(error));
    console.log(movie);
    movieTrailer(movie?.title || movie?.name || movie?.orginal_name || "")
    .then(response => response==null||"" ? fetchYoutube(movie?.title || movie?.name || movie?.orginal_name): trailer() ).catch((error)=>console.log(error));

      // movieTrailer(movie?.name || "")
      // .then((url) => {
      //   console.log(url= null ? 'Url null': url);
      //   const urlParams = new URLSearchParams(new URL(url).search);
      //   setTrailerUrl(urlParams.get('v'));
      // }).catch((error)=>console.log('error'));
    }
  }

  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={()=> handleClick(movie)}
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
     {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/> } 
    </div>
  );
}

export default Row;
