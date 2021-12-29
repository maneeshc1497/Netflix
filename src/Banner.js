import React, { useEffect, useState } from 'react';
import axios from "./axios";
import Request from './request';
import './Banner.css'

function Banner(){
    const [movie, setMovie]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(Request.fetchTrending)
           setMovie(
            request.data.results[
                Math.floor(Math.random()* request.data.results.length - 1)
            ]
           );
        //    return request;                        
        }
        fetchData();
    },[]);

    function truncate(str,n)
    {
        return str?.length > n ? str.substr(0,n-1)+"..." : str;
    }
    return(
        <header className="Banner"
        style={{
            backgroundSize: "cover",
            backgroundPosition:"center",
            backgroundImage:`url(
                "https://themoviedb.org/t/p/original/${movie?.backdrop_path}"
            )`
        }}>
            <div className="Banner_contents">
            <h1 className="Banner_title">{movie?.title || movie?.name || movie?.orginal_name }</h1>
            <div >
                <button className="Banner_button">Play</button>
                <button className="Banner_button">My List</button>
            </div>
            <h1 className="Banner_desc">
                {truncate(movie?.overview,200)}
            </h1>
            </div>
            <div className="Banner_fade"/>
        </header>

    )
}
export default Banner;