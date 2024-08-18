import Header from "./assets/Components/Header/Header";
import MoviesList from "./assets/Components/MoviesList/MoviesList";
import MainMovie from "./assets/Pages/MainMovie/MainMovie";
import LoginForm from "./assets/Pages/Login-form/LoginForm";

let routes = [
    { path: "/", element: <MoviesList /> },
    { path: "/movie/:mainMovieID", element: <MainMovie /> },
    { path: "/login", element: <LoginForm /> },

];

export default routes;
