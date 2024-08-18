import React, { useRef } from 'react';
import './LoginForm.css';

export default function LoginForm() {
  const signUpBG = useRef();

  const signUpClickHandler = () => {
    if (signUpBG.current) {
      signUpBG.current.classList.add('signUp__background-left');
    }
  };

  const signInClickHandler = () => {
    if (signUpBG.current) {
      signUpBG.current.classList.remove('signUp__background-left');
    }
  };

  return (
    <div className='signUp__signIn-wrapper' >
      <div className='signUp__background' ref={signUpBG}></div>
      <div className='signUp__wrapper'>
        <div className='signUp__form'>
          <div className='signUp__form-title'>
            <h1>Sign up</h1>
          </div>
          <form>
            <div className='signUp__form-input'>
              <input type='text' placeholder='Username' />
            </div>
            <div className='signUp__form-input'>
              <input type='email' placeholder='Email' />
            </div>
            <div className='signUp__form-input'>
              <input type='password' placeholder='Password' />
            </div>
            <div className='signUp__form-submit'>
              <button type='button'>Sign up</button>
            </div>
          </form>  
        </div>
        <p>Already have an account? </p>
        <button type='button' onClick={signInClickHandler}>Sign in</button> {/* تغییر وضعیت به حالت ورود */}
      </div>
      <div className="signIn__wrapper">
        <div className="signIn__form">
          <div className="signIn__form-title">
            <h1>Sign in</h1>
          </div>
          <form>
            <div className="signIn__form-input">
              <input type="email" placeholder="Email" />
            </div>
            <div className="signIn__form-input">
              <input type="password" placeholder="Password" />
            </div>
            <div className="signIn__form-submit">
              <button type='button'>Sign in</button>
            </div>
          </form>
          <p>Don't have an account?</p>
          <button type='button' onClick={signUpClickHandler}>Sign up</button> {/* تغییر وضعیت به حالت ثبت نام */}
        </div>
      </div>
    </div>
  );
}
