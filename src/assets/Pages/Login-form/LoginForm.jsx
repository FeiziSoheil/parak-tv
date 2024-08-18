import React, { useRef, useState } from 'react';
import './LoginForm.css';
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import Lottie from 'lottie-react';
import signUpAnimation from '../../lottie/signUpAnimation.json';
import signInAnimation from '../../lottie/loginAnimation.json';

export default function LoginForm({ setIsLogin }) {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [userData , setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isUserExists , setIsUserExists] = useState(false);

  const signUpBG = useRef();

  const toggleForm = (signUp) => {
    setIsSignUp(signUp);
    if (signUpBG.current) {
      signUpBG.current.classList.toggle('signUp__background-left', signUp);
    }
    

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`https://uptv-users-default-rtdb.firebaseio.com/users.json`);
      const data = await res.json();
      return Object.keys(data).map(user => ({ id: user, ...data[user] }));
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const users = await fetchUsers();
    const userExists = users.some(user => user.email === userData.email);

    if (userExists) {
      setIsUserExists(true);
      alert('User Already Exists');
    } else {
      setIsUserExists(false);
      try {
        await fetch(`https://uptv-users-default-rtdb.firebaseio.com/users.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        alert('User Added Successfully');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const users = await fetchUsers();
    const user = users.find(user => user.email === userData.email && user.password === userData.password);

    if (user) {
      alert('Login Successful');
      setIsLogin(true);
    } else {
      alert('Invalid Email or Password');
    }
  };


  

  return (
    <div className='LoginForm'>
      <div className='signUp__signIn-wrapper'>
        <div className='signUp__background' ref={signUpBG}>
          <Lottie animationData={isSignUp ? signUpAnimation : signInAnimation} loop={true} />
        </div>
        <div className='signUp__signIn'>
          <div className='signUp__wrapper form-wrapper' >
            <div>
              <div className='signIn__singUp-title'>
                <h1>Sign up</h1>
              </div>
              <form className='signUp__signIn-form' onSubmit={handleSignUp}>
                <div className='signUp__form-input'>
                  <FaUser />
                  <input 
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={handleInputChange}
                    value={userData.username}
                  />
                </div>
                <div className='signUp__form-input'>
                  <MdEmail />
                  <input 
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={handleInputChange}
                    value={userData.email}
                  />
                </div>
                <div className='signUp__form-input'>
                  <MdOutlinePassword />
                  <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleInputChange}
                    value={userData.password}
                  />
                </div>
                <div className='signUp__form-submit'>
                  <button type='submit'>Sign up</button>
                </div>
              </form>
            </div>
            <span className='signUp__signIn-already-wrapper'>
              <p className='signUp__signIn-already'>Already have an account? </p>
              <a className='signUp__signIn-alreadyLink' onClick={() => toggleForm(false)}>Sign in</a>
            </span>
          </div>
          <div className="signIn__wrapper form-wrapper">
            <div className="signIn__form">
              <div className='signIn__singUp-title'>
                <h1>Sign in</h1>
              </div>
              <form className="signUp__signIn-form" onSubmit={handleSignIn}>
                <div className="signIn__form-input">
                <MdEmail />
                  <input 
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={handleInputChange}
                    value={userData.email}
                  />
                </div>
                <div className="signIn__form-input">
                <MdOutlinePassword />
                  <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleInputChange}
                    value={userData.password}
                  />
                </div>
                <div className="signIn__form-submit">
                  <button type='submit'>Sign in</button>
                </div>
              </form>
              <span className="signUp__signIn-already-wrapper">
                <p className="signUp__signIn-already">Don't have an account?</p>
                <a className="signUp__signIn-alreadyLink" onClick={() => toggleForm(true)}>Sign up</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
