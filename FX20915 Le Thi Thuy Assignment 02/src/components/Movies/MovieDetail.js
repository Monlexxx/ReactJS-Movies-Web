import React, { useEffect, useCallback } from "react";
import YouTube from "react-youtube";
import classes from "./MovieDetail.module.css";
import { useState } from "react";

const MovieDetail = (props) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // setting opts property in Youtube component
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const API_KEY = "94b46a26b9f603a661b0d38c337f3b4b";
  // using async await to fetch API
  const fetchMovieDetailHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.movieData.id}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();
      const videos = [];
      for (const key in data.results) {
        // filter site is equal to "YouTube" and type is equal to "Trailer",
        // if true, push valid movie objects to  array "videos"
        if (
          data.results[key].site === "YouTube" &&
          (data.results[key].type === "Teaser" ||
            data.results[key].type === "Trailer")
        ) {
          videos.push({
            id: data.results[key].id,
            // type: data.results[key].type,
            key: data.results[key].key,
          });
        }
      }
      // save array "video" to state "videos" by setting setVideos
      // console.log(videos);
      setVideos(videos);
    } catch (error) {
      console.log("Error fetch detail", error);
    }
    setIsLoading(false);
  }, [props.movieData.id]);

  //call api when movie id change
  useEffect(() => {
    fetchMovieDetailHandler();
    console.log(props.movieData.backdropToReplaceVideo);
    // eslint-disable-next-line
  }, [props.movieData.id]);

  return (
    <div className={classes.detail}>
      <div className={classes.content}>
        <h3>{props.movieData.name}</h3>
        <strong>
          <p>Release Date: {props.movieData.releasedDate}</p>
        </strong>
        <strong>
          <p>Vote: {props.movieData.vote}/10</p>
        </strong>
        <p className={classes.overview}>{props.movieData.overview}</p>
      </div>
      <div className={classes.video}>
        {/* using YouTube component which is imported by react-youtube library */}
        {isLoading && <p className={classes.error}>Loading...</p>}
        {!isLoading && videos.length > 0 && (
          <YouTube videoId={videos[0]?.key} opts={opts} />
        )}
        {!isLoading && videos.length === 0 && (
          <img
            className={classes.backdrop}
            alt={props.movieData.id}
            src={`https://image.tmdb.org/t/p/w500${props.movieData.backdropToReplaceVideo}`}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
