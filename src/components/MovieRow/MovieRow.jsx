import React, { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const MovieRow = ({ title, items, isLarge }) => {
  const [scrollX, setScrollX] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [modal, setModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemOverview, setItemOverview] = useState("");

  const imageHost = "https://image.tmdb.org/t/p/original/";
  let listW = items.results.length * 150;

  const movieRowOpacity = hovered ? 1 : 0;

  const divStyle = {
    opacity: scrollX === window.innerWidth - listW - 60 ? 0 : movieRowOpacity,
  };

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

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

  const moviePlayOnClick = (item) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setModal(false);
    } else {
      movieTrailer(item.title || item.name || item.original_name || "")
        .then((url) => {
          setTrailerUrl(url);
          setModal(true);
        })
        .catch((error) => {
          console.log("Error fetching movie trailer: ", error);
        });
    }
    setItemName(item.title || item.name || item.original_name || "");
    setItemOverview(item.overview);
  };

  const closeModal = () => {
    setTrailerUrl("");
    setModal(false);
  };

  return (
    <>
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
              className={"movieRow--left"}
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

            {items.results?.map((item, index) => {
              return (
                <img
                  onClick={() => moviePlayOnClick(item)}
                  key={index}
                  className={`movie-card ${isLarge && "movie-card-large"}`}
                  src={`${imageHost}${
                    isLarge ? item.backdrop_path : item.poster_path
                  }`}
                  alt={item.name}
                />
              );
            })}
          </div>
        </div>

        {trailerUrl && modal ? (
          <div className="modal--container" style={{ pointerEvents: "none" }}>
            <div
              className={`modal--content ${modal ? "animateIn" : "animateOut"}`}
            >
              <div className="obs--container">
                <p className="obs">Vídeo indisponível ? Tente outro.</p>

                <button
                  className="buttonCloneModal"
                  onClick={() => closeModal()}
                >
                  <CloseIcon fontSize="large" />
                </button>
              </div>
              <ReactPlayer
                playing={true}
                url={trailerUrl}
                width="100%"
                playsinline
              />
              <div className="container--button">
                <button className="playButton">
                  <PlayArrowIcon /> Play
                </button>
                <button className="button--like">
                  <AddIcon />
                </button>
                <button className="button--like">
                  <ThumbUpOffAltIcon />
                </button>
                <button className="button--like">
                  <ThumbDownOffAltIcon />
                </button>
              </div>

              <h2 className="infos--tittle">{itemName}</h2>
              <p className="infos--overview">
                {itemOverview.length > 345
                  ? itemOverview.substring(0, 345) + "..."
                  : itemOverview}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MovieRow;
