import React, { useEffect, useState } from "react";

import BannerList from "./BannerList";

const Banners = () => {
  const [backdrops, setBackdrops] = useState([]);

  // Fetch API để lấy dữ liệu banner để hiển thị
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
  const link = `https://api.themoviedb.org/3`;

  // using async and await to fetch API
  const fetchmoviesHandler = async () => {
    const response = await fetch(`${link}${requests.fetchNetflixOriginals}`);
    const data = await response.json();

    // Save every data of Banner in a constant named "backdrops"
    const backdrops = [];
    for (const key in data.results) {
      backdrops.push({
        id: key,
        backdrop: data.results[key].backdrop_path,
        overview: data.results[key].overview,
        name: data.results[key].name,
      });
    }
    // save constant "backdrop" in state "backdrop"
    setBackdrops(backdrops);
  };

  // For automatically fetching data at the first time component "Banners" rendered,
  // using useEffect and leave the second parameter as a blank dependency
  useEffect(() => {
    fetchmoviesHandler();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <BannerList backdrops={backdrops} />
    </div>
  );
};

export default Banners;
