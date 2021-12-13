import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderBar from 'parts/header-bar/HeaderBar';
import NavBar from 'parts/navbar/NavBar';
import Alerts from 'parts/alerts/Alerts';

import './Dashboard.css';

const Dashboard = function Dashboard() {
  return (
    <div>
      <Alerts />
      <div id="dashboard">
        <HeaderBar />
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
