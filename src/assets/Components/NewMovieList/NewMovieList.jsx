import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import GMobiledataIcon from "@mui/icons-material/GMobiledata";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PublicIcon from "@mui/icons-material/Public";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { FaHeart, FaTheaterMasks } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import "./NewMovieList.css";

export default function NewMovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://moviesapi.ir/api/v1/movies?page=10`);
        const data = await response.json();
        setMovies(data.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const renderMovieGenres = (genres) => {
    return genres.join(", ");
  };

  return (
    <div className="NewMovieList__container">
      <Container>
        <Row className="NewMovieList__row">
          <Col className="NewMovieList">
            {movies.map((movie) => (
              <div key={movie.id} className="NewMovieList__item">
                <div className="NewMovieList__item-img">
                  <Link to={`/movie/${movie.id}`}>
                    <img src={movie.poster} alt={movie.title} />
                  </Link>
                </div>
                <div className="NewMovieList__item-info">
                  <div className="NewMovieList__item-header">
                    <h2 className="NewMovieList__title">{movie.title}</h2>
                    <p className="NewMovieList__episode">Season 3 Episode 1</p>
                    <span className="NewMovieList__status">
                      <IoCheckmarkDoneCircle className="NewMovieList__icon" />
                      <p className="NewMovieList__status-text">Released</p>
                    </span>
                    <div className="NewMovieList__genres">
                      <span className="NewMovieList__genre-item">
                        <FaTheaterMasks className="NewMovieList__icon" />
                        <p className="NewMovieList__genre-text">
                          {renderMovieGenres(movie.genres)}
                        </p>
                      </span>
                      <span className="NewMovieList__like">
                        <FaHeart className="NewMovieList__icon" />
                        <p className="NewMovieList__like-text">82% Like</p>
                      </span>
                    </div>
                  </div>
                  <div className="NewMovieList__cast">
                    <span>
                      <p className="newMovie__actorTitle">Actors :</p>
                      <p className="NewMovieList__actors">Harry, Vikings</p>
                    </span>
                    <span>
                      <p className="newMovie__directorTitle">Directors :</p>
                      <p className="NewMovieList__directors">Vikings</p>
                    </span>
                  </div>
                  <hr />
                  <div className="NewMovieList__description">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloribus, dignissimos?
                    </p>
                  </div>
                  <div className="NewMovieList__details">
                    <div className="NewMovieList__detail-item">
                      <span className="NewMovieList__detail-icon">
                        <CalendarMonthIcon className="NewMovieList__icon" />
                        <p className="NewMovieList__detail-text">
                          Publish Date: {movie.year}
                        </p>
                      </span>
                      <span className="NewMovieList__detail-icon">
                        <PublicIcon className="NewMovieList__icon" />
                        <p className="NewMovieList__detail-text">
                          Made in: {movie.country}
                        </p>
                      </span>
                      <span className="NewMovieList__detail-icon">
                        <StarRateRoundedIcon className="NewMovieList__icon" />
                        <p className="NewMovieList__detail-text">Rating: {movie.imdb_rating}</p>
                      </span>
                    </div>
                    <button className="NewMovieList__btn">
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Col>
          <Col className="newSeriesList">
            <h2 className="newSeriesList__title">Updated</h2>
            <div className="newSeriesList__top">
              <span className="newSeriesList__top-item">
                <RiMovie2Fill />
                <p>Series</p>
              </span>
              <p>View all</p>
            </div>
            <ul className="newSeriesList__wrapper">
              {movies.map((movie) => (
                <li key={movie.id} className="newSeriesList__item">
                  <Link to={`/movie/${movie.id}`}>
                    <img className="newSeriesList__item-img" src={movie.poster} alt={movie.title} />
                    <div className="newSeriesList__item-info">
                      <p className="newSeries__title">{movie.title}</p>
                      <p className="newSeries__geners">{renderMovieGenres(movie.genres)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
