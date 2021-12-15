/* eslint-disable */
import React from 'react';
import './HeaderBar.css';
import { useDispatch } from 'react-redux';
import {
  logout,
} from 'features/auth/authSlice';
import { Link } from 'react-router-dom';


const HeaderBar = () => {
  // hooks
  const dispatch = useDispatch();
  return (
    <div className="raya-header-bar box">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
          <div className="has-text-centered is-size-3 font-yeseva-one-cursive has-text-black">
            SimplyAB
          </div>
          </Link>

          <a href="#" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Home
            </a>

            <a className="navbar-item">
              Documentation
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  className="button is-primary"
                  type="button"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <strong>Logout</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderBar;
