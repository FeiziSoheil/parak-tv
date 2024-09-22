import Header from "./assets/Components/Header/Header";
import MoviesList from "./assets/Components/MoviesList/MoviesList";
import MainMovie from "./assets/Pages/MainMovie/MainMovie";


let routes = [
    { path: "/", element: <MoviesList /> },
    { path: "/movie/:mainMovieID", element: <MainMovie /> },


];

export default routes;
