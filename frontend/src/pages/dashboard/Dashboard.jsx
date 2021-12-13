import React from 'react';
import { Outlet } from "react-router-dom";

import HeaderBar from 'parts/header-bar/HeaderBar';
import PropTypes from 'prop-types';
import NavBar from 'parts/navbar/NavBar';
import Alerts from 'parts/alerts/Alerts';

import './Dashboard.css';

const Dashboard = () => (
  <div>
    <Alerts />
    <div id="dashboard">
      <HeaderBar />
      <NavBar />
      <Outlet />
    </div>
  </div>
);

Dashboard.defaultProps = {
  section: '',
};

Dashboard.propTypes = {
  section: PropTypes.string,
};

export default Dashboard;
