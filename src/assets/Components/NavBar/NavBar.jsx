import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

import './NavBar.css';

function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        fetch(`https://moviesapi.ir/api/v1/movies?q=${e.target.value}&page=3`)
            .then(res => res.json())
            .then(data => setSearchResults(data.data))
            .catch(err => console.error(err));
    };

    const handleSearchIconClick = () => {
        setIsSearching(true);
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
            setIsSearching(false);
        }, 100);
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="navbar-wrapper">
                <Container className="navbar-container">
                    <Navbar.Brand href="">
                        <Link to='/'>
                        Parak Tv
                        </Link>
                    </Navbar.Brand>
                    <div className="menu-wrapper">
                        <IoSearch className="mobile-search-icon" onClick={handleSearchIconClick} />
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </div>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto nav-items">
                            <Nav.Link href="#home">Irani film</Nav.Link>
                            <NavDropdown  avDropdown title="Foreign film" id="foreign-film-dropdown">
                                {['Action', 'Drama', 'India', 'Romantic'].map((genre, index) => (
                                    <NavDropdown.Item key={index} href={`#action/${index + 1}`}>{genre}</NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <NavDropdown title="Series" id="series-dropdown">
                                {['Action', 'Drama', 'India', 'Romantic'].map((genre, index) => (
                                    <NavDropdown.Item key={index} href={`#series/${index + 1}`}>{genre}</NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <Nav.Link href="#link">Animation</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div className="menu-search-wrapper">
                        <div className="search-icon" onClick={handleSearchIconClick}>
                            <input type="text" />
                            <IoSearch />
                        </div>
                    </div>
                </Container>
            </Navbar>
            {isSearching && (
                <div className="search-overlay">
                    <Form className={`d-flex search-form ${isFocused ? 'focused' : ''}`}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="search-input"
                            aria-label="Search"
                            value={searchTerm}
                            onBlur={handleBlur}
                            onChange={handleSearch}
                            autoFocus
                        />
                    </Form>
                    <div className="search-results">
                        <ul className="search-results-list">
                            {searchResults.length > 0 ? searchResults.map(movie => (
                                <Link to={`/movie/${movie.id}`} key={movie.id}>
                                    <li className="search-results-item">
                                        <img src={movie.poster} alt={movie.title} style={{ width: '50px' }} />
                                        <span>
                                            <p>{movie.title}</p>
                                            <p className="search-results-genre">
                                                {movie.genres && movie.genres.length > 0 ? movie.genres.join(', ') : ''}
                                            </p>
                                        </span>
                                    </li>
                                </Link>
                            )) : <p className="no-results">No results</p>}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavBar;
