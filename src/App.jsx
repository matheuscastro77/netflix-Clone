import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Header from "./components/Header/Header";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [visibleHeader, setVisibleHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      console.log(chosenInfo);
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect (() => {
    const scrollListener = () => {
      if(window.scrollY > 30) {
        setVisibleHeader(true)
      } else {
        setVisibleHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () =>  {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header visibleHeader={visibleHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com carinho por <a href="https://fun-portfolio-five.vercel.app/" target="_blank" rel="noreferrer"> Matheus Castro </a> <br/>
        Direitos de imagem para Netflix<br/>
        Dados de API do site Themoviedb.org
      </footer>

      {movieList.length <= 0 ?       <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando"></img>
      </div> : ''}


    </div>
  );
}
