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
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(() => {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      const { timestamp } = JSON.parse(loginData);
      if (Date.now() - timestamp < SESSION_TIMEOUT) {
        return true;
      }
    }
    return false;
  });

  const isLoginRoute = location.pathname === '/login';

  useEffect(() => {
    if (isLogin) {
      const loginData = {
        timestamp: Date.now()
      };
      localStorage.setItem('loginData', JSON.stringify(loginData));
    }
  }, [isLogin]);

  if (!isLogin) {
    return <LoginForm setIsLogin={setIsLogin} />;
  }

  return (
    <>
      {!isLoginRoute && <NavBar />}
      {router}
      {!isLoginRoute && <Footer />}
    </>
  );
}

export default App;
