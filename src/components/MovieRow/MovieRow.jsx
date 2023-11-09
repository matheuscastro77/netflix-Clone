import React, { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MovieRow = ({ title, items, isLarge }) => {
  const [scrollX, setScrollX] = useState(0);
  const [hovered, setHovered] = useState(false);

  const imageHost = "https://image.tmdb.org/t/p/original/";

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  let listW = items.results.length * 150;

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const movieRowOpacity = hovered ? 1 : 0;

  const divStyle = {
    opacity: scrollX === window.innerWidth - listW - 60 ? 0 : movieRowOpacity,
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--listarea">
        <div
          className="row-cards"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          <div
            className={`movieRow--left ${isLarge && "movie-card-large1"}`}
            onClick={handleLeftArrow}
            style={{ opacity: scrollX === 0 ? 0 : movieRowOpacity }}
          >
            <NavigateBeforeIcon style={{ fontSize: 100 }} />
          </div>

          <div
            className="movieRow--right"
            style={divStyle}
            onClick={handleRightArrow}
          >
            <NavigateNextIcon style={{ fontSize: 100 }} />
          </div>

          {items.results?.map((item, key) => {
            return (
              <img
                className={`movie-card ${isLarge && "movie-card-large"}`}
                key={key}
                src={`${imageHost}${
                  isLarge ? item.backdrop_path : item.poster_path
                }`}
                alt={item.name}
              ></img>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
