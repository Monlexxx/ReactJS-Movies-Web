import React, { useState } from "react";
import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  const [input, setInput] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchSearchedMovies = async (query_value) => {
    setError(null);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=94b46a26b9f603a661b0d38c337f3b4b&language=en-US&query=${query_value}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong! Cannot find any movies!");
      }
      const data = await response.json();
      const results = data.results;
      const searchMovies = [];
      for (const key in results) {
        searchMovies.push({
          id: results[key].id,
          image: results[key].poster_path,
          name: results[key].original_title,
          releaseDate: results[key].release_date,
          vote: results[key].vote_average,
          overview: results[key].overview,
          backdrop: results[key].backdrop_path,
        });
      }

      setSearchMovies(searchMovies);
    } catch (error) {
      setError(error.message);
    }
  };
  const searchHandler = (event) => {
    event.preventDefault();
    props.onHandlingSearchMovies(searchMovies);
  };

  const inputChangeHandler = (value) => {
    setInput(value);
    fetchSearchedMovies(value);
  };
  return (
    <>
      {error && <p className={classes.error}>{error}</p>}

      <form className={classes.form} onSubmit={searchHandler}>
        <div className={classes.searchInput}>
          <input
            placeholder="Movie name"
            value={input}
            onChange={(e) => inputChangeHandler(e.target.value)}
          ></input>
          <svg
            height="20"
            style={{ cursor: "pointer" }}
            className="svg-inline--fa fa-search fa-w-16"
            stroke="black"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          ></svg>
        </div>
        <div className={classes.button}>
          <button className={classes[`button-reset`]}>RESET</button>
          <button type="submit" className={classes[`button-search`]}>
            SEARCH
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
