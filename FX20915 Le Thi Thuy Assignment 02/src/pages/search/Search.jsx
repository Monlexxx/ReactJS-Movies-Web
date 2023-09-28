import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchForm from "../../components/Search/SearchForm";
import ResultList from "../../components/Search/ResultList";

const Search = () => {
  const [searchMovies, setSearchMovies] = useState([]);

  // function to save movies receiving from child component SearchForm to state "searchmovies"
  const searchMoviesHandler = (movies) => {
    setSearchMovies(movies);
  };
  return (
    <div className="app">
      <Navbar />
      {/* pass data bottom-up from component SearchForm to parent component Search.jsx
      Save data to state searchMovies */}
      <SearchForm onHandlingSearchMovies={searchMoviesHandler} />
      {/* Pass data from state "searchMovies" and then save it to property "movies" to pass down to child component ResultList  */}
      <ResultList movies={searchMovies} />
    </div>
  );
};

export default Search;
