import React, { useState, useEffect } from "react";
import classes from "./BannerList.module.css";

const BannerList = (props) => {
  const [randomBanner, setRandomBanner] = useState();

  // using useEffect to randomly pick banner every time props.backdrops is changed
  useEffect(() => {
    // pick randomly an index
    const random = Math.floor(Math.random() * props.backdrops.length - 1);
    // save random movie to state "randomBanner"
    setRandomBanner(props.backdrops[random]);
  }, [props.backdrops]);

  return (
    <>
      {/* render banner and info of movie if movie has banner (backdrop_path) */}
      {randomBanner && (
        <div className={classes.banner}>
          <img
            alt={`randomBanner`}
            src={`https://image.tmdb.org/t/p/w500${randomBanner.backdrop}`}
          />
          <div className={classes.content}>
            <h1>{randomBanner.name}</h1>
            <button className={classes.button}>Play</button>
            <button className={classes.button}>My List</button>
            <p>{randomBanner.overview}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BannerList;
