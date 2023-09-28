import React, { useState } from "react";

import classes from "./ResultList.module.css";
import MovieDetail from "../Movies/MovieDetail";

const ResultList = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [film, setFilm] = useState({});

  // function to receive clicked movie and save its info to state "film" for rendering later
  //  after checking if state "showDetails" is true
  const showDetailsHandler = (movie) => {
    // if the movie that is being clicked is the same as the one that is being saved in state "film",
    //  set state "showDetails" to false for hiding component MovieDetail
    if (film.id === movie.id) {
      setShowDetails(false);
      // remove state of "film"
      setFilm({});
      // if movie is
    } else {
      // receive the clicked movie information and save to the state "film"
      setShowDetails(true);
      setFilm(movie);
    }
  };

  return (
    <div className={classes["search-result"]}>
      <h2>Search Result</h2>
      {/* using map to render movies from property "movies" in father component Search.jsx */}
      {props?.movies?.map((movie) => (
        <img
          alt={movie.id}
          key={movie.id}
          className={classes.image}
          src={`https://image.tmdb.org/t/p/w500${movie.image}`}
          // using onClick to trigger function "showDetailsHandler" everytime a movie clicked
          onClick={() => showDetailsHandler(movie)}
        />
      ))}
      {/* if state "showDetails" is true (means the image is clicked), render component MovieDetail
      and leave it property "movieData" for mission to use data in MovieDetail component */}
      {showDetails && <MovieDetail movieData={film} />}
    </div>
  );
};

export default ResultList;
