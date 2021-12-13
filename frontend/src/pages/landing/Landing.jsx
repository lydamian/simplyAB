import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './Landing.css';

const Landing = function () {
  return (
    <div id="landing" className="container pt-6">
      <div id="landing-background">
        <div id="main-section">
          <div className="box content has-text-white">
            <h1 className="has-text-centered has-text-white">
              Welcome to
              <br />
              Simply A/B
            </h1>
            <p>
              See all the new features we’ve added through our tutorial.
            </p>
            <Link to="/login" className="rs-m-4">
              <button type="button" className="button is-link is-large is-rounded">
                Login
              </button>
            </Link>
            <Link to="/register" className="rs-m-4">
              <button type="button" className="button is-primary is-large is-rounded">
                Register
              </button>
            </Link>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
