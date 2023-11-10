const API_KEY = "616cfb92d261941ae48546aaa14fd434";
const API_BASE = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTZjZmI5MmQyNjE5NDFhZTQ4NTQ2YWFhMTRmZDQzNCIsInN1YiI6IjY1NDE4MThjNDFhNTYxMDBkZGE5NjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FnVJ-LVBPS-LQLRgSCBNmahJtGIrvZ7E2IlZQBcYYwg",
  },
};

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`, options);
  const json = await req.json();
  return json;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getHomeList: async () => {
    return [
      {
        slug: "trending",
        title: "Em alta",
        items: await basicFetch(
          `/trending/all/week?&language=pt-BR&api_key=${API_KEY}`
        ),
        isLarge: true,
      },

      {
        slug: "toprated",
        title: "Populares",
        items: await basicFetch(
          `/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`
        ),
        isLarge: false,
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFetch(
          `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`
        ),
        isLarge: false,
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`
        ),
        isLarge: false,
      },
      {
        slug: "originals",
        title: "Originais Netflix",
        items: await basicFetch(
          `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
        isLarge: false,
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(
          `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`
        ),
        isLarge: false,
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(
          `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`
        ),
        isLarge: false,
      },
      {
        slug: "documentary",
        title: "Documentários",
        items: await basicFetch(
          `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`
        ),
        isLarge: false,
      },
    ];
  },

  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(
            `/movie/${movieId}?&language=pt-BR&api_key=${API_KEY}`
          );
          break;
        case "tv":
          info = await basicFetch(
            `/tv/${movieId}?&language=pt-BR&api_key=${API_KEY}`
          );
          break;
        default:
          info = null;
          break;
      }
    }

    return info;
  },

  //   getRatingContent : async (id) => {

  //   }
};
