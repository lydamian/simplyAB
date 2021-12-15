import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import './App.css';
import PrivateRoute from 'components/PrivateRoute';
import Projects from 'pages/dashboard/projects/Projects';
import CreateProject from 'pages/dashboard/projects/CreateProject';
import Experiments from 'pages/dashboard/experiments/Experiments';
import Variants from 'pages/dashboard/variants/Variants';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Landing from './pages/landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';

require('dotenv').config(); // allows us to inject environment variables

const App = function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={(
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )}
      >
        <Route path="projects" element={<Projects />} />
        <Route path="projects/create" element={<CreateProject />} />
        <Route path="/dashboard/experiments" element={<Experiments />} />
        <Route path="/dashboard/variants" element={<Variants />} />
      </Route>
      <Route
        path="*"
        element={(
          <main style={{ padding: '1rem' }}>
            <p>There`&apos;`s nothing here!</p>
          </main>
        )}
      />
    </Routes>
  );
};

export default App;
