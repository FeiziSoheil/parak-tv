import React from 'react';
import Container from 'react-bootstrap/Container';
import { useParams ,Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { RiMovie2Fill } from "react-icons/ri";
import { FaImdb } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiComment } from 'react-icons/bi';
import Circle from '../../Components/Circle/Circle';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './MainMovie.css'


export default function MainMovie() {
    const { mainMovieID } = useParams();
    const [mainMovieData, setMainMovieData] = useState([]);
    const [similerMovieData, setsimilerMovieData] = useState([]);

    useEffect(() => {
        fetch(`https://moviesapi.ir/api/v1/movies/${mainMovieID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMainMovieData(data);
            })
            .catch((err) => console.log(err));


        fetch(`https://moviesapi.ir/api/v1/movies?page={2}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setsimilerMovieData(data.data);
            })
            .catch((err) => console.log(err));

    }, [mainMovieID]);

    return (

        <div className='MainMovie__wrapper'>
            <Circle />

            <div className="mainMovieHeader__preview"
                style={{
                    backgroundImage: `
                        linear-gradient(to top, rgba(16, 16, 20, 1.9) 12%, rgba(0, 0, 0, .6) 90%),
                        url(${mainMovieData.images && mainMovieData.images.length > 0 ? mainMovieData.images[0] : ''})
                        `,
                }}
            ></div>
            <Container>

                <div className="mainMovie__header">
                    <div className="mainMovie__header-image">
                        <img src={mainMovieData.poster} alt="Movie Thumbnail" />
                    </div>
                    <div className="mainMovie__header-info">
                        <div className="mainMovie__header-details">
                            <div className="mainMovie__header-title">
                                <h2 className="mainMovie__title">{mainMovieData.title}</h2>
                                <p className="mainMovie__episode">Episode 1</p>
                                <span className="mainMovie__metadata">
                                    <p className="mainMovie__genre"> {mainMovieData.genres && mainMovieData.genres.join(", ")}</p>
                                    <p className="mainMovie__year">{mainMovieData.year}</p>
                                    <p className="mainMovie__ageLimit">{mainMovieData.rated}</p>
                                    <p className="mainMovie__country">{mainMovieData.country}</p>
                                    <p className="mainMovie__duration">{mainMovieData.runtime}</p>
                                </span>
                            </div>
                            <hr />
                            <div className="mainMovie__rating-info">
                                <div className="mainMovie__rating-container">
                                    <span className="mainMovie__rating-item">
                                        <FaImdb style={{ color: 'goldenrod', borderRadius: '5px' }} />
                                        <p className="mainMovie__rating">{mainMovieData.imdb_rating}</p>
                                        <p className='mainMovie__rating-text'>from 10 / {mainMovieData.imdb_votes} votes</p>
                                    </span>
                                    <span className="mainMovie__rating-item">
                                        <FaHeart style={{ backgroundColor: '#89d64f ', padding: '4px', borderRadius: '5px' }} />
                                        <p className="mainMovie__like">Rating</p>
                                        <p className='mainMovie__like-count'>5.3</p>
                                    </span>
                                </div>
                                <div className='mainMovie__actors_directors'>
                                    <span >
                                        <p className="newMovie__actorTitle">Actors :</p>
                                        <p className="NewMovieList__actors">
                                            {mainMovieData.actors && mainMovieData.actors}
                                        </p>
                                    </span>
                                    <span>
                                        <p className="newMovie__directorTitle">Directors :</p>
                                        <p className="NewMovieList__directors">
                                            {mainMovieData.director && mainMovieData.director}
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className="mainMovie__buttons">
                                <button className="mainMovie__like-button">
                                    <ThumbUpIcon /> 636
                                </button>
                                <button className="mainMovie__dislike-button">
                                    <ThumbDownRoundedIcon /> 12
                                </button>
                            </div>
                        </div>
                        <div className="mainMovie__divider"></div>
                        <div className="mainMovie__extra-info"></div>
                    </div>
                </div>

                <div className="mainMovie__des">
                    <div className="mainMovie__story mainMovie__section">
                        <span className="mainMovie__iconText">
                            <BiSolidMoviePlay className="mainMovie__icon" />
                            <p className="mainMovie__label">Movie Story</p>
                        </span>
                        <p className="mainMovie__text">{mainMovieData.plot}</p>
                    </div>
                    <div className="mainMovie__about mainMovie__section">
                        <span className="mainMovie__iconText">
                            <BiSolidMoviePlay className="mainMovie__icon" />
                            <p className="mainMovie__label">Movie about</p>
                        </span>
                        <p className="mainMovie__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nisi ullam molestias, ducimus beatae voluptas molestiae fugiat ratione, consequatur fuga nostrum earum libero possimus dicta exercitationem a optio deserunt praesentium maxime, sint assumenda in reprehenderit ab eveniet. Distinctio, dolor laudantium! Rem ipsum laudantium doloremque itaque necessitatibus odio quam laborum voluptatem.</p>
                    </div>
                </div>
                <hr />

                <div className="mainMovie__concate">
                    <div className="download__alert">
                        <FaLock />
                        <p>download just without vpn,please turn of your vpn</p>
                    </div>
                    <div className="download__count-wrapper">
                        <FaStar />
                        <p className='download__count'>197.452+ download this movie</p>
                    </div>
                </div>
                <hr />
                <div className="mainMovie__similer">
                    <div className="mainMovie__similer-top">
                        <RiMovie2Fill />
                        <h3 className="mainMovie__similer-title">similer movie</h3>
                    </div>
                    <div className="MoviesList_row">
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
                            {similerMovieData.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                   <Link to={`/movie/${movie.id}`}>
                                    <li className="movieList_item">
                                        <img
                                            className="movieList_item-img"
                                            src={movie.poster}
                                            alt={movie.title}
                                        />
                                        <p className="movieName">{movie.title}</p>
                                        <span className="movieRateiNFO">
                                            <FaImdb />
                                            <p className="movieRate">{movie.imdb_rating}</p>
                                        </span>
                                    </li>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="mainMovie__comment-wrapper">
                    <div className="mainMovie__comments">
                        <div className="mainMovie__comments-top">
                            <span className="mainMovie__comments-title">
                                <BiComment />
                                <p className="mainMovie__comments-title">5 Comments</p>
                            </span>
                            <button className="mainMovie__comments-button">Add a comment</button>
                        </div>
                        <ul className="mainMovie__comments-list">
                            <li className="mainMovie__comments-item">
                                <div className="mainMovie__comments-writerInfo">
                                    <img
                                        className="mainMovie__comments-writerImg"
                                        src="person.jpg"
                                        alt="user"
                                    />
                                    <p className="mainMovie__comments-writerName">User</p>
                                    <p className="mainMovie__comments-writerDate">2022.01.01</p>
                                </div>
                                <p className="mainMovie__comments-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aut quo deserunt dicta maiores deleniti laboriosam vero at sunt, quia incidunt, eum voluptatem nam quod ab, vitae officiis asperiores sint?</p>
                            </li>
                            <li className="mainMovie__comments-item">
                                <div className="mainMovie__comments-writerInfo">
                                    <img
                                        className="mainMovie__comments-writerImg"
                                        src='/person.webp'
                                        alt="user"
                                    />
                                    <p className="mainMovie__comments-writerName">User</p>
                                    <p className="mainMovie__comments-writerDate">2022.01.01</p>
                                </div>
                                <p className="mainMovie__comments-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aut quo deserunt dicta maiores deleniti laboriosam vero at sunt, quia incidunt, eum voluptatem nam quod ab, vitae officiis asperiores sint?</p>
                            </li>
                            <li className="mainMovie__comments-item">
                                <div className="mainMovie__comments-writerInfo">
                                    <img
                                        className="mainMovie__comments-writerImg"
                                        src='/person.webp'
                                        alt="user"
                                    />
                                    <p className="mainMovie__comments-writerName">User</p>
                                    <p className="mainMovie__comments-writerDate">2022.01.01</p>
                                </div>
                                <p className="mainMovie__comments-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aut quo deserunt dicta maiores deleniti laboriosam vero at sunt, quia incidunt, eum voluptatem nam quod ab, vitae officiis asperiores sint?</p>
                            </li>
                            <li className="mainMovie__comments-item">
                                <div className="mainMovie__comments-writerInfo">
                                    <img
                                        className="mainMovie__comments-writerImg"
                                        src='/person.webp'
                                        alt="user"
                                    />
                                    <p className="mainMovie__comments-writerName">User</p>
                                    <p className="mainMovie__comments-writerDate">2022.01.01</p>
                                </div>
                                <p className="mainMovie__comments-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aut quo deserunt dicta maiores deleniti laboriosam vero at sunt, quia incidunt, eum voluptatem nam quod ab, vitae officiis asperiores sint?</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mainMovie__newComment-wrapper">
                        <h3 className="mainMovie__newComment">Add new comment</h3>
                        <form className="mainMovie__newComment-form">
                            <textarea
                                className="mainMovie__newComment-textarea"
                                placeholder="Write your comment here"
                            />
                            <div className="mainMovie__newComment-submitWrapper">
                                <input type="text" className="mainMovie__newCommnet-writerName" />
                                <button className="mainMovie__newComment-submit">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />

            </Container>
        </div>
    )
}
