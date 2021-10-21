import React from 'react';
import HeaderBar from 'parts/header-bar/HeaderBar';
import PropTypes from 'prop-types';
import NavBar from 'parts/navbar/NavBar';
import Alerts from 'parts/alerts/Alerts';
import DashboardBody from './DashboardBody';

import './Dashboard.css';

const Dashboard = ({ section }) => (
  <div>
    <Alerts />
    <div id="dashboard">
      <HeaderBar />
      <NavBar section={section} />
      <DashboardBody section={section} />
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
