import React, { useState } from 'react';

import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import TestImagePage from './pages/TestImagePage';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/test" element={<TestPage/>}/>
        <Route path="/image" element={<TestImagePage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
