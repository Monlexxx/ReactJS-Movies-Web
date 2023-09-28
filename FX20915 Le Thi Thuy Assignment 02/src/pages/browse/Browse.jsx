import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import Banners from "../../components/Banner/Banners";
import MovieList from "../../components/Movies/MovieList";

const Browse = () => {
  const API_KEY = "94b46a26b9f603a661b0d38c337f3b4b";
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };
  return (
    <div className="app">
      <Navbar />
      <Banners />
      {/* using MovieList to render movies that fits to each type of movies */}
      <h2>Original</h2>
      <MovieList type={requests.fetchNetflixOriginals} />
      <h2>Xu hướng</h2>
      <MovieList type={requests.fetchTrending} />
      <h2>Tài liệu</h2>
      <MovieList type={requests.fetchTopRated} />
      <h2>Hành động</h2>
      <MovieList type={requests.fetchActionMovies} />
      <h2>Hài</h2>
      <MovieList type={requests.fetchComedyMovies} />
      <h2>Kinh dị</h2>
      <MovieList type={requests.fetchHorrorMovies} />
      <h2>Lãng mạn</h2>
      <MovieList type={requests.fetchRomanceMovies} />
      <h2>Tài liệu</h2>
      <MovieList type={requests.fetchDocumentaries} />
    </div>
  );
};

export default Browse;
