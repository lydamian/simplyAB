/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderBar from 'parts/header-bar/HeaderBar';
import NavBar from 'parts/navbar/NavBar';
import Alerts from 'parts/alerts/Alerts';
import Breadcrumb from 'parts/breadcrumb/Breadcrumb';

import './Dashboard.css';

const Dashboard = function Dashboard() {
  return (
    <div>
      <Alerts />
      <div id="dashboard">
        <HeaderBar />
        <Breadcrumb />
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
