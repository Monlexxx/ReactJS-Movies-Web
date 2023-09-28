import React, { useState } from "react";

import classes from "../Navbar/Navbar.module.css";

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  // set state for "isScrolling" when the screen is scrolling
  window.onscroll = function () {
    document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
      ? setIsScrolling(true)
      : setIsScrolling(false);
  };
  // function for redirecting to search page which will be triggered when the search icon is clicked
  const searchRedirectHandler = () => {
    window.location.href = "/search";
  };

  return (
    // using dynamic styles for navbar using state isScrolling,
    // if isScrolling is true, the class navbarScroll which styeles for black background is executed
    <div className={`${classes.navbar} ${isScrolling && classes.navbarScroll}`}>
      <a href="/">Movie App</a>
      <svg
        // using onCLick to trigger searchRedirectHandler function
        onClick={searchRedirectHandler}
        height="20"
        style={{ cursor: "pointer", marginRight: "20px" }}
        className="svg-inline--fa fa-search fa-w-16"
        fill="#ccc"
        aria-hidden="true"
        data-prefix="fas"
        data-icon="search"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
      </svg>
    </div>
  );
};
export default Navbar;
