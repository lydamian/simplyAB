import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css';
import constants from 'Constants';
import PrivateRoute from 'components/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Landing from './pages/landing/Landing';
import Projects from 'pages/dashboard/projects/Projects';
import Experiments from 'pages/dashboard/experiments/Experiments';
import Variants from 'pages/dashboard/variants/Variants';
import Dashboard from './pages/dashboard/Dashboard';

require('dotenv').config(); // allows us to inject environment variables

function App() {
  return (
    <Routes>
      <Route path="/" element={Landing} />
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="projects" element={<Projects />} />
        <Route path="/dashboard/experiments" element={<Experiments />} />
        <Route path="/dashboard/variants" element={<Variants />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default App;
