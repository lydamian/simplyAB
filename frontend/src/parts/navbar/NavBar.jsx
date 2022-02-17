import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'features/auth/authSlice';

const NavBar = function NavBar() {
  const dispatch = useDispatch();

  return (
    <div className="sab-navbar box has-background-white">
      <Link to="/dashboard">
        <div className="has-text-centered is-size-3 font-yeseva-one-cursive has-text-black">
          S. A/B
        </div>
      </Link>
      <hr className="has-background-primary-dark" />
      <div>
        <Link to="/dashboard">
          <button type="button" className="button is-fullwidth is-link link">
            <span className="icon is-large">
              <i className="fas fa-lg fa-user-clock" />
            </span>
            <div>&nbsp;Home</div>
          </button>
        </Link>
        <Link to="/dashboard/projects">
          <button type="button" className="button is-fullwidth is-link link">
            <span className="icon is-large">
              <i className="fas fa-lg fa-user-clock" />
            </span>
            <div>&nbsp;Projects</div>
          </button>
        </Link>
        <hr className="has-background-primary-dark" />
        <button type="button" onClick={() => dispatch(logout())} className="button is-primary is-fullwidth is-dark link">
          <span className="icon is-large">
            <i className="fas fa-lg fa-power-off" />
          </span>
          <div>&nbsp;Logout</div>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
