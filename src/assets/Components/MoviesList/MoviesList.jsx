import React, { useEffect, useState, memo } from "react";
import "./MovieList.css";
import Header from "../Header/Header";
import NewMovieList from '../NewMovieList/NewMovieList';
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MovieRow = memo(({ title, movies }) => (
  <div className="MoviesList_row">
    <div className="MoviesList_row-top">
      <h3 className="MoviesList_row-title">{title}</h3>
      <a href="#">See more</a>
    </div>
    <Swiper
      spaceBetween={10}
      slidesPerView={5}
      breakpoints={{
        200: { slidesPerView: 1 },
        400: { slidesPerView: 2 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <div className="movieList_item">
              <img
                className="movieList_item-img"
                src={movie.poster}
                alt={movie.title}
              />
              <p className="movieName">{movie.title}</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
));

export default function MoviesList() {
  const [moviesByGenre, setMoviesByGenre] = useState({
    popular: [],
    comedy: [],
    action: [],
    horror: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async (genreId, genreKey) => {
      try {
        const res = await fetch(`https://moviesapi.ir/api/v1/genres/${genreId}/movies?page=1`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setMoviesByGenre((prevMovies) => ({
          ...prevMovies,
          [genreKey]: data.data,
        }));
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre(3, "popular");
    fetchMoviesByGenre(4, "comedy");
    fetchMoviesByGenre(5, "action");
    fetchMoviesByGenre(6, "horror");
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="wrapper">
      <Header />
      <div className="MovieList__wrapper lg">
        <Container fluid="xl">
          <MovieRow title="Popular Movies" movies={moviesByGenre.popular} />
          <MovieRow title="Comedy Movies" movies={moviesByGenre.comedy} />
          <MovieRow title="Action Movies" movies={moviesByGenre.action} />
          <MovieRow title="Horror Movies" movies={moviesByGenre.horror} />
        </Container>
      </div>
      <NewMovieList />
    </div>
  );
}
