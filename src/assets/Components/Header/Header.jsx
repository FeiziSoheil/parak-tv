import React, { useEffect, useState, useCallback } from 'react';
import './Header.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { FaImdb } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Header() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreID, setGenreID] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, callback) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      callback(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = useCallback((e) => {
    setGenreID(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    const genreId = genreID || 0;
    fetchData(`https://moviesapi.ir/api/v1/genres/${genreId}/movies?page=1`, (data) => {
      setMovies(data.data.slice(0, 9));
    });
  }, [genreID]);

  useEffect(() => {
    fetchData(`https://moviesapi.ir/api/v1/movies?page=4`, (data) => {
      setMovies(data.data.slice(0, 9));
    });
    fetchData(`https://moviesapi.ir/api/v1/genres`, setGenres);
  }, []);

  return (
    <div className='header__wrapper col-12'>
      <Container>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <ul className='header__moviesList'>
              {movies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <li className='header__movieItem'>
                    <img className='header__moviePoster' src={movie.poster} alt={movie.title} />
                    <div className="header__posterEffect">
                      <div className="header__movieRate-wrapper">
                        <span>
                          <FaImdb />
                          <p>{movie.imdb_rating}/10</p>
                        </span>
                        <span>
                          <IoIosHeart />
                          <p>80%</p>
                        </span>
                      </div>
                      <h3 className="header__movieTitle">{movie.title}</h3>
                      <p className="header__movieGenres">{movie.genres.join(", ")}</p>
                      <button className="header__movieButton">See movie</button>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
            <div className="proSearch__wrapper">
              <Form.Select aria-label="Movie or Series">
                <option>Movie or Series</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </Form.Select>
              <Form.Select aria-label="Genres" onChange={handleGenreChange}>
                <option>Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </Form.Select>
              <Form.Select aria-label="Country">
                <option>Country</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="france">France</option>
                <option value="germany">Germany</option>
                <option value="japan">Japan</option>
                <option value="iri">IRI</option>
              </Form.Select>
              <Form.Select aria-label="Language">
                <option>Language</option>
                <option value="1">Persian Dub</option>
                <option value="2">Persian Subtitle</option>
              </Form.Select>
              <Form.Select aria-label="Rate">
                <option>Rate</option>
                <option value="3-10">3 - 10</option>
                <option value="5-10">5 - 10</option>
                <option value="7-10">7 - 10</option>
              </Form.Select>
              <button className="proSearch__button" onClick={handleClick}>Search</button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
