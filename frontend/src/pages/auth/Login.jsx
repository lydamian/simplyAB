import React, { useState } from 'react';
import './Auth.css';
import UndrawLogin from 'assets/media/undraw-login.svg';
import { login, isAuthenticated } from 'features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Alerts from 'parts/alerts/Alerts';

function Login() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(isAuthenticated);

  const loginHandler = (event) => {
    dispatch(login({ emailAddress, password }));
    event.preventDefault();
  };

  if (isUserAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="login hero has-background-light is-fullheight">
      <Alerts />
      <div className="container has-text-centered">
        <div className="box">
          <h3 className="title has-text-weight-bold has-text-black">Login</h3>
          <figure className="avatar">
            <img src={UndrawLogin} alt="login-placeholder-img" />
          </figure>
          <form onSubmit={loginHandler}>
            <div className="field">
              <div className="control">
                <input className="input" name="emil-address" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} type="text" placeholder="Email" />
              </div>
            </div>

            <div className="field">
              <div className="control has-icons-right">
                <input
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                />
                <span className="password-visibility icon is-clickable is-small is-right">
                  <i
                    className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                    aria-hidden="true"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </span>
              </div>
            </div>

            <div className="field">
              <label control="none" htmlFor="remember-me" className="checkbox">
                <input id="remember-me" type="checkbox" />
                &nbsp;
                Remember me
              </label>
            </div>
            <button type="submit" className="button is-block is-info  is-fullwidth">
              Login
            </button>
          </form>
        </div>
        <p className="has-text-grey">
          <a href="../">Sign Up</a>
          {' '}
          &nbsp; ·&nbsp;
          <a href="../">Forgot Password</a>
          {' '}
          &nbsp; ·&nbsp;
          <a href="../">Need Help?</a>
        </p>
      </div>
    </section>
  );
}

export default Login;
