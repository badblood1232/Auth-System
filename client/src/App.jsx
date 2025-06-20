import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Make sure this is imported

import Login from './element/Login.jsx';
import Register from './element/Register.jsx';
import Home from './element/Hom.jsx';
import Create from './crud/Create.jsx';
import View from './crud/View.jsx';
import Edit from './crud/Edit.jsx';

import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  // Get the isAuthenticated state directly in App.jsx
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Routes using ternary operator */}
        <Route
          path='/'
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/home'
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/create'
          element={isAuthenticated ? <Create /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/view/:id'
          element={isAuthenticated ? <View /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/edit/:id'
          element={isAuthenticated ? <Edit /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;