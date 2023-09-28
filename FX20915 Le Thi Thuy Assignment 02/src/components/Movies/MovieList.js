import React, { useState, useEffect } from "react";
import classes from "./MovieList.module.css";
import MovieDetail from "./MovieDetail";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [film, setFilm] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const API_KEY = "94b46a26b9f603a661b0d38c337f3b4b";
  // fecthing API using async await
  const fetchMoviesHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      // using props to pass type property fromt the father component whichs calls MovieList component
      // type is endpoint api for each kinds of movies
      const response = await fetch(`https://api.themoviedb.org/3${props.type}`);
      if (!response.ok) {
        throw new Error("Something went wrong! Cannot find any movies!");
      }
      const data = await response.json();
      const movies = [];
      for (const key in data.results) {
        movies.push({
          id: data.results[key].id,
          // if type belongs to endpoint API for calling Original Movies, use another
          name:
            props.type === `/discover/tv?api_key=${API_KEY}&with_network=123`
              ? data.results[key].name
              : data.results[key].title,
          backdrop:
            props.type === `/discover/tv?api_key=${API_KEY}&with_network=123`
              ? data.results[key].poster_path
              : data.results[key].backdrop_path,
          backdropToReplaceVideo: data.results[key].backdrop_path,
          releasedDate:
            props.type === `/discover/tv?api_key=${API_KEY}&with_network=123`
              ? data.results[key].first_air_date
              : data.results[key].release_date,
          vote: data.results[key].vote_average,
          overview: data.results[key].overview,
        });
      }
      setMovies(movies);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  // using useEffect for fetching every time component MovieList rendered
  useEffect(() => {
    fetchMoviesHandler();
    // eslint-disable-next-line
  }, []);

  // function
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
    <div className={classes.kind}>
      <div className={classes.detail}>
        {error && <p className={classes.error}>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            {/* using map to render movies */}
            {movies.map((movie) => (
              <img
                key={movie.id}
                alt={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop}`}
                //every time image is clicked,
                // function showDetailsHandler is executed.
                // This function will receive the information of the movie clicked
                onClick={() => showDetailsHandler(movie)}
              />
            ))}
          </>
        )}
      </div>
      {/* if state showDetails is true, render component MovieDetail */}
      {showDetails && <MovieDetail movieData={film} />}
    </div>
  );
};

export default MovieList;
