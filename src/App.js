import { useRoutes, useLocation, Navigate } from 'react-router-dom';
import NavBar from './assets/Components/NavBar/NavBar';
import Footer from './assets/Components/Footer/Footer';
import routes from './Router';
import LoginForm from './assets/Pages/Login-form/LoginForm';
import { useState, useEffect } from 'react';
import './Responsive.css';

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

function App() {
  const router = useRoutes(routes);

  return (
    <>
       <NavBar />
      {router}
      <Footer />
    </>
  );
}

export default App;
